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
    return respObj
}

var playV3video = ()=>{
    botReply = 'Okay. Please select language';
    botReply += '#&@#{"predictiveText" : ["Bengali", "Arabic"]}'
    // await turnContext.sendActivity(botReply);
    respObj.botReply = botReply;
    respObj.mainMaster = 'v3Conversation';
    respObj.mainBranch = 2;
    return respObj
}

var playV2video = ()=>{
    // var URL = 'https://teddivideostorage.blob.core.windows.net/videocontainer/V2 Baby Books Animation (1).mp4';
    var URL = 'https://teddivideostorage.blob.core.windows.net/videocontainer/videodemo.mov';
    botReply = 'Pleace click the link : '+URL;
    botReply += '#&@#{"videoPath" : "'+URL+'"}';
    // await turnContext.sendActivity(botReply);
    respObj.botReply = botReply;
    respObj.mainMaster = 'v2Conversation';
    respObj.mainBranch = 2;
    return respObj
}

var botResponse = (chapterType,mainMaster,mainBranch)=>{
    botReply = chatJson[chapterType][mainMaster][mainBranch]['text']
    botReply += '#&@#'+chatJson[chapterType][mainMaster][mainBranch]['predict']
    respObj.botReply = botReply;
    respObj.mainMaster = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['master'];
    respObj.mainBranch = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['branch'];
    return respObj
}

var obj = {
    chatJson: async(chapterType,userSession,turnContext) => { 

        if(userSession[chapterType].mainMaster == ''){ //check breastFeeding branch
            //welcome message
            return welcomeMsg(chapterType)
             
        }else if(turnContext.activity.text != ''){
            var userMsg = turnContext.activity.text;
            userMsg = userMsg.toLowerCase()
            if(userMsg == 'play the breast feeding video'){
                //play breast feeding video at anytime
                return playV3video();
            }else if(userMsg == "play amy's video on baby books" || userMsg == "play amy’s video on baby books"){
                //play AMY's video at anytime
                return playV2video();
            }else{
                var mainMaster = userSession[chapterType].mainMaster;
                var mainBranch = userSession[chapterType].mainBranch;
                //check in JSON's node declare any function or not
                if(chatJson[chapterType][mainMaster][mainBranch]['func']){
                    //call general function
                    var resData = await chatJson[chapterType][mainMaster][mainBranch]['func'](chapterType,mainMaster,mainBranch,turnContext)
                    if(resData.feelMsg){
                        respObj.feelMsg = resData.feelMsg;
                    }
                    if(resData.feedingType){
                        respObj.feedingType = resData.feedingType;
                    }
                    respObj.botReply = resData.botReply;
                    respObj.mainMaster = resData.nextMaster;
                    respObj.mainBranch = resData.nextBranch;
                    return respObj
                    
                }else{
                    //general bot response
                    return botResponse(chapterType,mainMaster,mainBranch)
                }

            }
            
        }else{
            console.log('blank msg');
            // return respObj.botReply = '';
        }
        
    }
}

module.exports = obj;