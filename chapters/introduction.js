const { ActivityHandler, MessageFactory, ActivityTypes, builder } = require('botbuilder');
const chatJson = require('../chatJson')

var obj = {
    chatJson: async(chapterType,userSession,turnContext) => {
        
        var botReply = '';
        var respObj = {}
        
        var mainMaster = userSession[chapterType].mainMaster;
        var mainBranch = userSession[chapterType].mainBranch;
        
        if(chatJson[chapterType][mainMaster][mainBranch]['func']){
            var resData = await chatJson[chapterType][mainMaster][mainBranch]['func'](turnContext)
            respObj.fullname = resData.fullname;
            respObj.botReply = resData.botReply;
            respObj.mainMaster = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['master'];
            respObj.mainBranch = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['branch'];
            respObj.checkTypeing = true;
            return respObj
            
        }else{
            botReply = chatJson[chapterType][mainMaster][mainBranch]['text']
            botReply += '#&@#'+chatJson[chapterType][mainMaster][mainBranch]['predict']
            // await turnContext.sendActivity(botReply);
            respObj.botReply = botReply;
            respObj.mainMaster = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['master'];
            respObj.mainBranch = chatJson[chapterType][mainMaster][mainBranch]['nextPath']['branch'];
            respObj.checkTypeing = true;
            return respObj
        }
        
        
    }
}

module.exports = obj;