
let nextMaster = '';
let nextBranch = '';
let botReply = '';
let tempRandomArr = [];
let tempRandomArrOfChap2 = [];
let tempRandomArrOfChap3 = [];
let tempRandomArrOfChap4 = [];
let tempRandomArrOfChap5 = [];
let tempRandomArrOfChap6 = [];

const setName = async(turnContext)=>{
    var userMsg = turnContext.activity.text;
    userMsg = (userMsg).replace(/#UserConv.+/g, '');
    userMsg = userMsg.toLowerCase();
    var chkNmArr = ["my", "name", "nam", "is", "and", "want", "to", "quit", "smoke", "smoking", "hi", "that", "that's", "i", "am", "im", "i'm", "great", ".", ",", ";", ":",'like','say', 'myself'];

    for (val of chkNmArr) {
        var pattern = new RegExp("(^|\\W)" + val + "($|\\W)", "g");
        // var re = new RegExp(pattern);

        if (userMsg.indexOf(val) !== -1) {
            userMsg = userMsg.replace(pattern, '');
        } 
    }

    userMsg = userMsg.trim();
    var newRespArr = userMsg.split(" ");
    var fullname = '';
    if (newRespArr.length > 0) {
        var counter = 0;
        for (wrd of newRespArr) {
            wrd = wrd.charAt(0).toUpperCase() + wrd.slice(1);
            newRespArr[counter] = wrd;
            counter++;
        }
        fullname = newRespArr.join(' ');
    }


    botReply = 'It’s nice to meet you '+fullname+'! If I wasn’t a robot and could have kids I’d name them '+fullname+'! The years between birth and starting school are a time of amazing growth and development. As your robo-support, I will guide you towards information and advice that is evidence based to help give your child the best possible start to life! How does that sound?'
    botReply += '#&@#';
    // console.log(botReply)
    // await turnContext.sendActivity(botReply);
    return {fullname,botReply};
}

const feedingFeelmsg = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    
    var feelMsg = turnContext.activity.text;
    botReply = 'I understand. Breast feeding provides your baby with perfect nutrition, boosts baby’s immunity, and creates a special bond - all of which combine to give your baby a great start in life! Would you like to see a video on breast feeding?';
    botReply += '#&@#{"predictiveText" : ["Yes", "Not right now"]}';
    
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    // await turnContext.sendActivity(botReply);

    return {feelMsg,botReply,nextMaster,nextBranch}
}

const saveFeedingType = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    
    var feedingType = turnContext.activity.text;
    botReply = 'Okay, thanks for that! It’s common for new mothers to use baby books for support and guidance. My friend Professor Amy Brown has made a video on this topic. Would you like to watch the video?';
    botReply += '#&@#{"predictiveText" : ["Yes", "Not right now"]}';
    
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    // await turnContext.sendActivity(botReply);

    return {feedingType,botReply,nextMaster,nextBranch}
}


const PlayV2video= async(chapterType,mainMaster,mainBranch,turnContext)=>{
    var userMsg = turnContext.activity.text;
    var URL = ''
    userMsg = userMsg.toLowerCase()
    var arr=['ofcourse','sure','yes','obviously', 'please right now'];
    if(arr.indexOf(userMsg) != -1){
        let url_list = '[{"English":"'+obj[chapterType][mainMaster][mainBranch]['url']+'"}]'
        botReply = ''
        botReply += '#&@#{"selectVideo" : '+url_list+' }';
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }else{
        botReply = 'You can watch the video at any time by telling me \'Play Amy’s video on baby books\'. How confident do you feel about breast feeding successfully?';
        botReply += '#&@#';
        nextMaster = 'tipsConversation'
        nextBranch = 1
    }
    // await turnContext.sendActivity(botReply);
    return {botReply,nextMaster,nextBranch}
}

const checkV3Url= async(chapterType,mainMaster,mainBranch,turnContext)=>{
    var userMsg = turnContext.activity.text;
    userMsg = userMsg.toLowerCase()
    var arr=['ofcourse','sure','yes','obviously', 'please right now'];
    if(arr.indexOf(userMsg) != -1){
        let url_list = '[{"English":"'+obj[chapterType][mainMaster][mainBranch]['url']['English']+'"}, {"Bengali":"'+obj[chapterType][mainMaster][mainBranch]['url']['Bengali']+'"}, {"Arabic":"'+obj[chapterType][mainMaster][mainBranch]['url']['Arabic']+'"}]'
        botReply = ''
        botReply += '#&@#{"selectVideo" : '+url_list+' }'
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }else{
        botReply = 'You can watch the video at any time by telling me \'Play the breast feeding video\'. How long do you think babies should be breastfed for?';
        botReply += '#&@#'
        nextMaster = 'breastfedConv'
        nextBranch = 1
    }
    // await turnContext.sendActivity(botReply);
    return {botReply,nextMaster,nextBranch}
}

const checkBreastfedDuration = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    var userMsg = turnContext.activity.text;
    userMsg = userMsg.toLowerCase()
    var arr=['6 months','six months','12 months','twelve months', '1 year', 'one year', 'a year'];
    
    let checkFlag = false;
    for(var i=0 ; i<arr.length; i++){
        if(userMsg.search(arr[i]) != -1){
            checkFlag = true;
            break;
        }
    }

    if(checkFlag){
        botReply = 'Correct 😊 Ideally all babies should be exclusively breastfed for the first six months of life. Breastfeeding should ideally also carry on during the second six months, through weaning and beyond. How does that sound?';
        botReply += '#&@#';
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }else{
        botReply = 'Ideally all babies should be exclusively breastfed for the first six months of life. Breastfeeding should ideally also carry on during the second six months, through weaning and beyond. How does that sound?';
        botReply += '#&@#'
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }

    // console.log(checkFlag)
    // console.log(botReply)
    
    return {botReply,nextMaster,nextBranch}
}

const checkTips1 = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    var userMsg = turnContext.activity.text;
    userMsg = userMsg.toLowerCase()
    var arr=['ofcourse','sure','yes','obviously', 'please right now', 'yes, that would be great!'];
    if(arr.indexOf(userMsg) != -1){
        botReply = obj[chapterType][mainMaster][mainBranch]['targetMsg']['forYes']
        botReply += '#&@#';
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }else{
        botReply = obj[chapterType][mainMaster][mainBranch]['targetMsg']['forNo']
        botReply += '#&@#';
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }
    
    return {botReply,nextMaster,nextBranch}
}

const randomResp1 = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    let resp = obj[chapterType][mainMaster][mainBranch]['targetMsgArr'];
    botReply = resp[Math.floor(Math.random() * resp.length)].respMsg;
    botReply += '#&@#';
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch}
}
const randomResp2 = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    let resp = obj[chapterType][mainMaster][mainBranch]['targetMsgArr'];
    botReply = resp[Math.floor(Math.random() * resp.length)].respMsg;
    botReply += '#&@#';
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch}
}
const randomResp3 = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    let resp = obj[chapterType][mainMaster][mainBranch]['targetMsgArr'];
    botReply = resp[Math.floor(Math.random() * resp.length)].respMsg;
    botReply += '#&@#';
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch}
}
const randomResp4 = async(chapterType,mainMaster,mainBranch,turnContext)=>{
    let resp = obj[chapterType][mainMaster][mainBranch]['targetMsgArr'];
    botReply = resp[Math.floor(Math.random() * resp.length)].respMsg;
    botReply += '#&@#';
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch}
}

const randomResp5 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    // console.log(userSession.breastFeeding.chap1RandomMsgFlag)
    
    let randomArrFlag = userSession.breastFeeding.flowingFlag;
    let randomMsgFlag = userSession.breastFeeding.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    let resp = ''
    if(randomArrFlag == 1 ){
        // console.log('here1')
        resp = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        // console.log('here2')
        resp = [...tempRandomArr];
    }
    // console.log('resp',resp)
    let index = Math.floor(Math.random() * resp.length);
    randomArrFlag = 2;
    let randomObj = resp[index];
    resp.splice(index,1)
    
    tempRandomArr = [...resp];
    // console.log('temp2',tempRandomArr)
    let botReply = '';
    if( randomObj.respMsg == 'How are you feeling, '){
        botReply += randomObj.respMsg ;
        botReply += userSession.userInfo.firstName+'? 😊' ;
    }else{
        botReply += randomObj.respMsg;
    }
    
    botReply += '#&@#';

    if(randomObj.predict != ''){
        botReply += '{"predictiveText" : ' +randomObj.predict+ ' }' ;
        botReply += '#&@#';
    }
    if(randomMsgFlag == 1){
        botReply += comnMsg;
    }

    if(tempRandomArr.length == 0){
        // console.log('in')
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag}
}
const randomRespOfChap2 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    
    let randomArrFlag = userSession.givingHealth.flowingFlag;
    let randomMsgFlag = userSession.givingHealth.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    let resp = ''
    if(randomArrFlag == 1 ){
        // console.log('here1')
        resp = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        // console.log('here2')
        resp = [...tempRandomArrOfChap2];
    }
    // console.log('resp',resp)
    let index = Math.floor(Math.random() * resp.length);
    randomArrFlag = 2;
    // console.log('randomArrFlag',randomArrFlag)
    let randomObj = resp[index];
    resp.splice(index,1)
    
    tempRandomArrOfChap2 = [...resp];
    // console.log('temp2',tempRandomArrOfChap2)
    let botReply = '';
    botReply += randomObj.respMsg;
    botReply += '#&@#';

    if(randomObj.predict != ''){
        botReply += '{"predictiveText" : ' +randomObj.predict+ ' }' ;
        botReply += '#&@#';
    }
    if(randomMsgFlag == 1){
        botReply += comnMsg;
    }

    if(tempRandomArrOfChap2.length == 0){
        // console.log('in')
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag}
}

const checkFruitConsume = async(chapterType,mainMaster,mainBranch,turnContext, userSession) =>{
    var userMsg = turnContext.activity.text;
    userMsg = userMsg.toLowerCase()
    var arr=['5','five'];
    
    let checkFlag = false;
    for(var i=0 ; i<arr.length; i++){
        if(userMsg.search(arr[i]) != -1){
            checkFlag = true;
            break;
        }
    }

    if(checkFlag){
        botReply = 'That’s correct! You should have 5 portions of fruits and vegetables a day! Fruit and vegetables are an important part of a healthy, balanced diet and help you to stay healthy. They contain dietary fibre and provide a wide range of vitamins and minerals. It\'s important that you eat enough of them, and that you also provide children with a diet containing plenty of these as well. Not only will this help with health today but will also set up great dietary habits for life. You can ask me about why they are good, portion sizes, and what counts towards your 5-a-day!';
        botReply += '#&@#{"predictiveText" : ["Why are fruits and vegetables good?", "What is a portion of fruits and vegetables?", "What counts towards my 5 a day?"] }';
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }else{
        botReply = 'You should have 5 portions of fruits and vegetables a day! Fruit and vegetables are an important part of a healthy, balanced diet and help you to stay healthy. They contain dietary fibre and provide a wide range of vitamins and minerals. It\'s important that you eat enough of them, and that you also provide children with a diet containing plenty of these as well. Not only will this help with health today but will also set up great dietary habits for life. You can ask me about why they are good, portion sizes, and what counts towards your 5-a-day!';
        botReply += '#&@#{"predictiveText" : ["Why are fruits and vegetables good?", "What is a portion of fruits and vegetables?", "What counts towards my 5 a day?"] }';
        nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
        nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    }

    // console.log(checkFlag)
    // console.log(botReply)
    
    return {botReply,nextMaster,nextBranch}
}

const feelAboutVaccination = async(chapterType,mainMaster,mainBranch,turnContext, userSession) =>{
    let botReply = '';
    botReply += 'Thanks for telling me, ';
    botReply += userSession.userInfo.firstName+'! ';
    botReply += 'In the UK, we have a free vaccination programme to help protect our babies and children from a range of childhood diseases. This is called the Routine Childhood Immunisation Schedule.  These are all listed in your child’s Red Book and your Health Visitor or GP will advise you when they are due. Having all of the vaccinations recommended is really important to help your child build up their immunity and avoid diseases which can harm children badly.';
    botReply += '#&@#';
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch}
}

const randomRespOfChap3 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter3.flowingFlag;
    let randomMsgFlag = userSession.chapter3.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    let resp = ''
    if(randomArrFlag == 1 ){
        resp = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        resp = [...tempRandomArrOfChap3];
    }
    
    let index = Math.floor(Math.random() * resp.length);
    randomArrFlag = 2;

    let randomObj = resp[index];
    resp.splice(index,1)
    
    tempRandomArrOfChap3 = [...resp];

    let botReply = '';
    botReply += randomObj.respMsg.replace("user name", userSession.userInfo.firstName);
    botReply += '#&@#';

    if(randomObj.predict != ''){
        botReply += '{"predictiveText" : ' +randomObj.predict+ ' }' ;
        botReply += '#&@#';
    }
    if(randomMsgFlag == 1){
        botReply += comnMsg;
    }

    if(tempRandomArrOfChap3.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag}
}
const randomRespOfChap4 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter4.flowingFlag;
    let randomMsgFlag = userSession.chapter4.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    let resp = ''
    if(randomArrFlag == 1 ){
        resp = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        resp = [...tempRandomArrOfChap4];
    }
    
    let index = Math.floor(Math.random() * resp.length);
    randomArrFlag = 2;

    let randomObj = resp[index];
    resp.splice(index,1)
    
    tempRandomArrOfChap4 = [...resp];

    let botReply = '';
    botReply += randomObj.respMsg.replace("user name", userSession.userInfo.firstName);
    botReply += '#&@#';

    if(randomObj.predict != ''){
        botReply += '{"predictiveText" : ' +randomObj.predict+ ' }' ;
        botReply += '#&@#';
    }
    if(randomMsgFlag == 1){
        botReply += comnMsg;
    }

    if(tempRandomArrOfChap4.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag}
}
const randomRespOfChap5 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter5.flowingFlag;
    let randomMsgFlag = userSession.chapter5.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    let resp = ''
    if(randomArrFlag == 1 ){
        resp = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        resp = [...tempRandomArrOfChap5];
    }
    
    let index = Math.floor(Math.random() * resp.length);
    randomArrFlag = 2;

    let randomObj = resp[index];
    resp.splice(index,1)
    
    tempRandomArrOfChap5 = [...resp];

    let botReply = '';
    botReply += randomObj.respMsg.replace("user name", userSession.userInfo.firstName);
    botReply += '#&@#';

    if(randomObj.predict != ''){
        botReply += '{"predictiveText" : ' +randomObj.predict+ ' }' ;
        botReply += '#&@#';
    }
    if(randomMsgFlag == 1){
        botReply += comnMsg;
    }

    if(tempRandomArrOfChap5.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag}
}

const randomRespOfChap6 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter6.flowingFlag;
    let randomMsgFlag = userSession.chapter6.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    let resp = ''
    if(randomArrFlag == 1 ){
        resp = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        resp = [...tempRandomArrOfChap6];
    }
    
    let index = Math.floor(Math.random() * resp.length);
    randomArrFlag = 2;

    let randomObj = resp[index];
    resp.splice(index,1)
    
    tempRandomArrOfChap6 = [...resp];

    let botReply = '';
    botReply += randomObj.respMsg.replace("user name", userSession.userInfo.firstName);
    botReply += '#&@#';

    if(randomObj.predict != ''){
        botReply += '{"predictiveText" : ' +randomObj.predict+ ' }' ;
        botReply += '#&@#';
    }
    if(randomMsgFlag == 1){
        botReply += comnMsg;
    }

    if(tempRandomArrOfChap6.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag}
}

var obj = {
    introduction: {
        intro:{
            1: {
                text: 'Hello, I’m Teddi! I am your early years robo-support. What is your name? 😊',
                nextPath: {
                    master: "intro",
                    branch: 2
                }
            },
            2: {
                predict: '',
                func: setName,
                nextPath: {
                    master: "intro",
                    branch: 3
                }
            },
            3: {
                text: 'Raising a child can be really tough and the early years between 0-5 are formative. I have packaged decades worth of parenting expertise, research, and evidence into 12 chapters that you can access at any time. You can speak to me by pressing and holding the microphone button below and hear me read a message by pressing and holding a message. Press the button below to get started.',
                predict: '{"enterBtn" : "LET\'S BEGIN!"}',
                nextPath: {
                    master: "intro",
                    branch: 3
                }
            }
        }
    },
    breastFeeding: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 1! This chapter is all about breast and bottle feeding. How do you feel about breast feeding?',
                predict: '',
                nextPath: {
                    master: "feelMessage",
                    branch: 1
                    // master: "tipsConversation",
                    // branch: 10
                }
            }
        },
        feelMessage: {
            1: {
                predict: '["Yes!", "Not right now"]',
                func: feedingFeelmsg,
                nextPath: {
                    master: "v3Conversation",
                    branch: 1
                }
            }
        },
        v3Conversation: {
            1: {
                func: checkV3Url,
                url:{
                    English: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/V3 Human Milk advert with subtitles.mp4',
                    Bengali: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Bengali_V1.mp4',
                    Arabic: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Arabic_V1.mp4'
                    // English: 'https://teddivideostorage.blob.core.windows.net/videocontainer/videodemo.mov',
                    // Bengali: 'https://teddivideostorage.blob.core.windows.net/videocontainer/videodemo.mov',
                    // Arabic: 'https://teddivideostorage.blob.core.windows.net/videocontainer/videodemo.mov'
               
                },
                nextPath: {
                    master: "v3Conversation",
                    branch: 2
                }
            },
            2: {
                text: 'You can watch the video at any time by telling me ‘Play the breast feeding video’. How long do you think babies should be breastfed for?',
                predict: '',
                nextPath: {
                    master: "breastfedConv",
                    branch: 1
                }
            }
        },
        breastfedConv: {
            1: {
                func: checkBreastfedDuration,
                nextPath: {
                    master: "breastfedConv",
                    branch: 2
                }
            },
            2: {
                text: 'It’s true that many women start to breastfeed, but then stop quite quickly - often before 6-8 weeks. Breast feeding is a skill and like anything new a little guidance and support can go a long way. Feel free to ask me any questions you may have and I’ll do my best to answer them. I’m only a robot and if I can’t answer your question please provide feedback by pressing the feedback button on the chapter screen. Are you feeding breast milk, only bottle milk, or a bit of both?',
                predict: '["Breast Milk", "Bottle Milk", "A bit of both"]',
                nextPath: {
                    master: "breastfedConv",
                    branch: 3
                }
            },
            3: {
                func: saveFeedingType,
                nextPath: {
                    master: "v2Conversation",
                    branch: 1
                }
            }
        },
        v2Conversation: {
            1: {
                func: PlayV2video,
                url: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/V2 Baby Books Animation (1).mp4',
                // url: 'https://teddivideostorage.blob.core.windows.net/videocontainer/videodemo.mov',
                nextPath: {
                    master: "v2Conversation",
                    branch: 2
                }
            },
            2: {
                text: 'You can watch the video at any time by telling me ‘Play Amy’s video on baby books’. How confident do you feel about breast feeding successfully?',
                predict: '',
                nextPath: {
                    master: "tipsConversation",
                    branch: 1
                }
            }
        },
        tipsConversation: {
            1: {
                text: 'Nearly all women can breast feed successfully, but almost everyone needs support, especially when they are starting out. I’m here to help you, but don’t be shy about asking your midwife or health visitor for help or advice. There is no need to struggle on your own! Would you like to know some simple tips to help yourself breast feed?',
                predict: '["Yes, that would be great!", "Not right now, tell me something else"]',
                nextPath: {
                    master: "tipsConversation",
                    branch: 2
                }
            },
            2: {
                func: checkTips1,
                targetMsg: {
                    forYes: '•	Make sure you eat well and drink plenty of water.\n\n •	Let people around you help out with chores and other stuff so you can rest. \n\n •	Be kind and look after yourself.\n\n •	Get comfortable! Use pillows or cushions if necessary. Your shoulders and arms should be relaxed.\n\n  How does that sound? ',
                    forNo: 'How do you feel about how you hold your baby for breastfeeding?'
                },
                nextPath: {
                    master: "tipsConversation",
                    branch: 3
                }
            },
            3: {
                func: randomResp1,
                targetMsgArr: [
                    {
                        respMsg: 'Breastfeeding is amazing and natural. It’s a good to hold your baby close to you with their nose, tummy and toes in a line, facing your breast from underneath.'
                    },
                    {
                        respMsg: 'Others have been in your position. It’s good to hold your baby close to you with their nose, tummy and toes in a line, facing your breast from underneath.'
                    }
                ],
                nextPath: {
                    master: "tipsConversation",
                    branch: 4
                }
            },
            4: {
                func: randomResp2,
                targetMsgArr: [
                    {
                        respMsg: 'Once your baby’s head and neck are close to you and inline, support your baby’s neck rather than their head so that they can tilt their head back as they begin to feed.'
                    },
                    {
                        respMsg: 'Your baby’s head and neck should be close to you and inline. Then, support your baby’s neck rather than their head so that they can tilt their head back as they begin to feed. '
                    }
                ],
                nextPath: {
                    master: "tipsConversation",
                    branch: 5
                }
            },
            5: {
                func: randomResp3,
                targetMsgArr: [
                    {
                        respMsg: 'When you’re supporting your baby’s neck, shoulders and back, this should allow them to tilt their head back and swallow easily.'
                    },
                    {
                        respMsg: 'With you baby close to you, facing your breast, and having their neck, shoulders, and back supported, this should allow them to tilt their head back and swallow easily.'
                    }
                ],
                nextPath: {
                    master: "tipsConversation",
                    branch: 6
                }
            },
            6: {
                text: 'Bring your baby to the breast and let them latch themselves. Avoid leaning your breast forward into your baby\'s mouth, as this can lead to poor attachment.',
                predict: '',
                nextPath: {
                    master: "tipsConversation",
                    branch: 7
                }
            },
            7: {
                func: randomResp4,
                targetMsgArr: [
                    {
                        respMsg: 'Gently rub your nipple between your baby’s top lip and nose to encourage them to open their mouth wide.'
                    },
                    {
                        respMsg: 'To encourage your baby to open their mouth wide, place your nipple just under your baby’s nose.'
                    }
                ],
                nextPath: {
                    master: "tipsConversation",
                    branch: 8
                }
            },
            8: {
                text: 'Try not to hold the back of your baby\'s head, so that they can tip their head back. This way your nipple goes past the hard roof of their mouth and ends up at the back of their mouth against the soft palate.',
                predict: '',
                nextPath: {
                    master: "tipsConversation",
                    branch: 9
                }
            },
            9: {
                text: 'Would you like to know about understanding if your is baby getting enough milk, or about latching your baby on your breast? Or, you can ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                predict: '["Is my baby getting enough milk?", "Is my baby attaching well?"]',
                nextPath: {
                    master: "tipsConversation",
                    branch: 10
                }
            },
            10: {
                func: randomResp5,
                targetMsgArr: [
                    {
                        respMsg: 'It’s worth remembering that you can breastfeed, and you are producing enough milk – feel confident! Every baby, and every mum is unique, and you and your baby will get to know each other and develop a pattern of feeds that suit you both. Babies may want to suckle very frequently day and night and that is perfectly normal – they have a tiny tummy and so of course they need to eat little and often.',
                        predict: ''
                    },
                    {
                        respMsg: 'One of the challenges of babies is that their needs can change from day to day. Responsive feeding does not follow a set routine but allows both you and baby to feed as often as you want to. Try to stay relaxed, watch for your baby’s cues for when they want a feed (such as rooting for the breast) and feed as often and as long as baby needs.',
                        predict: ''
                    },
                    {
                        respMsg: 'Breastfeeding takes 4 – 6 weeks to fully establish and during that time baby will need to feed frequently. Be realistic about what you can achieve each day. Set yourself a few small essential tasks and don’t take on too much so that you feel in control and not overwhelmed.',
                        predict: ''
                    },
                    {
                        respMsg: 'It is important to learn how to help yourself – no one can do everything, and breastfeeding takes time. It’s important to be kind to yourself and realistic about what you want to manage each day. Set a few small goals that you know you can achieve, and that will help you to feel better. These might be as simple as taking a warm shower or eating a proper hot meal (and if some else cooks it for you – even better!).',
                        predict: ''
                    },
                    {
                        respMsg: 'Try to allow yourself plenty of time to get anywhere - babies have a habit or filling their nappies or wanting a feed just as you put your coat on to go somewhere. It’s all part of the fun!',
                        predict: ''
                    },
                    {
                        respMsg: 'It may take a little while before you feel confident your baby is getting what they need. Remember that some babies feed quicker than others, and at first it may seem that breastfeeding takes an age, but this will get quicker as you both get the hang of it. Introducing formula feeds will reduce the amount of breast milk you produce and make breast-feeding harder. If you are concerned talk to your Health Visitors, or breast-feeding Advisor before making any changes.',
                        predict: ''
                    },
                    {
                        respMsg: 'Having a new baby can be very tiring and it’s important that mums make time to eat regularly when breast-feeding not only to feed themselves but also to help make the milk for baby. Try to have regular meals, drinks and snacks during the day. Have a drink every hour or so and eat a meal or nutritious snack every 2-3 hours to help keep you going.',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s an amazing thing to have a child and raise it. I’m here to help you. You can ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner. Remember – you can also talk to your health visitor or GP.',
                        predict: ''
                    },
                    {
                        respMsg: 'Would you like to know about the difference between breast milk and formula/bottle, or about why breastmilk is special? Or, you can ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                        predict: '["What is the difference between breast milk and formula/bottle?", "Why is Breastmilk so special?"]'
                    },
                    {
                        respMsg: 'It’s normal to wonder which breast to give. Each breast works separately and it’s important to remember to feed from both sides. Once baby comes off one breast, offer the second – if they don’t want it that great news, they are full. Or they may want just a little bit more. Then start the next feed on this second side.',
                        predict: ''
                    },
                    {
                        respMsg: 'How are you feeling, ',
                        predict: ''
                    },
                    {
                        respMsg: 'Remember to drink plenty of water and take time to rest. Try and get help for chores.',
                        predict: ''
                    },
                    {
                        respMsg: 'In the early days your baby may want to feed very often. It could be as much as every hour in the first few days and 8 times or more every 24 hours during the first few weeks. Feed your baby as often as they want and for as long as they want. They\'ll begin to have fewer, longer feeds after a few days. It\'s fine to feed your baby whenever they are hungry, when your breasts feel full or if you just want to have a cuddle. Don’t worry it\'s not possible to overfeed a breastfed baby.',
                        predict: ''
                    },
                    {
                        respMsg: 'Would you like to know about responsive breastfeeding, or about how to burp your baby? You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                        predict: '["What is Responsive Breast Feeding?", "How do I burp my baby?"]'
                    },
                    {
                        respMsg: 'Remember, YOU CAN BREASTFEED! It’s the best choice and great for you and the baby!',
                        predict: ''
                    },
                    {
                        respMsg: 'Here are some questions I can help you with: \n\n Can I use formula and continue to breastfeed?\n\n Can I put baby rice in the milk bottle?\n\n What is mastitis?\n\n Can I buy a vegan formula milk?\n\n What is cluster feeding?',
                        predict: ''
                    },
                    {
                        respMsg: 'Your new baby will look to you for food, comfort and reassurance as they learn about the world. Holding, cuddling, talking to and responding to your baby helps them release hormones that support their brain development, and make them feel secure.',
                        predict: ''
                    },
                    {
                        respMsg: 'New babies cannot be spoiled by responding to their needs and breastfed babies cannot be overfed, so you can offer your breast for comfort as well as for food. Cuddling and feeding your baby also helps to keep you calm and allows you to sit, rest and enjoy your baby.',
                        predict: ''
                    },
                    {
                        respMsg: 'Focus on eating a healthy balanced diet and try adding in some exercise, such as, brisk walking with the buggy to help shape and tone.',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s nice to reflect on how amazing and rewarding it is to raise a child!',
                        predict: ''
                    },
                    {
                        respMsg: 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                        predict: ''
                    },
                    {
                        respMsg: 'You’re amazing! I’m here to help and so is your Health Visitor! Ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s normal to experience hard moments. Practical support can help. Ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner. You can also ask your Health Visitor or GP.',
                        predict: ''
                    },
                    {
                        respMsg: 'Cuddle and love your baby often!',
                        predict: ''
                    },
                    {
                        respMsg: 'You can never give your baby enough love!',
                        predict: ''
                    }
                ],
                nextPath: {
                    master: "tipsConversation",
                    branch: 10
                }
            },
        }

    },
    givingHealth: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 2, user name! This chapter is all about giving your child the healthiest start! How do you feel about this?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 1
                    // master: "conv1",
                    // branch: 14
                }
            }
        },
        conv1: {
            1: {
                text: 'It’s normal for parents to want to do what’s best for their children and give them the healthiest start in life. Sometimes new parents can feel overwhelmed, and it’s tough and rewarding raising a child. I’m here to help! You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner. What does giving the healthiest start mean for you?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 2
                }
            },
            2: {
                text: 'Thank you for telling me 😊 A good diet in pregnancy and in the first few years of life is essential for prevention of disease and to ensure children reach their full potential for growth and development. I’ll try to give you some practical help with this. Do you know about the Healthy Start Scheme?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 3
                }
            },
            3: {
                text: 'The Healthy Start Scheme is a voucher scheme offered by the UK Government to help pregnant women and families with young children to access fruit, vegetables, cow’s milk or formula and vitamin supplements. How does that sound?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 4
                }
            },
            4: {
                text: 'I see - once registered, families that qualify are sent vouchers in the post which they can then spend in normal shops. They also get coupons to exchange for vitamin supplements. Would you like to know about who gets Healthy Start Food Vouchers, or about applying for Healthy Start?',
                predict: '["Who gets Healthy Start Food Vouchers?", "How do I apply for Healthy Start?"]',
                nextPath: {
                    master: "conv1",
                    branch: 5
                }
            },
            5: {
                text: 'Did you know that 1 in 3 people who could have got Healthy Start vouchers didn’t apply last year!? I find that amazing. Would you like to know about what can you spend the vouchers on, or where you can spend the vouchers? You can ask me about anything else and I’ll do my best to answer!',
                predict: '["What can I spend the vouchers on?", "Where can I spend the vouchers?"]',
                nextPath: {
                    master: "conv1",
                    branch: 6
                }
            },
            6: {
                text: 'It’s true that the Healthy Start Scheme can be very helpful to some families. Here are some other questions you can ask me about related with the Scheme:\n\n•	Why am I not eligible for Healthy Start Vouchers?\n\n•	My vouchers haven’t come through?\n\n•	Can I have vouchers for each child?\n\n•	Where can I exchange the vouchers?\n\n•	Can I get vouchers from the job centre?\n\n•	Can I complete the form online?\n\n•	Who can sign the Healthy Start form?\n\n•	What can I spend the vouchers on? \n\n•	How long will it take to get my Healthy Start vouchers?\n\n•	How often do I get vouchers?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 7
                }
            },
            7: {
                text: 'Fruits and vegetables, vitamin supplements, and vaccines are all important aspects of giving your child the healthiest start. Remember – you can ask me any question and I’ll do my best to answer. You can also provide feedback on by selecting the top right-hand corner. Do you know how many portions of fruits and vegetables you should eat every day?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 8
                }
            },
            8: {
                func: checkFruitConsume,
                nextPath: {
                    master: "conv1",
                    branch: 9
                }
            },
            9: {
                text: 'Vitamin supplements are always a hot topic! How do you feel about them?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 10
                }
            },
            10: {
                text: 'I see, thank you! It’s true that both you and your baby/child can benefit from taking vitamin supplements. In fact, pregnant women and young children are recommended to take a supplement of some vitamins. We get most of the vitamins and minerals that we need by eating a healthy, varied diet, but for some vitamins we also need a bit of a helping hand. \n\n All adults, (including pregnant and breastfeeding women) babies, and children are recommended to take a daily vitamin D supplement too – especially in the winter months (October - March) when you don\'t get enough from the sunlight.',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 11
                }
            },
            11: {
                text: 'How do you feel about vaccinations?',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 12
                }
            },
            12: {
                func: feelAboutVaccination,
                // text: 'Thanks for telling me, user name! In the UK, we have a free vaccination programme to help protect our babies and children from a range of childhood diseases. This is called the Routine Childhood Immunisation Schedule.  These are all listed in your child’s Red Book and your Health Visitor or GP will advise you when they are due. Having all of the vaccinations recommended is really important to help your child build up their immunity and avoid diseases which can harm children badly. ',
                // predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 13
                }
            },
            13: {
                text: 'You can also see the schedule on https://www.gov.uk/government/publications/routine-childhood-immunisation-schedule or https://www.nhs.uk/conditions/vaccinations/nhs-vaccinations-and-when-to-have-them/. Ask me “What is a summary of routine childhood vaccinations?” to see a summary. Here are some other questions about vaccinations you can ask me (you can try asking me something else too): \n\n • How do vaccines work?\n\n• Are vaccines safe? \n\n • What happens if my child misses a vaccination?\n\n • How will I know when my baby’s/child’s vaccinations are due? \n\n • Can I still vaccinate my child if they are feeling unwell?',
                predict: '["What is a summary of routine childhood vaccinations?"]',
                nextPath: {
                    master: "conv1",
                    branch: 14
                }
            },
            14: {
                func: randomRespOfChap2,
                targetMsgArr: [
                    {
                        respMsg: 'It’s normal to experience hard moments. Practical support can help. Ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner. You can also ask your Health Visitor or GP. ',
                        predict: ''
                    },
                    {
                        respMsg: 'You’re amazing! I’m here to help and so is your Health Visitor! Ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                        predict: ''
                    },
                    {
                        respMsg: 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                        predict: ''
                    },
                    {
                        respMsg: 'Make eating your 5 a day the normal thing to do in the family! If it’s hard, take it each day at a time. Focus on eating your 5 a day today!',
                        predict: ''
                    },
                    {
                        respMsg: 'Vaccinating your child is so important.',
                        predict: ''
                    },
                    {
                        respMsg: 'Vaccines are the most effective way to prevent infectious diseases and are both safe and important.',
                        predict: ''
                    },
                    {
                        respMsg: 'Vaccination is the most important thing we can do to protect both ourselves and our children against ill health. Since vaccines were introduced in the UK, diseases like smallpox, polio and tetanus that used to kill or cause disability to large numbers of people are either gone or seen very rarely. Other diseases like measles and diphtheria had been pretty much eradicated since their vaccines were introduced. However, they are rising again as vaccination levels among children have recently been falling.',
                        predict: ''
                    },
                    {
                        respMsg: '**Speak to your GP or practice nurse if:** \n\n• you\'re worried about you or your child having a vaccine \n\n• you\'re not sure if you or your child can have a vaccine \n\n You could also ask a health visitor any questions you have about vaccines.',
                        predict: ''
                    },
                    {
                        respMsg: 'No one wants their children to be ill. Choosing to not vaccinate means your child is likely to suffer a number of illnesses which could be avoided. ',
                        predict: ''
                    },
                    {
                        respMsg: 'Be aware that anti-vaccine stories are spread online through social media. They are not based on scientific evidence and could put your child at risk of a serious illness.',
                        predict: ''
                    },
                    {
                        respMsg: 'Fruit and vegetables don\'t have to be fresh to count as a portion. They also count if they\'re part of a meal or dish.',
                        predict: ''
                    },
                    {
                        respMsg: 'You and your child are amazing! Give your child the healthiest start by ensuring they are vaccinated, eating a good diet, and take the right supplements. ',
                        predict: ''
                    },
                    {
                        respMsg: 'Here are some questions you can ask me: \n\n• What is a booster jab? \n\n• Are there any side-effects after immunisation? \n\n• I’m formula feeding. Does my baby need extra vitamins? \n\n• Is too much fruit bad for my child’s teeth? \n\n• Can I start giving banana?\n\n• When can I start giving solids?\n\n• My child never eats anything, can I just feed my child milk?\n\n• When I can fly with my baby?',
                        predict: ''
                    }
                ],
                nextPath: {
                    master: "conv1",
                    branch: 14
                }
            },
        }
    },
    chapter3: {
        welcome: {
            1: {
                text: 'Welcome to the sleep, play, and socialisation Chapter, user name! How do you feel about this?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap3,
                targetMsgArr: [
                    {
                        respMsg: 'Sure, I understand! Thank you, user name 😊.  My friend, Professor Amy Brown had a video on baby sleep. If you would like to watch it, tell me \"Play Amy’s video on baby sleep\"',
                        predict: '["Play Amy’s video on baby sleep"]'
                    },
                    {
                        respMsg: 'Okay, I see! My friends at the Lullaby Trust have a video on sleep position and co sleeping. You can watch the video on sleep position by telling me “Play the Lullaby Trust sleep position video”. You can also watch the video on co sleeping by telling me “Play the co sleeping video”',
                        predict: '["Play the Lullaby Trust sleep position video", "Play the co sleeping video"]'
                    },
                    {
                        respMsg: 'Okay  We can keep chatting, or here are some questions you can ask me:\n\n Can I sleep with my baby in bed? \n\n What techniques can I use for getting my baby to sleep alone?',
                        predict: '["Can I sleep with my baby in bed?", "What techniques can I use for getting my baby to sleep alone?"]'
                    },
                    {
                        respMsg: 'I see! I enjoy talking to you, user name 😊. Here are some questions you can ask me:\n\nWhat techniques can I use for getting my baby to settle themselves to sleep? \n\n When should my baby sleep through the night?\n\nWhen can my baby sleep in another room?',
                        predict: '["What techniques can I use for getting my baby to settle themselves to sleep?", "When should my baby sleep through the night?", "When can my baby sleep in another room?"]'
                    },
                    {
                        respMsg: 'I enjoy talking to you, user name. Here are some questions you can ask me:\n\nWhat is a bedtime routine?\n\nAre bedtime routines important?\n\nAt what age will my baby be in a bedtime routine?',
                        predict: '["What is a bedtime routine?", "Are bedtime routines important?", "At what age will my baby be in a bedtime routine?"]'
                    },
                    {
                        respMsg: 'I can sense you’re great! Here are some questions you can ask me:\n\nHow long should my baby sleep for?\n\nHow much sleep does a 1-year old need? \n\nHow long should my toddler sleep for?',
                        predict: '["How long should my baby sleep for?", "How much sleep does a 1-year old need?", "How long should my toddler sleep for?"]'
                    },
                    {
                        respMsg: 'Can you say more about that? Here are some questions you can ask me too :\n\nMy baby turns on their tummy or side while sleeping. Do I need to move them back onto their back?\n\nCan my baby have a pillow? \n\nHow do I get my baby to sleep in the cot from the Mose’s basket ?',
                        predict: '["My baby turns on their tummy or side while sleeping. Do I need to move them back onto their back?", "Can my baby have a pillow?", "How do I get my baby to sleep in the cot from the Mose’s basket ?"]'
                    },
                    {
                        respMsg: 'That’s interesting, user name. Here are some questions you can ask me too :\n\nMy baby will not sleep in the cot / Moses basket what can I do? \n\nShould I use a dummy to help soothe my baby? \n\nAt what age should I take my baby’s dummy away?',
                        predict: '["My baby will not sleep in the cot / Moses basket what can I do?", "Should I use a dummy to help soothe my baby?", "At what age should I take my baby’s dummy away?"]'
                    },
                    {
                        respMsg: 'Thank you, user name. You can also ask me these questions :\n\n When should my baby stop having naps?\n\nMy baby sleeps well in the day but not at night.\n\n My child has started waking up at night',
                        predict: '["When should my baby stop having naps?", "My baby sleeps well in the day but not at night.", "My child has started waking up at night"]'
                    }
                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter4: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 4 This chapter is all about valuing me. Take a moment to reflect. How have you been feeling, user name?',
                predict: '',
                nextPath: {
                    master: "convoChapter4",
                    branch: 1
                }
            }
        },
        convoChapter4: {
            1: {
                text: 'Sure, I understand. That seems normal! It can be helpful to get some support on parenting issues that can help you, your baby, and those nearby. One concept that’s useful to consider is ‘positive parenting’. What does this mean to you? Remember, you can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                predict: '',
                nextPath: {
                    master: "convoChapter4",
                    branch: 2
                }
            },
            2: {
                text: 'I see, thanks. There is no “one-size fits all” when it comes to parenting, we change and adapt as our children grow. Positive parenting is about making positive choices about how to raise your children, setting realistic expectations and boundaries and sticking to them consistently, valuing your child and listening to their feeling and building your children’s skills and abilities to allow them to grow into happy independent children. How does that sound?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap4,
                targetMsgArr: [
                    {
                        respMsg: 'Okay 😊 Treat every contact with your child as an opportunity to connect with them. Give them eye contact and really listen to them rather than having one eye on doing another job!',
                        predict: ''
                    },
                    {
                        respMsg: 'Can you tell me more about that?',
                        predict: ''
                    },
                    {
                        respMsg: 'I think I understand. Would you like to say anything more?',
                        predict: ''
                    },
                    {
                        respMsg: 'I see…others have said that too! Your facial expressions and the way you smile will encourage a good relationship with you and your child. Listen to what they have to say, ask what they think.',
                        predict: ''
                    },{
                        respMsg: 'Ah okay 😊  Remember to say sorry to your children (and other people) when you get things wrong. It helps model good social behaviour for your child.',
                        predict: ''
                    },{
                        respMsg: 'I see! In today’s busy lifestyle, many families find it can be difficult to find time to eat together but family meals are important and offers the time for you to build a better relationship with your child. You can help your child to have a sense of belonging and better self-esteem.',
                        predict: ''
                    },{
                        respMsg: 'You sound lovely 😊 It doesn’t matter which meal you share - share breakfast, lunch or dinner together – it’s just eating together that is the key. Turn off phones and the TV and just have time with each other – if you don’t have a table it doesn’t matter, sit where you can and share time together.',
                        predict: ''
                    },{
                        respMsg: 'I can sense you’re a great person! Here are some questions you can ask me: \n\n Why do I need to go to Mother and Baby Groups?\n\nIs it ok for my partner to help with the baby?\n\nWhat support is available for parents in the community?',
                        predict: '["Why do I need to go to Mother and Baby Groups?", "Is it ok for my partner to help with the baby?", "What support is available for parents in the community?"]'
                    },
                    {
                        respMsg: 'I enjoy talking to you, user name 😊 Take a moment to give some love to your child!',
                        predict: ''
                    },
                    {
                        respMsg: 'You seem nice, user name. 😊 It’s important to tell your child you love them every day, even on difficult days.',
                        predict: ''
                    },
                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter5: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 2, user name! This chapter is all about giving your child the healthiest start! How do you feel about this?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap5,
                targetMsgArr: [
                    {
                        respMsg: 'I understand, and that’s common. Introducing solid foods at 6 months falls pretty much at the halfway mark of the first 1000 days and so is a great time for you to continue to develop the foundations you have already laid down. Getting solid foods off to the right start really will help to lay the foundations for healthy eating into the toddler years and beyond.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! Thanks, user name 😊 As well as having a chat, you can also ask me these questions: \n\nWhen can I start weaning my baby who was premature?\n\nWhen can I start giving my baby food?\n\nWhat foods can I first start my baby with?',
                        predict: '["When can I start weaning my baby who was premature?", "When can I start giving my baby food?", "What foods can I first start my baby with?"]'
                    },
                    {
                        respMsg: 'I see! Thanks, user name 😊 As well as having a chat, you can also ask me these questions: \n\nWhen can I start weaning?\n\nWhat foods do I need to avoid when I start weaning?\n\nAre there any Weaning classes?',
                        predict: '["When can I start weaning?", "What foods do I need to avoid when I start weaning?", "Are there any Weaning classes?"]'
                    },
                    {
                        respMsg: 'Thanks, user name 😊 You can also ask me these questions: \n\nAllergies in the family – do I need to avoid these foods?\n\nWhat portion size shall I offer my baby?\n\nWhat texture should the food I give to my baby be?',
                        predict: '["Allergies in the family – do I need to avoid these foods?", "What portion size shall I offer my baby?", "What texture should the food I give to my baby be?"]'
                    },
                    {
                        respMsg: 'Sure, I think I understand. Here are some questions you can ask me: \n\nHow much milk does my baby need as they grow up?\n\nWhat is the first 1000 days?\n\nPreparing the senses for solid food',
                        predict: '["How much milk does my baby need as they grow up?", "What is the first 1000 days?", "Preparing the senses for solid food"]'
                    },
                    {
                        respMsg: 'Okay 😊 Here are some questions you can ask me too: \n\nMy baby is waking up more at night – should I start introducing solid foods? \n\nWhy has the advice on the best age to offer babies solid food changed?\n\nHow much will my baby eat?',
                        predict: '["My baby is waking up more at night – should I start introducing solid foods?", "Why has the advice on the best age to offer babies solid food changed?", "How much will my baby eat?"]'
                    },
                    {
                        respMsg: 'Sure, I see. user name, you can also ask me questions! Here are some you can ask:\n\nIs there a good time of day for my baby to eat?\n\nShould I offer milk or food first? \n\nCan I introduce rusks as first food?',
                        predict: '["Is there a good time of day for my baby to eat?", "Should I offer milk or food first?", "Can I introduce rusks as first food?"]'
                    },
                    {
                        respMsg: 'Okay, sure 😊 Here are some questions you can ask me too : \n\nMy baby doesn’t like a food\n\nWill our baby have our likes and dislikes? \n\nWhat equipment do I need to introduce solid foods? ',
                        predict: '["My baby doesn’t like a food", "Will our baby have our likes and dislikes?", "What equipment do I need to introduce solid foods?"]'
                    },
                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter6: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 6! This is all about eating a balanced diet. How has this been going for you, user name?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap6,
                targetMsgArr: [
                    {
                        respMsg: 'Ah, that’s very common! Food is much more than nutrition. We share meals and drinks with our families, friends and work colleagues. Sharing food forms an important part of our cultural heritage, social time and learning how food plays different roles in our lives. Providing nutrition, shared pleasures and reward are all an important part of children’s learning about food. Underpinning everyone’s food experiences should be a healthy balanced diet.',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand! Providing babies and children with good nutrition means that they have the building blocks necessary to grow and develop (both physically and mentally), to be healthy and the energy that they need to play, learn and socialise.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thanks for telling me 😊 Eating a healthy balanced diet establishes lifelong eating patterns, helping to ensure good health today and providing protection against the risk of becoming overweight and development of heart disease, certain cancers and diabetes in the future.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thanks for telling me 😊 The First Steps Nutrition Trust recommend that for pre-school children a balanced diet will include 3 meals (breakfast, lunch and dinner, plus 3 snacks (think mini meals rather than treats) and dessert at one of the meal occasions.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! Pay special attention to dairy foods, whole grain carbohydrates, and vegetables to help build healthy habits that will last a lifetime.',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand, user name 😊. Offer water instead of sugary drinks like fizzy drinks, fruit juices and squashes. Watch how often the less healthy foods like hot dogs, burgers, pizza, crisps, chips, cookies, cakes, sweets and chocolate are eaten – keep these just for occasional treats. ',
                        predict: ''
                    },
                    {
                        respMsg: 'Your child learns a lot by watching you and so eating together as a family is an important part of their learning. Children copy your likes, dislikes, and your interest in trying new foods so try to be a good role model with what you eat and drink.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see 😊 Little people need little portions, but the same healthy balanced diet overall. Let your child choose how much to eat of foods you provide, and don’t force them to finish their plate when they are not hungry.',
                        predict: ''
                    },
                    {
                        respMsg: 'I’ve heard that before! Children enjoy food when eating it is their own choice. Some new foods take time. Give a taste at first and wait a bit. Let children serve themselves by taking small amounts. Offer new foods many times (it can take at least 10 occasions for a young child to like a new food).',
                        predict: ''
                    },
                    {
                        respMsg: 'A short summary of the Eatwell Guide is to try to:\n\n  • Eat at least 5 portions of a variety of fruit and vegetables every day.\n\n • Base meals on potatoes, bread, rice, pasta and other starchy carbohydrates; choosing wholegrain versions where possible.\n\n • Have some dairy or dairy alternatives (such as soy drinks); choosing lower fat and lower sugar options.\n\n • Eat some beans, pulses, fish, eggs, meat and other proteins (including 2 portions of fish every week, one of which should be oily).\n\n• Choose unsaturated oils and spreads and eat in small amounts.\n\n• Drink 6 to 8 cups/glasses of fluid a day.\n\n• If consuming foods and drinks high in fat, salt or sugar have these less often and in small amounts.\n\n • From birth children should be provided with a daily supplement of 10 micrograms of vitamin D. Children over the age of 5 and adults are advised to consider taking a supplement, especially during winter months. ',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Starchy food should make up just over a third of the food we eat. Starchy foods are a good source of energy and fibre and are also the main source of a range of nutrients in our diet, such as B group vitamins, calcium and iron. Try to include a starchy food such as potatoes, bread, a grain such as rice, barley or quinoa, pasta, yam, plantain, or breakfast cereals.',
                        predict: ''
                    },
                    {
                        respMsg: 'I think I’m starting to really understand you, user name 😊 In the UK we all consume far less dietary fibre than we need and so choosing wholegrain and wholemeal foods is important. Very young children can fill up quickly on high fibre foods so for them try to use a mixture of higher and lower fibre starchy foods.',
                        predict: ''
                    },
                    {
                        respMsg: 'I think I understand. Young children should also eat fruit or vegetables on five occasions each day. There are no official guidelines for portion size for young children, but a practical guide is for a portion to be the amount they can fit in the palm of their hand. That way as they grow in size their portions grow. By the end of primary school, they will be eating full size portions.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah that’s normal. Here’s a good tip - eat seasonally! Checking what fruits are in season can help save money.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see. This is something to remember – dried fruit make a great sweet snack, but the natural sugars can hang around the teeth so don’t use these too often. Try a variety of dried fruits like cranberries, mango, apricots, cherries, or raisins.',
                        predict: ''
                    },
                    {
                        respMsg: 'I keep a tub of chopped fresh fruit ready in the fridge to grab for snacks or quick dessert. I’m just joking, I don’t do that. I’m just a robot. You should try this though, user name!',
                        predict: ''
                    },
                    {
                        respMsg: 'I enjoy serving a rainbow of choices. I’m just joking, I don’t do that. I’m just a robot. You should try this though, user name! Fruit can be a quick and easy way to make meals and snacks healthier and more colourful.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Vary your veggies by adding a new vegetable to a different meal each day.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! It’s good to serve a variety of colourful choices. Brighten children’s plates with red, orange, and dark-green vegetables.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! You can choose from fresh, frozen, or canned vegetables. Prepare and serve vegetables without added salt or solid fat. That’s what I do. I’m just joking, I don’t do that. I’m just a robot. You should try this though, user name!',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand, thanks user name. Try a dip. Kids love to dip their foods. Hummus or guacamole are great choices or whip up a quick dip for veggies with yogurt and seasonings such as herbs or garlic. Serve with raw vegetables like broccoli, carrots, or cauliflower.',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand. Pulses, such as beans, peas and lentils, are good alternatives to meat because they cost less and are rich in protein, higher in fibre and a source of minerals such as iron and zinc too. They are also less demanding on the planet resources and more sustainable.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 When eating meat choose small amounts of lean cuts of meat and mince, and eat less red and processed meat like bacon, ham and sausages.',
                        predict: ''
                    },
                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
}

module.exports = obj;
// module.exports = setName;