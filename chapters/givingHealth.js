const { ActivityHandler, MessageFactory, ActivityTypes, builder } = require('botbuilder');
const chatJson = require('../chatJson')

var botReply = '';
var respObj = {}
var welcomeMsg = (chapterType) =>{
    botReply = chatJson[chapterType]['welcome'][1]['text']
    botReply += '#&@#'+chatJson[chapterType]['welcome'][1]['predict']
    respObj.botReply = botReply;
    respObj.mainMaster = chatJson[chapterType]['welcome'][1]['nextPath']['master'];
    respObj.mainBranch = chatJson[chapterType]['welcome'][1]['nextPath']['branch'];
    respObj.checkTypeing = false;
    respObj.randomMsgFlag = 0;
    respObj.randomArrFlag = 1;
    return respObj
}



var botResponse = (chapterType,mainMaster,mainBranch)=>{
    botReply = chatJson[chapterType][mainMaster][mainBranch]['text'];
    botReply += '#&@#';
    if(chatJson[chapterType][mainMaster][mainBranch]['predict'] != ''){
        botReply += '{"predictiveText" : ' +chatJson[chapterType][mainMaster][mainBranch]['predict']+ ' }' ;
    }
    
    respObj.botReply = botReply;
    respObj.mainMaster = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['master'];
    respObj.mainBranch = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['branch'];
    respObj.checkTypeing = true;
    return respObj
}

var obj = {
    chatJson: async(chapterType,userSession,turnContext) => { 

        if(userSession[chapterType].mainMaster == ''){ //check givingHealth branch
            //welcome message
            return welcomeMsg(chapterType)
             
        }else if(turnContext.activity.text != ''){
            var userMsg = turnContext.activity.text;
            userMsg = userMsg.toLowerCase();
            let mainMaster = userSession[chapterType].mainMaster;
            let mainBranch = userSession[chapterType].mainBranch;
            
            if(chatJson[chapterType][mainMaster][mainBranch]['func']){
                //call general function
                var resData = await chatJson[chapterType][mainMaster][mainBranch]['func'](chapterType,mainMaster,mainBranch,turnContext,userSession)
                if(resData.feelMsg){
                    respObj.feelMsg = resData.feelMsg;
                }
                if(resData.feedingType){
                    respObj.feedingType = resData.feedingType;
                }
                if(resData.randomMsgFlag){
                    respObj.randomMsgFlag = resData.randomMsgFlag;
                }
                if(resData.randomArrFlag){
                    // console.log('vnbvn', resData.randomArrFlag)
                    respObj.randomArrFlag = resData.randomArrFlag;
                }
                respObj.botReply = resData.botReply;
                respObj.mainMaster = resData.nextMaster;
                respObj.mainBranch = resData.nextBranch;
                respObj.checkTypeing = true;
                return respObj
                
            }else{
                //general bot response
                return botResponse(chapterType,mainMaster,mainBranch)
            }
            
        }else{
            console.log('blank msg');
            return respObj = {} ;
        }
        
    }
}

module.exports = obj;