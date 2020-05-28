// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, ActivityTypes } = require('botbuilder');
const { CosmosDbPartitionedStorage } = require('botbuilder-azure');
var unirest = require('unirest');
const dbConfig = require('./dbConfig');
var API_URL = dbConfig.API_URL
var chatJson = require('./chatJson')

// chapters patha
var introductionPath = require('./chapters/introduction')
var breastFeedingPath = require('./chapters/breastFeeding')

// Create access to CosmosDb Storage - this replaces local Memory Storage.
var storage = new CosmosDbPartitionedStorage({
    cosmosDbEndpoint: dbConfig.DB_SERVICE_ENDPOINT, 
    authKey: dbConfig.AUTH_KEY, 
    databaseId: dbConfig.DATABASE_ID,
    containerId: dbConfig.CONTAINER
})


class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            await saveUserMsg(context.activity)

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
    let chapterType = '';
    if(turnContext.activity.chapterType === undefined){
        chapterType = 'introduction';
    }else{
        chapterType = turnContext.activity.chapterType;
    }
    
    var dateNow = new Date();
    let userChatId = turnContext.activity.id;
    let channelId = turnContext.activity.channelId;
    
    
    // debugger;
    try {
        // var userId= turnContext.activity.from.id
        var userId= 'User'+turnContext.activity.conversation.id;
        var conversationId= turnContext.activity.conversation.id;
        // Read from the storage.
        let storeItems = await storage.read([userId])
        // Check the result.
        var conversationLog = storeItems[userId];
        if (typeof (conversationLog) != 'undefined') {
            if(typeof (turnContext.activity.text) != 'undefined'){
                var respObj
                switch(chapterType) {
                    case "introduction": {
                        respObj = await introductionPath.chatJson(chapterType,storeItems[userId],turnContext)
                        break;
                    }
                    case "breastFeeding": {
                        respObj = await breastFeedingPath.chatJson(chapterType,storeItems[userId],turnContext)
                        break;
                    }
                    default: {
                       //statements;
                       break;
                    }
                 }
                 

                
                
                // The log exists so we can write to it.
                storeItems[userId].turnNumber++;

                if(respObj.fullname){
                    // storeItems[userId].userInfo.firstName = respObj.fullname;
                    var fullname = respObj.fullname;
                    var arr = fullname.split(' ')
                    var fname = ''
                    var lname = arr[arr.length-1]
                    for(var i=0; i<arr.length-1; i++){
                        fname += arr[i]+' '
                    }
                    fname = fname.trim();
                    storeItems[userId].userInfo.firstName = fname;
                    storeItems[userId].userInfo.lastName = lname;
                }
                
                let botResp = await turnContext.sendActivities([
                    { type: ActivityTypes.Typing },
                    { type: 'delay', value: 3000 },
                    { type: ActivityTypes.Message, text: respObj.botReply }
                ]);
                
                await saveBotReply(respObj.botReply, botResp[2].id, channelId, conversationId, userChatId, chapterType)
                
                if(respObj.botReply != ''){
                    storeItems[userId].userInfo.convLastMsg = respObj.botReply;
                }
                var convLastDate = dateNow.getDate() +"-"+ (dateNow.getMonth() + 1) +"-"+ dateNow.getFullYear();
                storeItems[userId].userInfo.convLastDate = convLastDate;
                storeItems[userId].userInfo.convLastTime = Date.now();
                storeItems[userId].userInfo.lastConvType = Date.now();
                if(respObj.feelMsg){
                    storeItems[userId][chapterType]['feelMessage'] = respObj.feelMsg;
                }
                if(respObj.feedingType){
                    storeItems[userId][chapterType]['feedingType'] = respObj.feedingType;
                }
                storeItems[userId][chapterType]['mainMaster'] = respObj.mainMaster
                storeItems[userId][chapterType]['mainBranch'] = respObj.mainBranch
                
                try {
                    await storage.write(storeItems)
                    
                } catch (err) {
                    await turnContext.sendActivity(`Write failed of UtteranceLogJS: ${err}`);
                }
            }else{
                console.log('text is undefined value')
            }
            
        }
        else{   
            console.log(`Creating and saving new utterance log`);
            let botReply = ''; 
            botReply = chatJson['introduction']['intro'][1]['text']

            let botResp = await turnContext.sendActivities([
                { type: ActivityTypes.Typing },
                { type: 'delay', value: 3000 },
                { type: ActivityTypes.Message, text: botReply }
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
                    feelMessage:"",
                    feedingType:"",
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
    }
    catch (err){
        await turnContext.sendActivity(`Read rejected. ${err}`);
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
async function saveUserMsg(activity){
    console.log('*'+activity.text+'*')
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
            "chapterType": activity.chapterType,
        })
        .then((response) => {
            // console.log(response.body)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports.EchoBot = EchoBot;
