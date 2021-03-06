// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, ActivityTypes } = require('botbuilder');
const { CosmosDbPartitionedStorage } = require('botbuilder-azure');
var unirest = require('unirest');
const dbConfig = require('./dbConfig');
var API_URL = dbConfig.API_URL
var chatJson = require('./chatJson')
const dotenv = require('dotenv');
const path = require('path');
const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

// chapters patha
var introductionPath = require('./chapters/introduction')
var breastFeedingPath = require('./chapters/breastFeeding')
var givingHealthPath = require('./chapters/givingHealth') 
var chapter3Path = require('./chapters/chapter3')
var chapter4Path = require('./chapters/chapter4')
var chapter5Path = require('./chapters/chapter5')
var chapter6Path = require('./chapters/chapter6')
var chapter7Path = require('./chapters/chapter7')
var chapter8Path = require('./chapters/chapter8')
var chapter9Path = require('./chapters/chapter9')
var chapter10Path = require('./chapters/chapter10')
var chapter11Path = require('./chapters/chapter11')
var chapter12Path = require('./chapters/chapter12')

// Create access to CosmosDb Storage - this replaces local Memory Storage.
var storage = new CosmosDbPartitionedStorage({
    cosmosDbEndpoint: dbConfig.DB_SERVICE_ENDPOINT, 
    authKey: dbConfig.AUTH_KEY, 
    databaseId: dbConfig.DATABASE_ID,
    containerId: dbConfig.CONTAINER,
    compatibilityMode: false
})


class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            await logMessageText(storage, context);
        });


        this.onConversationUpdate(async (context, next) => { 
            console.log('this gets called (conversation update)'); 
        });

    }
}

// This function stores new user messages. Creates new utterance log if none exists.
async function logMessageText(storage, turnContext) {
    let utterance = turnContext.activity.text;
    let userChatId = turnContext.activity.id;
    let channelId = turnContext.activity.channelId;
    let conversationId= turnContext.activity.conversation.id;
    let chapterType = '';
    if(turnContext.activity.chapterType === undefined){
        chapterType = 'introduction';
        // chapterType = 'chapter3';
    }else{
        chapterType = turnContext.activity.chapterType;
    }
    
    // debugger;
    try {
        // var userId= turnContext.activity.from.id
        var userId= 'User'+turnContext.activity.conversation.id;
        // Read from the storage.
        let storeItems = await storage.read([userId])
        // Check the result.
        var conversationLog = storeItems[userId];
        if (typeof (conversationLog) != 'undefined') {
            if(typeof (utterance) != 'undefined'){

                let faqRes = await checkFaq(turnContext)
                
                if(faqRes.status == 200){
                    await saveUserMsg(turnContext.activity, faqRes.data.chapterName);
                    let chapterName = {chapterName : faqRes.data.chapterName};
                    let botResp = await turnContext.sendActivities([
                        { type: ActivityTypes.Typing },
                        { type: 'delay', value: 500 },
                        { type: ActivityTypes.Message, text: faqRes.data.answer, value: JSON.stringify(chapterName) }
                    ]);
                    await saveBotReply(faqRes.data.answer, botResp[2].id, channelId, conversationId, userChatId, faqRes.data.chapterName)
                    
                    
                }else{
                    
                    await saveUserMsg(turnContext.activity, chapterType)
                    await UtteranceLog(storage, turnContext, userId, storeItems, channelId, conversationId, userChatId, chapterType)
                }
                
            }else{
                console.log('text is undefined value')
            }
            
        }
        else{   
            await saveUserMsg(turnContext.activity, chapterType)
            console.log(`Creating and saving new utterance log`);
            await creatingUtterance(storage, turnContext, userId, storeItems, channelId, conversationId, userChatId, chapterType);
            
        }
    }
    catch (err){
        await turnContext.sendActivity(`Read rejected. ${err}`);
    }
}

async function UtteranceLog(storage, turnContext, userId, storeItems, channelId, conversationId, userChatId, chapterType){
    let dateNow = new Date();
    var respObj
    switch(chapterType) {
        case "introduction": {
            respObj = await introductionPath.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "breastFeeding": { // Chapter 1
            respObj = await breastFeedingPath.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "givingHealth": { // Chapter 2
            respObj = await givingHealthPath.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter3": { // Chapter 3
            respObj = await chapter3Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter4": { // Chapter 4
            respObj = await chapter4Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter5": { // Chapter 5
            respObj = await chapter5Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter6": { // Chapter 6
            respObj = await chapter6Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter7": { // Chapter 7
            respObj = await chapter7Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter8": { // Chapter 8
            respObj = await chapter8Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter9": { // Chapter 9
            respObj = await chapter9Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter10": { // Chapter 10
            respObj = await chapter10Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter11": { // Chapter 11
            respObj = await chapter11Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        case "chapter12": { // Chapter 12
            respObj = await chapter12Path.chatJson(chapterType,storeItems[userId],turnContext)
            break;
        }
        default: {
            //statements;
            break;
        }
    }
        
    if(Object.keys(respObj).length === 0){ //check blank object
        return false;
    }
    
    // The log exists so we can write to it.
    storeItems[userId].turnNumber++;

    
    
    let botResp = ''
    let chapterName = {chapterName : chapterType};
    if(respObj.checkTypeing){
        botResp = await turnContext.sendActivities([
            { type: ActivityTypes.Typing },
            { type: 'delay', value: 500 },
            { type: ActivityTypes.Message, text: respObj.botReply, value: JSON.stringify(chapterName) }
        ]);
        await saveBotReply(respObj.botReply, botResp[2].id, channelId, conversationId, userChatId, chapterType)
    }else{
        // botResp = await turnContext.sendActivity(respObj.botReply, chapterType);
        botResp = await turnContext.sendActivities([
            { type: ActivityTypes.Message, text: respObj.botReply, value: JSON.stringify(chapterName) }
        ]);
        await saveBotReply(respObj.botReply, botResp.id, channelId, conversationId, userChatId, chapterType)
    }
    
    //name save
    if(respObj.fullname){
        let fullname = respObj.fullname;
        let fname = ''
        let lname = ''
        var arr = fullname.split(' ')
        if(arr.length >1){
            lname = arr[arr.length-1]
            for(var i=0; i<arr.length-1; i++){
                fname += arr[i]+' '
            }
            fname = fname.trim();
        }else{
            fname = arr[0]
        }
        await saveName(conversationId, fname, lname);
        storeItems[userId].userInfo.firstName = fname;
        storeItems[userId].userInfo.lastName = lname;
    }
    
    storeItems[userId].userInfo.convLastMsg = respObj.botReply;               
    var convLastDate = dateNow.getDate() +"-"+ (dateNow.getMonth() + 1) +"-"+ dateNow.getFullYear();
    storeItems[userId].userInfo.convLastDate = convLastDate;
    storeItems[userId].userInfo.convLastTime = Date.now();
    storeItems[userId].userInfo.lastConvType = chapterType;
    if(respObj.feelMsg){
        storeItems[userId][chapterType]['feelMessage'] = respObj.feelMsg;
    }
    if(respObj.feedingType){
        storeItems[userId][chapterType]['feedingType'] = respObj.feedingType;
    }
    if(respObj.randomMsgFlag){
        storeItems[userId][chapterType]['randomMsgFlag'] = respObj.randomMsgFlag;
    }
    if(respObj.randomArrFlag){
        storeItems[userId][chapterType]['flowingFlag'] = respObj.randomArrFlag;
    }
    if(respObj.randomMsgArray){
        storeItems[userId][chapterType]['randomMsgArray'] = respObj.randomMsgArray;
    }
    storeItems[userId][chapterType]['mainMaster'] = respObj.mainMaster
    storeItems[userId][chapterType]['mainBranch'] = respObj.mainBranch
    
    try {
        await storage.write(storeItems)
        
    } catch (err) {
        await turnContext.sendActivity(`Write failed of UtteranceLogJS: ${err}`);
    }
}

async function creatingUtterance(storage, turnContext, userId, storeItems, channelId, conversationId, userChatId, chapterType){
    
    let dateNow = new Date();
    let botReply = ''; 
    // console.log('MicrosoftAppId', process.env.MicrosoftAppId)
    botReply = chatJson['introduction']['intro'][1]['text']
    let chapterName = {chapterName : 'introduction'};
    let botResp = await turnContext.sendActivities([
        { type: ActivityTypes.Typing },
        { type: 'delay', value: 3000 },
        { type: ActivityTypes.Message, text: botReply, value: JSON.stringify(chapterName) }
    ]);


    var turnNumber = 1;
    var convStartDate = dateNow.getDate() +"-"+ (dateNow.getMonth() + 1) +"-"+ dateNow.getFullYear();
    
    storeItems[userId] = { 
        userInfo: { 
            firstName: "", 
            lastName: "", 
            conversationId: conversationId, 
            convStartDate: convStartDate, 
            convStartTime: Date.now(),
            convLastDate: convStartDate, 
            convLastTime: Date.now(),
            convLastMsg: botReply,
            lastConvType: "introduction" 
        },
        introduction:{
            mainMaster: chatJson['introduction']['intro'][1]['nextPath']['master'],
            mainBranch: chatJson['introduction']['intro'][1]['nextPath']['branch'],
            prevMaster: "intro",
            prevBranch: 1
        },
        breastFeeding:{
            feelMessage: "",
            feedingType: "",
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        givingHealth:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter3:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter4:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter5:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter6:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter7:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter8:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter9:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter10:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter11:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        chapter12:{
            flowingFlag: 1,
            randomMsgFlag: 0,
            randomMsgArray: [],
            mainMaster: "",
            mainBranch: "",
            prevMaster: "",
            prevBranch: ""
        },
        "eTag": "*", 
        turnNumber 
    }

    try {
        await storage.write(storeItems)
        await saveBotReply(botReply, botResp[2].id, channelId, conversationId, userChatId, chapterType)
        
    } catch (err) {
        await turnContext.sendActivity(`Write failed: ${err}`);
    }
}

async function saveBotReply(text, botRespId, channelId, conversationId, userChatId, chapterType){
    unirest
    .post(API_URL+'chat/saveChat')
    .headers({'Content-Type': 'application/json'})
    .send({ 
        "type": 'message', 
        "id" : botRespId, 
        "timestamp": new Date(),
        "channelId": channelId,
        "from": { "id": "newTeddiBotDev", "name": "newTeddiBotDev"},
        "conversation": { "id" : conversationId},
        "text": text,
        "chapterType": chapterType, 
        "replyToId": userChatId
    })
    .then((response) => {
        // console.log(response.body)
    })
    .catch(err => {
        console.log(err)
    })
}
async function saveUserMsg(activity, chapterType){
    if( activity.text == '' || activity.text == 'end video'){
        console.log("This msg not saved")
        
    }else{
        unirest
        .post(API_URL+'chat/saveChat')
        .headers({'Content-Type': 'application/json'})
        .send({ 
            "type": activity.type, 
            "id" : activity.id, 
            "timestamp": activity.timestamp,
            "serviceUrl": activity.serviceUrl,
            "channelId": activity.channelId,
            "from": activity.from,
            "conversation": activity.conversation,
            "text": activity.text,
            // "chapterType": activity.chapterType,
            "chapterType": chapterType,
        })
        .then((response) => {
            // console.log(response.body)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

async function saveName(conversationId, fname, lname){
    unirest
    .post(API_URL+'users/setName')
    .headers({'Content-Type': 'application/json'})
    .send({ 
        "conversationId": conversationId, 
        "fname" : fname, 
        "lname": lname
    })
    .then((response) => {
        // console.log(response.body)
    })
    .catch(err => {
        console.log(err)
    })
}

async function checkFaq(turnContext){
    let userMsg = turnContext.activity.text.toLowerCase();
    
    return unirest
    // .post(API_URL+'chapterFaq/checkFaq')
    .post(API_URL+'chapterFaq/checkFaqBySelectiveWords')
    .headers({'Content-Type': 'application/json'})
    .send({ 
        "faq": userMsg,
    })
    .then(async(response) => {
        // console.log(response.body)
        return response.body
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports.EchoBot = EchoBot;
