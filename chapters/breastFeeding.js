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
    return respObj
}

var playV3video = (currentMaster, currentBranch)=>{
    let url_list = '[{"English": "https://teddibucketdev.blob.core.windows.net/videoscontainer/V3 Human Milk advert with subtitles.mp4" }, {"Bengali":"https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Bengali_V1.mp4"}, {"Arabic":"https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Arabic_V1.mp4"}]'
    botReply = ''
    botReply += '#&@#{"selectVideo" : '+url_list+' }'
 
    respObj.botReply = botReply;
    respObj.mainMaster = currentMaster;
    respObj.mainBranch = currentBranch;
    respObj.checkTypeing = true;
    return respObj
}

var playV2video = (currentMaster, currentBranch)=>{
    var URL = 'https://teddibucketdev.blob.core.windows.net/videoscontainer/V2 Baby Books Animation (1).mp4';
    // var URL = 'https://teddivideostorage.blob.core.windows.net/videocontainer/videodemo.mov';
    let url_list = '[{"English":"'+URL+'"}]'
    botReply = ''
    botReply += '#&@#{"selectVideo" : '+url_list+' }'
    // await turnContext.sendActivity(botReply);
    respObj.botReply = botReply;
    respObj.mainMaster = currentMaster;
    respObj.mainBranch = currentBranch;
    respObj.checkTypeing = true;
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

        if(userSession[chapterType].mainMaster == ''){ //check breastFeeding branch
            //welcome message
            return welcomeMsg(chapterType)
             
        }else if(turnContext.activity.text != ''){
            var userMsg = turnContext.activity.text;
            userMsg = userMsg.toLowerCase();
            let mainMaster = userSession[chapterType].mainMaster;
            let mainBranch = userSession[chapterType].mainBranch;
            if(userMsg == 'play the breast feeding video'){
                //play breast feeding video at anytime
                return playV3video(mainMaster, mainBranch);
            }else if(userMsg == "play amy's video on baby books" || userMsg == "play amy’s video on baby books"){
                //play AMY's video at anytime
                return playV2video(mainMaster, mainBranch);
            }else if(userMsg == "end video"){
                if((mainMaster == 'v3Conversation' && mainBranch == 2) || (mainMaster == 'v2Conversation' && mainBranch == 2)){
                    return botResponse(chapterType,mainMaster,mainBranch);
                }else{
                    return respObj = {};
                }

            }else{
                // var mainMaster = userSession[chapterType].mainMaster;
                // var mainBranch = userSession[chapterType].mainBranch;
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
                    respObj.checkTypeing = true;
                    return respObj
                    
                }else{
                    //general bot response
                    return botResponse(chapterType,mainMaster,mainBranch)
                }

            }
            
        }else{
            console.log('blank msg');
            return respObj = {} ;
        }
        
    }
}

module.exports = obj;