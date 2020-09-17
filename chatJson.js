var unirest = require('unirest');
const dbConfig = require('./dbConfig');
var API_URL = dbConfig.API_URL

let nextMaster = '';
let nextBranch = '';
let botReply = '';
let tempRandomArr = [];
let tempRandomArrOfChap2 = [];
let tempRandomArrOfChap3 = [];
let tempRandomArrOfChap4 = [];
let tempRandomArrOfChap5 = [];
let tempRandomArrOfChap6 = [];
let tempRandomArrOfChap7 = [];
let tempRandomArrOfChap8 = [];
let tempRandomArrOfChap9 = [];
let tempRandomArrOfChap10 = [];
let tempRandomArrOfChap11 = [];
let tempRandomArrOfChap12 = [];

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
        let url_list = '[{"English":"'+obj[chapterType][mainMaster][mainBranch]['url']['English']+'"}, {"Bengali":"'+obj[chapterType][mainMaster][mainBranch]['url']['Bengali']+'"}, {"Arabic":"'+obj[chapterType][mainMaster][mainBranch]['url']['Arabic']+'"}, {"Hindi":"'+obj[chapterType][mainMaster][mainBranch]['url']['Hindi']+'"}, {"Punjabi":"'+obj[chapterType][mainMaster][mainBranch]['url']['Punjabi']+'"}, {"Romanian":"'+obj[chapterType][mainMaster][mainBranch]['url']['Romanian']+'"}, {"Somali":"'+obj[chapterType][mainMaster][mainBranch]['url']['Somali']+'"}, {"Urdu":"'+obj[chapterType][mainMaster][mainBranch]['url']['Urdu']+'"}]'
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
    
    let randomArrFlag = userSession.breastFeeding.flowingFlag;
    let randomMsgFlag = userSession.breastFeeding.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        randomMsgArray = userSession.breastFeeding.randomMsgArray;
    }
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;
    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)
    
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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('randomMsgArray', randomMsgArray);
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}
const randomRespOfChap2 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.givingHealth.flowingFlag;
    let randomMsgFlag = userSession.givingHealth.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = [];
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        randomMsgArray = userSession.givingHealth.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;
    
    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)
    
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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
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
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        let chapterName = 'chapter3';
        // randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
        randomMsgArray = await getRandmonMsgList(chapterName);
    }else{
        
        randomMsgArray = userSession.chapter3.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)
    

    let botReply = '';
    botReply += randomObj.respMsg.replace("user name", userSession.userInfo.firstName);
    botReply += '#&@#';

    if(randomObj.predict != ''){
        // botReply += '{"predictiveText" : ' +randomObj.predict+ ' }' ;
        botReply += "{'predictiveText' : " +randomObj.predict+ " }" ;
        botReply += '#&@#';
    }
    if(randomMsgFlag == 1){
        botReply += comnMsg;
    }

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}
const randomRespOfChap4 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter4.flowingFlag;
    let randomMsgFlag = userSession.chapter4.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        randomMsgArray = userSession.chapter4.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}
const randomRespOfChap5 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter5.flowingFlag;
    let randomMsgFlag = userSession.chapter5.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        randomMsgArray = userSession.chapter5.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }

    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}

const randomRespOfChap6 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter6.flowingFlag;
    let randomMsgFlag = userSession.chapter6.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        randomMsgArray = userSession.chapter6.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)
    

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}

const randomRespOfChap7 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter7.flowingFlag;
    let randomMsgFlag = userSession.chapter7.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        randomMsgArray = userSession.chapter7.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}

const randomRespOfChap8 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter8.flowingFlag;
    let randomMsgFlag = userSession.chapter8.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        randomMsgArray = userSession.chapter8.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray }
}

const randomRespOfChap9 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter9.flowingFlag;
    let randomMsgFlag = userSession.chapter9.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        randomMsgArray = userSession.chapter9.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}
const randomRespOfChap10 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter10.flowingFlag;
    let randomMsgFlag = userSession.chapter10.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{    
        randomMsgArray = userSession.chapter10.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}

const randomRespOfChap11 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter11.flowingFlag;
    let randomMsgFlag = userSession.chapter11.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        randomMsgArray = userSession.chapter11.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
}

const randomRespOfChap12 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    let randomArrFlag = userSession.chapter12.flowingFlag;
    let randomMsgFlag = userSession.chapter12.randomMsgFlag;
    let comnMsg = 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.';
    // let resp = ''
    let randomMsgArray = []
    if(randomArrFlag == 1 ){
        randomMsgArray = [...obj[chapterType][mainMaster][mainBranch]['targetMsgArr']];
    }else{
        
        randomMsgArray = userSession.chapter12.randomMsgArray;
    }
    
    let index = Math.floor(Math.random() * randomMsgArray.length);
    randomArrFlag = 2;

    let randomObj = randomMsgArray[index];
    randomMsgArray.splice(index,1)

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

    if(randomMsgArray.length == 0){
        randomMsgFlag = 1;
        randomArrFlag = 1;
    }
    // console.log('csdc',randomArrFlag)
    nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    return {botReply,nextMaster,nextBranch, randomArrFlag, randomMsgFlag, randomMsgArray}
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
                    Arabic: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Arabic_V1.mp4',
                    Hindi: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Hindi.mp4',
                    Punjabi: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Punjabi.mp4',
                    Romanian: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Romanian.mp4',
                    Somali: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Somali_V1.mp4',
                    Urdu: 'https://teddibucketdev.blob.core.windows.net/videoscontainer/HumanMilk_Advert_Subtitles_Urdu.mp4'
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
                        respMsg: 'Okay 😊 We can keep chatting, or here are some questions you can ask me:\n\n Can I sleep with my baby in bed? \n\n What techniques can I use for getting my baby to sleep alone?',
                        predict: '["Can I sleep with my baby in bed?", "What techniques can I use for getting my baby to sleep alone?"]'
                    },
                    // {
                    //     respMsg: 'I see! I enjoy talking to you, user name 😊. Here are some questions you can ask me:\n\nWhat techniques can I use for getting my baby to settle themselves to sleep? \n\n When should my baby sleep through the night?\n\nWhen can my baby sleep in another room?',
                    //     predict: '["What techniques can I use for getting my baby to settle themselves to sleep?", "When should my baby sleep through the night?", "When can my baby sleep in another room?"]'
                    // },
                    // {
                    //     respMsg: 'I enjoy talking to you, user name. Here are some questions you can ask me:\n\nWhat is a bedtime routine?\n\nAre bedtime routines important?\n\nAt what age will my baby be in a bedtime routine?',
                    //     predict: '["What is a bedtime routine?", "Are bedtime routines important?", "At what age will my baby be in a bedtime routine?"]'
                    // },
                    // {
                    //     respMsg: 'I can sense you’re great! Here are some questions you can ask me:\n\nHow long should my baby sleep for?\n\nHow much sleep does a 1-year old need? \n\nHow long should my toddler sleep for?',
                    //     predict: '["How long should my baby sleep for?", "How much sleep does a 1-year old need?", "How long should my toddler sleep for?"]'
                    // },
                    // {
                    //     respMsg: 'Can you say more about that? Here are some questions you can ask me too:\n\nMy baby turns on their tummy or side while sleeping. Do I need to move them back onto their back?\n\nCan my baby have a pillow? \n\nHow do I get my baby to sleep in the cot from the Mose’s basket ?',
                    //     predict: '["My baby turns on their tummy or side while sleeping. Do I need to move them back onto their back?", "Can my baby have a pillow?", "How do I get my baby to sleep in the cot from the Mose’s basket ?"]'
                    // },
                    // {
                    //     respMsg: 'That’s interesting, user name. Here are some questions you can ask me too:\n\nMy baby will not sleep in the cot / Moses basket what can I do? \n\nShould I use a dummy to help soothe my baby? \n\nAt what age should I take my baby’s dummy away?',
                    //     predict: '["My baby will not sleep in the cot / Moses basket what can I do?", "Should I use a dummy to help soothe my baby?", "At what age should I take my baby’s dummy away?"]'
                    // },
                    // {
                    //     respMsg: 'Thank you, user name. You can also ask me these questions:\n\n When should my baby stop having naps?\n\nMy baby sleeps well in the day but not at night.\n\n My child has started waking up at night',
                    //     predict: '["When should my baby stop having naps?", "My baby sleeps well in the day but not at night.", "My child has started waking up at night"]'
                    // },
                    // {
                    //     respMsg: 'Sure! You can also ask me these questions: \n\nMy school aged child wants to sleep in my bed – what do I do? \n\nHow long should tummy time be?\n\nHow do I play with my baby?',
                    //     predict: '["My school aged child wants to sleep in my bed – what do I do?", "How long should tummy time be?", "How do I play with my baby?"]'
                    // },
                    // {
                    //     respMsg: 'Okay, sure I think I understand! You can also ask me these questions: \n\nIs it normal for my child to poo in their sleep without knowing about it?\n\nWhen should my baby sleep through? \n\nIs Swaddling OK?',
                    //     predict: '["Is it normal for my child to poo in their sleep without knowing about it?", "When should my baby sleep through?", "Is Swaddling OK?"]'
                    // },
                    // {
                    //     respMsg: 'Okay, I got it! You can also ask me these questions:\n\nWhy should babies sleep on their backs?\n\nCan my baby sleep in the car seat? \n\nIs it OK to use a Sleep pod or nests?',
                    //     predict: '["Why should babies sleep on their backs?", "Can my baby sleep in the car seat?", "Is it OK to use a Sleep pod or nests?"]'
                    // },
                    // {
                    //     respMsg: 'Okay 😊 You can also ask me these questions:\n\nWhat temperature should the bedroom be? \n\nHow can I tell if my baby’s too hot? \n\nMy baby isn’t well – should I add a layer?',
                    //     predict: '["What temperature should the bedroom be?", "How can I tell if my baby’s too hot?", "My baby isn’t well – should I add a layer?"]'
                    // },
                    // {
                    //     respMsg: 'Okay 😊 You can also ask me these questions:\n\nHow much screen time should my child have?\n\nWhat’s the best way to manage screen time?\n\nKeep kids safe online',
                    //     predict: '["How much screen time should my child have?", "What’s the best way to manage screen time?", "Keep kids safe online"]'
                    // },
                    // {
                    //     respMsg: '😊 You can also ask me these questions: \n\nMy kids are different ages so the older ones want to use screens – help, what can I do?\n\nHelping your child learn to talk\n\nWhat if we speak/use more than one language (Bilingual)?',
                    //     predict: '["My kids are different ages so the older ones want to use screens – help, what can I do?", "Helping your child learn to talk", "What if we speak/use more than one language (Bilingual)?"]'
                    // },
                    // {
                    //     respMsg: 'Here are some questions you can ask me, user name:\n\nDo dummies affect speech?\n\nWhy do we need a focus on children being active as surely they just play all day anyway? \n\nHow much activity should under 5’s do?',
                    //     predict: '["Do dummies affect speech?", "Why do we need a focus on children being active as surely they just play all day anyway?", "How much activity should under 5’s do?"]'
                    // },
                    // {
                    //     respMsg: 'That’s great! Here are some questions you can ask me, user name 😊: \n\nHow can babies be active? \n\nWhat about activity for the under 1’s?\n\nDo I need lots of toys?',
                    //     predict: '["How can babies be active?", "What about activity for the under 1’s?", "Do I need lots of toys?"]'
                    // },
                    // {
                    //     respMsg: 'Thank you, user name 😊 You may find these questions interesting to ask me:\n\nWhich Sun Screen should I use? \n\nShould babies and children wear sunglasses? \n\nDo toddlers ever get tired? ',
                    //     predict: '["Which Sun Screen should I usw", "Should babies and children wear sunglasses?", "Do toddlers ever get tired?"]'
                    // },
                    // {
                    //     respMsg: 'Thank you, user name 😊 You may find these questions interesting to ask me:\n\nHow soon can I be active after childbirth? \n\n What about exercise if I am pregnant?\n\nWhen should I start potty training?',
                    //     predict: '["How soon can I be active after childbirth?", "What about exercise if I am pregnant?", "When should I start potty training?"]'
                    // },
                    // {
                    //     respMsg: 'Thank you, user name 😊 You’re cool! You may find these questions interesting to ask me:\n\nMy child can control their poo but not hold wee\n\nWhat age does bowel or bladder control start? \n\nMy child still wets the bed is this normal?',
                    //     predict: '["My child can control their poo but not hold wee", "What age does bowel or bladder control start?", "My child still wets the bed is this normal?"]'
                    // },
                    // {
                    //     respMsg: 'Sure 😊 Here are some questions you can ask me too:\n\nHow do I know when my child is ready for potty training?\n\nDo I have to use a potty?',
                    //     predict: '["How do I know when my child is ready for potty training?", "Do I have to use a potty?"]'
                    // },
                    // {
                    //     respMsg: 'Thank you, user name 😊 You’re cool! You may find these questions interesting to ask me:\n\nWhat about pull up pants?\n\nNight-time potty training',
                    //     predict: '["What about pull up pants?", "Night-time potty training"]'
                    // },
                    // {
                    //     respMsg: 'Can you tell me more?',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'I see, why do you say that? 😊',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'I think I understand! As a rough guide, by the time babies are 3 months old, some (but not all) begin to start settling and sleeping at night time for a stretch of up to 5 hours. By the time they are 5 months old, half of them may have started to sleep for an eight-hour stretch on some nights.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Okay! One study found that almost one third of babies had not regularly slept from 10pm to 6am by the age of 1 year and so it’s hard to predict. Generally, though, babies do not sleep all night-every night until they are close to a year old.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Looking after a baby can be really tiring, especially in the first few months after the birth, when your child is likely to wake several times during the night. Most parents cope with a certain level of tiredness. But if you\'re feeling low, bad tempered and unable to cope or enjoy things, you need to try find a way of getting more sleep, or at least more rest.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Hmm.. I see 😊 If you have a partner, ask them to help. If you\'re formula feeding, they could share the feeds. If you\'re breastfeeding, ask your partner to help with nappies or dressing in the morning so you can go back to sleep.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Try to go to bed early for, say, 1 week. If you can\'t sleep when you go to bed, do something relaxing for half an hour beforehand, such as soaking in a hot bath.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'When you\'re feeling tired, doing more exercise may be the last thing you feel like doing. But regular exercise can help you feel less tired. Walking is one of the easiest forms of exercise. Try to get out for a walk every day with your baby, even if it\'s just to the local shops. If you can walk in a green space or park this may help to lift your mood.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Okay, user name. Waking up in the night can be scary, but a night light helps. Not only will it help your baby to feel secure but will also stop you tripping over toys when you go in to check on them!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Sure, user name. A good way to make sure your little one is tired enough for bed, is by trying to make sure they’re moving around enough during the day. If they’ve still got bags of energy at bedtime try some ‘tummy time’ for babies or encourage early evening active play such as a disco or obstacle course before calming down with a bath.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'That’s something I hear a lot! Having a bedtime toy or blanket to hold or stroke while falling asleep is comforting for some children. If your child has a favourite, buy a spare and switch them around so that if one is lost then you are not in trouble.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Okay! For the first 6 months the safest place for your baby to sleep is in a cot, crib, or Moses basket in your room beside your bed and in the same room as you for all other sleeps during the day. You will also be close by if they need a feed or cuddle. Babies should always be put down to sleep on their backs with feet at the bottom of the cot so that they can’t wriggle down.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'For the first 6 months the safest place for your baby to sleep is in a cot, crib, or Moses basket in your room beside your bed and in the same room as you for all other sleeps during the day. You will also be close by if they need a feed or cuddle. Babies should always be put down to sleep on their backs with feet at the bottom of the cot so that they can’t wriggle down.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Babies should ALWAYS be put to sleep lying on their backs. This is because sleeping a baby on their front or side greatly increases the chance of SIDS – Sudden Infant Death Syndrome.  Sleeping your baby on their back (known as the supine position) every night is one of the most protective actions you can take to ensure your baby is sleeping as safely as possible.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Enjoy playing with your baby, user name! Take in each joyful moment! 😊',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Encourage your kids to do things in order to earn screen time. Ask them to help you do things around the house – even the youngest can copy you dusting! Encourage them to help you tidy their room. Get a ‘little helper fun pod’ so they can stand and wash up and bake together with you.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Model appropriate screen time behaviour. As a parent you are your child’s first teacher. They will follow what you do, so to ensure your kids use technology appropriately, you need to model good habits.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'It’s best to power down any screen use well before bedtime, at least 30 minutes or more before they settle down to sleep. Read them a book instead and have quiet time together.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Okay! Books are a great way to help your child gather the skills they will need for reading. It’s never too early to start you can do this right from birth. Bedtime is a super time to read to your child and help settle them down before they nod off to sleep.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'You’re amazing! Remember - reading not only gives you an opportunity to bond with your child it opens the door to the written word. Books are great but you can read to them in all sorts of other situations such as in the supermarket where you can look at the letters and signs.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'You seem nice. In the early days, speech delays are more easily picked up on than a child’s ability to read. If you suspect your child has a problem, then go to see your GP or Health Visitor to discuss it.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Have fun with letters, alphabet stamps and stickers. Your child can organise letters and stickers into patterns. Take this outdoors too and write their name in the sand or the snow\n\nConnect letters to everyday words like ‘m’ for mummy, ‘b’ for bed, ‘d’ for dog… ‘t’ for Teddi! ',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Screen time can be positive! Despite the warnings of too much screen time, many classic books and tales can be found online. They can be a useful source of the written word but it’s up to you to work out the balance between how much print copy and how much online copy you use in your child’s life',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Thank you, user name! There are lots of ways that you can help your child learn to talk. Chat while doing things with or around your child and spend time each day talking directly with them repeating words and sentences. Reading books together will also help your child learn to talk and add to the number of words that they know.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'You seem great, user name! What activates do you enjoy? Active children are healthy and happy, with the added benefit that they sleep better too.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'What books do you like?',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Concern is growing that children are increasingly sitting down to play with too much time spent sat in front of TV screens or tablet devices. For under 5’s active play is vital to master their physical environment and develop fundamental movement skills.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'How do you like to get active? It’s great because:\n\n• Builds relationships & social skills\n\n• Maintains overall health and body weight \n\n• Contributes to brain development and learning\n\n• Improves sleep\n\n• Develops muscles and bones\n\n• Encourages movement & co-ordination',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Can you say more, user name?😊',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Children aged 1-5 should have at least 180 minutes every day of active play. This includes a broad range of play activities and therefore is higher than the adult recommendation of at least 150 minutes of moderate activity every week which looks at focused physical activity such as walking, swimming or cycling.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'How have you been today?',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'You might think that infants who are not yet walking cannot be active – but you’d be surprised. Physical activity should be encouraged from birth, particularly through floor-based play and water-based activities in safe environments. Playing, talking and reading with your baby will help to bring you closer together, help them become sociable and make it easier for them to form friendships later on. It can also help with their movement, letting their bones, muscles and heart grow strong.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Infants should be physically active several times every day in a variety of ways, including interactive floor-based activity, e.g. reaching for toys, kicking and crawling. For infants not yet mobile, this includes at least 30 minutes of tummy time spread throughout the day while awake (and other movements such as reaching and grasping, pushing and pulling themselves independently, or rolling over); more is better.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'What’s going on right now for you, user name?😊',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Sure! Active play for babies also encourages reaching for and grasping objects, turning the head toward stimuli such as noises or colours, pulling, pushing and playing with other people, objects and toys.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Okay! Learning to control hands to pick up larger items will develop into being able to pick up small items and grasp a pen. Leaning forwards to grasp a toy develops core and back muscle strength. Moving things further away and closer requires the eyes to focus in different places, developing vision. All of the little aspects of play supports both physical and brain development in many different ways.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Don’t forget when playing and being active with your baby (or child) to keep chatting to them. Making small talk, such as chatting about what things look like, where you are going or what you’re doing is an important part of their learning. If they are babbling or talking to you – then talk – listen to them talk and then respond. It’s never too early to start making Small Talk!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'There is no other time in life where children will learn as many physical skills as rapidly as they do in the first five years of life. It sounds too simple but many of the games that we play with children all contribute to this development.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Maybe we don’t know what to play, or we feel that we don’t have time to play with our children, but many everyday activities can be turned into opportunities for active play, from the house cleaning, to gardening or when walking the dog. All it takes is a little imagination and motivation to get active and have some fun.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Play is also recognised as key to positive development for children, from encouraging physical skills and establishing healthy enjoyment to developing intellectual, social and emotional maturity!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Research has shown that being physically active can help with the development of: \n\n• balance, coordination \n\n• maintaining a healthy weight \n\n• strong bones, muscles and heart \n\n• social skills, i.e. how to interact, take turns and getting on and caring about others',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Jump in muddy puddles with your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Make a pasta picture with your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Make a hand print picture with your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Try to catch a falling leaves with your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Pop bubbles with your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Go on a treasure hunt with your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Build a den – inside using blankets and cushions or outside if you can with twigs sticks with your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Ask why often. Inspire curiosity in your child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Make wild art – go for a walk and collect leaves, feathers or seed pods and stick these onto paper when you get home!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Can you tell me more? ',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'It’s not all about the children – parents need to be active too. A fast pace walking for a pre-schooler is likely to be a slow walk for you and so you need to make time for your activity as well.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'When was the last time you did some exercise? It’s great for you!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'I understand! Exercise snacking is something you do in short stints (5-10 minutes), two or three times a day. The beauty is that you can do this without any special equipment or fitness clothing, it doesn’t cost anything, and you don’t have to do a warmup first.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Stand upright. With your hands at waist height, position your arms in front of you. Raise one leg up to 90 degrees—until the top of your thigh touches your hands— then lower it. Repeat this movement with your opposite leg. Move at any pace you want.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Stand upright and hold onto the back of the chair for balance. Raise one foot by bending your knee to a right angle, and then lower it to the floor. Repeat this movement with your opposite leg and continue for a minute.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Okay, sure! One of the best ways to get active is to walk briskly – either with or without the buggy. Brisk walking will not only help you to get fitter but will also help you to tone up muscle and get your weight in check. ',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'How does that make you feel?',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'You can walk in any flat shoes, however you will find it easier to walk in a pair of lace up shoes or trainers, particularly if you are walking over a non -tarmacked surface in a park or another green space. Investing in a pair of comfortable trainers might help you to walk faster when out with the buggy.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Do some postnatal exercises. They will strengthen your muscles and help get you in shape. You could also join a postnatal exercise class. Lots of postnatal classes let you do the class with your baby at your side. Ask your health visitor about this!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Push the pram or buggy briskly. Remember to keep your arms bent and your back straight. Make sure the handles are at the right height for you – your elbows should be bent at right angles. Walking is great exercise, so try to get out as much as you can.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Play energetic games with older children. You can exercise by running around with them. Build activity into your day.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Teach your kids to be kind! Make giving compliments normal! ',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Think about some loving thoughts about someone you know with your child.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Try swimming, it is good exercise and also relaxing, but you\'ll need to wait until 7 days after your postnatal bleeding has stopped. If you take your baby with you, try to have someone else there to mind the baby so you have a chance to swim.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Use the stairs instead of the lift or, for short journeys, walk instead of taking the car. Bend your knees when you pick things up off the floor, rather than bending at the waist. If you bend down with bent knees and a straight back, instead of bending over at the waist (straight knees and a bent spine), you\'ll strengthen your thigh muscles and avoid damaging your back. Hold heavy objects close to your body.',
                    //     predict: ''
                    // }
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
                    },
                    {
                        respMsg: 'Ah okay 😊  Remember to say sorry to your children (and other people) when you get things wrong. It helps model good social behaviour for your child.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! In today’s busy lifestyle, many families find it can be difficult to find time to eat together but family meals are important and offers the time for you to build a better relationship with your child. You can help your child to have a sense of belonging and better self-esteem.',
                        predict: ''
                    },
                    {
                        respMsg: 'You sound lovely 😊 It doesn’t matter which meal you share - share breakfast, lunch or dinner together – it’s just eating together that is the key. Turn off phones and the TV and just have time with each other – if you don’t have a table it doesn’t matter, sit where you can and share time together.',
                        predict: ''
                    },
                    {
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
                    {
                        respMsg: 'Ok 😊. Hey, user name – take this chance now to tell your child you love them!',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 You may not always like their behaviour and no matter what you have to deal with you know you love your child.',
                        predict: ''
                    },
                    {
                        respMsg: '😊 Although it can be hard, particularly when you are really frustrated with your child, showing empathy involves understanding what your child is going through. It can help you and your child work together as a team to handle challenges as they come up.',
                        predict: ''
                    },
                    {
                        respMsg: 'Nice, user name 😊 You need to show your child you understand them, and reassure that you are there to help them whenever they have problems.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, user name 😊 It’s important to listen to your child and acknowledge your child’s feelings. Do you find this easy to do?',
                        predict: ''
                    },
                    {
                        respMsg: 'Sounds good, user name 😊 When it comes to safety, rules are vitally important, but it’s best not to rely on them to keep children safe. For example, your rule might be ‘Stay away from the road’, but you will always need to supervise and watch your child near roads.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 Play is vital to help the development of your child and they can learn and develop many skills through the power of play.',
                        predict: ''
                    },
                    {
                        respMsg: 'You seem great! Give your child choices (e.g. apple or pear for dessert, tuna or cheese in their sandwich, walk to the park or play ball in the garden). This will help them to develop a sense of value and choice.',
                        predict: ''
                    },
                    {
                        respMsg: 'You’re nice to talk to 😊 As your child grows, they develop the language skills to understand simple rules but the younger they are the more likely they are to forget or ignore your rules. You need to constantly support and remind them of the rules on a day to day basis.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 If your child has had a bad day remember to tell them that you love them but that you did not love a particular behaviour, try to explain why and what you would prefer them to do next time.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Encourage kindness and curiosity. Why are the clouds so fluffy? How can we make someone smile?',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! Although we try hard, adults are not always right, and saying sorry is a great way to role model good social behaviour for your children.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thanks, user name. Playing with your child can help their emotions, creativity, social skills and language skills. Not only that, it will help you develop your relationship with your child. Turn off the TV and make time to play and talk to your child without distraction.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, user name. Eating together as a family sets the stage for conversation and helps you build your relationship with your child.',
                        predict: ''
                    },
                    {
                        respMsg: 'Here are some ideas to help get conversation started with the family: \n\n 1. Ask everyone to share something funny about their day \n\n 2. Tell us about something nice you did for someone today?\n\n 3. If you had 3 wishes, what would they be? (You can’t wish for money!)\n\n 4. Would you rather be able to fly, read minds or live to 100?\n\n 5. Can you name the favourite colour, animal, movie, or food of everyone at the table?\n\n 6. If you could snap your fingers and be anywhere in the world right now, where would you go?',
                        predict: ''
                    },
                    {
                        respMsg: 'Family support is vital for your child’s development and unavoidably linked to their family experiences. In fact, family is the single most important influence in your child\'s life.',
                        predict: ''
                    },
                    {
                        respMsg: 'From their first moments of life, your child depends on you and your family to protect them and provide for their needs. Your child is more likely to thrive when you and your family are able to actively help promote their growth and development.',
                        predict: ''
                    },
                    {
                        respMsg: 'You’re nice to talk to 😊 Research has proved that having a support system has many positive benefits, such as higher levels of well-being, better coping skills and a longer and healthier life. In addition, social support can reduce depression and anxiety so help decrease stress.',
                        predict: ''
                    },
                    {
                        respMsg: 'Talk to your partner, family and friends about your feelings and what they can do to help. It’s important to make time for yourself and do things you enjoy!',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand, user name! What do you enjoy doing?',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s hard when you have a new baby but do rest whenever you get the chance and get as much sleep as you can at night.',
                        predict: ''
                    },
                    {
                        respMsg: 'Exercising regularly and eating a healthy diet are really important too. Look out for baby fitness classes and baby buggy walking classes locally that you can join. (link to active families) You’ll meet other new mums and that will offer you a great amount of support too.',
                        predict: ''
                    },
                    {
                        respMsg: 'When you have a child, life is busy with mealtimes, bath time, shopping, work and your relationships with your partner and others. Taking time for yourself is vital.',
                        predict: ''
                    },
                    {
                        respMsg: 'We often prioritise everyone else’s needs before our own because we don’t want to seem selfish or feel guilty but that’s not healthy.',
                        predict: ''
                    },
                    {
                        respMsg: 'There’s no stigma to doing things alone – in fact, spending time alone is a good thing so you can have chance to think and work on the relationship you have with yourself.',
                        predict: ''
                    },
                    {
                        respMsg: 'More ‘me time’ helps you to clear you head. You can take time to sit back and prioritise your busy life. You have a clearer perspective of what needs to done and how you can do it.',
                        predict: ''
                    },
                    {
                        respMsg: 'If you learn to enjoy your own company, you’ll learn that happiness doesn’t always depend upon other people. Feel more fulfilled by interacting less with others sometimes. It’s not that you need to spend lots of time alone – far from it - just that you learn more about yourself. You are alone, not lonely!',
                        predict: ''
                    },
                    {
                        respMsg: 'Some people curl up with a good book and a cup of hot chocolate whilst others linger in a hot bath. Work out what simple pleasures in life work for you and make you happy. By making sure you have more ‘me time’, you get off that busy roundabout of life and makes life a lot calmer, simpler and more relaxed.',
                        predict: ''
                    },
                    {
                        respMsg: 'You seem great! Everyone who has been in a relationship knows that disagreements and arguments are inevitable. It’s normal that when two people spend a lot of time together, they are bound to disagree sometimes.',
                        predict: ''
                    },
                    {
                        respMsg: 'You seem nice, user name. When adults disagree or are angry with each other, misunderstandings can easily occur. Try to put the children first and keep children clear of any relationship conflicts.',
                        predict: ''
                    },
                    {
                        respMsg: 'I can sense you’re a great person! Your values are important in the relationship you have with your child. This relationship is unique and enduring and involves the way you interact with your child on many levels. How you interact emotionally, physically and socially, not only with your child but with others around you, will impact how children develop and grow into young adults and beyond.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s interesting 😊 Here are some questions you can ask me:\n\nWhat are the signs of postnatal depression? \n\nIs it normal for my baby to be crying so much? \n\nCan I go out?',
                        predict: '["What are the signs of postnatal depression?", "Is it normal for my baby to be crying so much?", "Can I go out?"]'
                    },
                    {
                        respMsg: 'You can tell me anything you like! Here are some questions you can ask me:\n\nHow can I meet other parents with babies? \n\nHow can I help my wife/partner to care for the baby?',
                        predict: '["How can I meet other parents with babies?", "How can I help my wife/partner to care for the baby?"]'
                    },
                    {
                        respMsg: 'I’ve heard that before! Here are some questions you can ask me:\n\nCould I leave my baby with relatives for a night? \n\nCan my family visit us?',
                        predict: '["Could I leave my baby with relatives for a night?", "Can my family visit us?"]'
                    },
                    {
                        respMsg: 'I’ve heard that before! Here are some questions you can ask me:\n\nCan I take my child abroad? \n\nI’ve lost my identity what can I do?',
                        predict: '["Can I take my child abroad?", "I’ve lost my identity what can I do?"]'
                    },
                    {
                        respMsg: 'I hear that a lot 😊 Here are some questions you can ask me:\n\nHow can I access childcare? \n\nWhat is bonding?',
                        predict: '["How can I access childcare?", "What is bonding?"]'
                    },
                    {
                        respMsg: 'You can tell me anything you like! Here are some questions you can ask me:\n\nWhat is baby massage?\n\nHow do I help my child to feel valued?',
                        predict: '["What is baby massage?", "How do I help my child to feel valued?"]'
                    },
                    {
                        respMsg: 'I can sense you’re a great person! Here are some questions you can ask me: \n\nShould I set rules for my children?\n\nHelp for working parents? \n\nHow do I deal with relationship conflict?',
                        predict: '["Should I set rules for my children?", "Help for working parents?", "How do I deal with relationship conflict?"]'
                    },
                    {
                        respMsg: 'Okay! These are a couple of questions you can ask me: \n\nHow do I support children through Separation and Divorce?\n\nWhat are family values?',
                        predict: '["How do I support children through Separation and Divorce?", "What are family values?"]'
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
                        respMsg: 'Okay, sure 😊 Here are some questions you can ask me too: \n\nMy baby doesn’t like a food\n\nWill our baby have our likes and dislikes? \n\nWhat equipment do I need to introduce solid foods? ',
                        predict: '["My baby doesn’t like a food", "Will our baby have our likes and dislikes?", "What equipment do I need to introduce solid foods?"]'
                    },
                    {
                        respMsg: 'I see, user name! 😊 These are some questions you can ask me: \n\nHow can I help my baby to enjoy lots of different foods?\n\nCan my baby have garlic and spices?\n\nWhy do I need to avoid salt and salty processed foods?',
                        predict: '["How can I help my baby to enjoy lots of different foods?", "Can my baby have garlic and spices?", "Why do I need to avoid salt and salty processed foods?"]'
                    },
                    {
                        respMsg: 'Okay, thanks for sharing, user name! You can ask me these questions as well as just having a conversation about any challenges or feelings you have:\n\n What is baby-Led introduction to solid foods?\n\nDoes baby-led introduction to solid foods increase risk of choking? \n\nDo babies get enough food in baby-led introduction to solid foods?',
                        predict: '["What is baby-Led introduction to solid foods?", "Does baby-led introduction to solid foods increase risk of choking?", "Do babies get enough food in baby-led introduction to solid foods?"]'
                    },
                    {
                        respMsg: 'Okay, user name! These are some questions you can ask me: \n\nDoes baby-led introduction to solid foods change food preferences? \n\nI’m worried about allergies in the family\n\nWhat are the best First Foods?',
                        predict: '["Does baby-led introduction to solid foods change food preferences?", "I’m worried about allergies in the family", "What are the best First Foods?"]'
                    },
                    {
                        respMsg: 'Sure 😊 These are some important questions you may find helpful in learning about: \n\nWhat is Gagging?\n\nWhat is Choking?\n\nDifference between gagging and choking',
                        predict: '["What is Gagging?", "What is Choking?", "Difference between gagging and choking"]'
                    },
                    {
                        respMsg: 'Okay! You can also ask me these questions: \n\nShould food be smooth or lumpy?\n\nWhat other drinks can I give?\n\nWhen should I start brushing teeth? ',
                        // predict: '["Should food be smooth or lumpy?", "What other drinks can I give?", "When should I start brushing teeth?"]'
                        predict: '["Should food be smooth or lumpy?", "What other drinks can I give?"]'
                    },
                    {
                        respMsg: 'I understand 😊 When your baby reaches 6 months old, they are ready to start having some solid foods alongside their normal milk (breast or first infant formula). At this stage any foods complement milk feeds which is why this is sometimes called ‘complementary feeding’. At 6 months baby will be starting to need more nutrition than breast or formula milk provides and learning to eat solids is an important part of normal growth and development.',
                        predict: ''
                    },
                    {
                        respMsg: 'I hear that a lot! Introducing solid foods is a process that teaches your baby how to move foods around their mouth, chew and then swallow foods. This helps to develop and strengthen the facial muscles which also starts to build the basics for speech.',
                        predict: ''
                    },
                    {
                        respMsg: 'I’ve heard that before! For some, the introduction of solids is a breeze with babies eating a wide range of foods from the start, and quickly adopting 3 meals a day, on top of their normal milk. For others the process is much slower. For most parents, introducing solid foods falls in between with a range of ups and downs – and that’s ok!',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s common! It’s perfectly normal for some foods to be easily accepted and others to take a bit of time, patience and practice.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s a common answer 😊 Think of introducing solid foods as a journey – you can decide how colourful and interesting this journey can be.',
                        predict: ''
                    },
                    {
                        respMsg: 'You seem great and I think you will be an amazing parent! Remember that up until now your baby has only had one food – a liquid that is sweet tasting and fairly bland. Given the wide range of foods, tastes and textures that they are about to experience it is no wonder that sometimes a baby is ‘surprised’ by a new food and may appear to reject this.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure! It is really important when introducing solid foods not to confuse a ‘surprised’ response where they appear disgusted and spit the food out with ‘dislike’. Try foods 8-10 times before deciding that it is not liked.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah I think I understand. It is recommended that you do not start to introduce solid foods to your baby before 6 months of age (26 weeks) – as their digestive system and kidneys are simply not ready for processing food before then. If you are thinking of introducing solids before 6 months, then please speak to your Health Visitor for advice first.',
                        predict: ''
                    },
                    {
                        respMsg: 'By around 6 months your baby will be starting to need more than the nutrition provided by milk alone. For example, babies are born with iron stores in place that are now starting to run low.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 By 6 months your baby will be able to:\n\n• Sit up and hold their head steady \n\n• Pick up food and move it to their mouth\n\n• Move food around their mouth, chew it and swallow – this may mean they can have mashed, lumpy and finger foods, and may not need smooth, blended foods at all! n\n• But don’t forget - every baby is different, and some may be slower than others to learn to handle food in the mouth, but a range of smooth foods and soft finger foods can be offered.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see 😊 Try to offer simple and unprocessed foods – base meals and snacks around minimally processed and natural foods.',
                        predict: ''
                    },
                    {
                        respMsg: 'A good idea is to allow your child to see and touch the foods they are offered so that they start to link the food they are eating with its look, smell and taste. This is to help them learn to choose foods for themselves as they grow older.',
                        predict: ''
                    },
                    {
                        respMsg: 'Hey, user name – let your child get involved in the eating experience – take your time and involve babies in family meals even before they are ready for solids.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you, user name! It’s nice to make eating a happy event. It is learning and play as well as a chance to provide energy and nutrients.',
                        predict: ''
                    },
                    {
                        respMsg: 'Would you like to say anything more? 😊',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s good to avoid ultra-processed foods – if there are more than a handful of ingredients on the label, put it back on the shelf.',
                        predict: ''
                    },
                    {
                        respMsg: 'I like talking to you! You’re great! Giving your baby lots of different foods to try, with varied tastes and textures, is likely to develop an enjoyment of a variety of foods as they get older. This is because your baby tends to grow to like the foods they get used to.',
                        predict: ''
                    },
                    {
                        respMsg: 'You’re going to be great at this, user name – I can sense it! Baked sweet potatoes, banana puree, and mashed carrots are perfectly fine, but baby food doesn\'t have to be bland. Avoid adding salt or sugar to foods, but flavours from garlic, herbs, spices and mild curry powders are all fine. Many babies actually enjoy a much wider range of flavours. Don’t be timid, start with small amounts and then gradually increase use of herbs and spices as they grow older.',
                        predict: ''
                    },
                    {
                        respMsg: 'Lots of parents have been in your position! Let your baby explore food at their own pace. The first few tastes may be just that – a taste and an exploration with their tongue, before dribbling it back out. With encouragement and support, you can help your baby get used to different flavours and feel confident about trying new foods.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, I understand. The distinct advantage of introducing solid foods at 6 months is that babies are more developmentally advanced and are able to reach out, pick up foods and feed themselves.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! As a first food most people often steam carrots (to about the degree that they can be squished between your thumb and finger), cut up cucumbers, make toast fingers or cut fingers of ripe mango, break up a banana, that sort of thing.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, I see 😊 It’s okay for your baby to have a pile of Spaghetti Bolognese or mashed potato to dig into if that’s what the rest of the family is having. Just remember to not add salt during cooking! ',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 Eating is a social experience so try to eat as a family as often as you can, with baby sharing the same foods, or if its just you and your little one try to sit and chat and enjoy the food together as you are the best role model for eating and table manners that your baby can ever have.',
                        predict: ''
                    },
                    {
                        respMsg: 'This is going to be fun for you, accept that it will be messy and so place a washable tablecloth under the highchair, especially if you have carpet underneath to catch the worst spills.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, thanks! When your baby’s had enough, they’ll let you know by firmly closing their mouth or turning their head away.',
                        predict: ''
                    },
                    {
                        respMsg: 'Here’s a top tip to help your baby eat: make sure babies sit in the same place to eat, as often as possible, to help them feel comfortable and secure.',
                        predict: ''
                    },
                    {
                        respMsg: 'Here’s a top tip to help your baby eat: cleaning messy faces is not pleasant for babies so if you can, lift them out of the highchair and take them to the sink to wash hands and wipe faces.',
                        predict: ''
                    },
                    {
                        respMsg: 'Here’s a top tip to help your baby eat: offer food when babies are most likely to be hungry.',
                        predict: ''
                    },
                    {
                        respMsg: 'Here’s a top tip to help your baby eat: present simple foods that they can easily see and distinguish.',
                        predict: ''
                    },
                    {
                        respMsg: 'Here’s a top tip to help your baby eat: offer colourful fruits and vegetables that will catch their attention.',
                        predict: ''
                    },
                    {
                        respMsg: 'Here’s a top tip to help your baby eat: give small portions, offer praise when it’s finished, and then offer more.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, I see! Here’s a top tip to help your baby eat: give foods they have eaten before alongside anything that is new.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, I see! Here’s a top tip to help your baby eat: eat together. This makes mealtimes more enjoyable and sociable.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, I see! Here’s a top tip to help your baby eat: eat a spoonful of your child’s food and show your enjoyment by saying ‘yummy’ and giving lots of smiles.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 It’s a good idea to encourage children to feed themselves. They may well eat a wider range of foods if they have more control.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sometimes it’s hard, but try to keep calm. If parents are anxious and tense, babies will pick up on this.',
                        predict: ''
                    },
                    {
                        respMsg: 'Try not to worry if more food is eaten on some days than on others – that’s normal.',
                        predict: ''
                    },
                    {
                        respMsg: 'Be guided by your baby and their appetite as they are growing and developing in the first year.',
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
                    {
                        respMsg: 'Okay, thanks! Aim for at least 2 portions of fish every week, 1 of which should be oily, such as salmon or mackerel. Buy canned fish canned in spring water or sunflower oil (avoid brine due to higher salt level) or frozen fish to help keep foods costs down.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Vegetarians get enough protein if the variety and amounts of foods selected are adequate. Protein sources for vegetarians include eggs (for ovo-vegetarians), beans and peas, nuts, nut butters, and soy products (tofu, tempeh, veggie burgers). Try to include a range of different protein foods into your child’s diet over each week.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thanks for telling me! Eat foods high in fat, salt and sugar less often and in small amounts. \n\nThese foods include chocolate, cakes, biscuits, sugary soft drinks, butter, ghee and ice cream. They\'re not needed in our diet, so should be eaten as treats and not every day.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure! Both adults and children in the UK consume sugar far in excess of need, which causes dental decay, and contributes to overweight and obesity. Everyone is encouraged to cut down on sugary foods and drinks and it is important to limit babies sugar intake from their first tastes of food to discourage development of a preference for sweeter foods.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see, that’s normal! Healthier snack options are those without added sugar or salt, such as fruit (fresh, tinned or frozen), rice cakes, oatcakes, or homemade plain popcorn.',
                        predict: ''
                    },
                    {
                        respMsg: 'All food and drink choices matter – and every family will have their own healthy eating style. Finding your healthy eating style will make it easier to eat a healthy balanced diet every day.',
                        predict: ''
                    },
                    {
                        respMsg: 'Lots of small changes = big wins. Think of every change as a personal win on your path to healthier eating.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay. Make one third of plate veggies and fruits. Vegetables and fruits are full of nutrients that support good health. Choose red, orange fruits and dark-green vegetables such as tomatoes, sweet potatoes, and broccoli.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure! Aim to eat at least one wholegrain food each day such as wholemeal bread or brown rice. Look for the words “100% whole grain” or “100% whole wheat” on the food label. Young children can fill up quickly on higher fibre foods so its fine to use a mixture, but they should get used to some wholegrain foods from the start. As they grow make more of their grain foods ‘wholegrain’.',
                        predict: ''
                    },
                    {
                        respMsg: 'I think you’re great! Complete two meals a day with a cup of milk, serving of cheese or yoghurt. These provide calcium, protein and other essential nutrients. Plant based alternatives can be used in cooking for <1-year olds or as a drink over 1 year of age but check that they are fortified with calcium and vitamin D. Do not give rice milk to under 5’s due to the amount of arsenic it contains.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Choose protein foods such as lean beef, pork, chicken, or turkey, and eggs, nut butters, beans, or tofu. Twice a week, make fish the protein on your plate – make one an oily type of fish.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 Young children need the energy in full fat products, however adding lots of oils and spreads can change a healthier food into a less healthy one – for example turning potato into chips.',
                        predict: ''
                    },
                    {
                        respMsg: 'Whether you are making a sandwich, a stir-fry, or a casserole, find ways to make them healthier. Try adding in more veggies that add new flavours and textures to your meals. Make unfamiliar foods more appealing by making patterns or pictures on the plate with food.',
                        predict: ''
                    },
                    {
                        respMsg: 'Try to prepare as much food at home for your children as you can so that you know exactly what they are eating. It’s cheaper than buying ready prepared children’s food and means that the family can all eat the same meals.',
                        predict: ''
                    },
                    {
                        respMsg: 'Keep it interesting by picking out new foods you’ve never tried before, like mango, lentils, quinoa, kale, or sardines. You may find a new favourite! Check out the recipe options to find tasty recipes for foods that you have never tried.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah that’s normal! You can indulge in a naturally sweet dessert dish—fruit! Serve a fresh fruit salad or a fruit parfait made with yogurt. For a hot dessert, bake apples, bananas or peaches and top with cinnamon.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! We often mistake thirst for hunger and eat when we should be drinking. Try to have 6-8 cups or glasses of water during each day – offering younger children small glasses and a larger one for the grown-ups. Drinking smaller amounts more often means the body is more likely to good use of the fluid and keep dehydration at bay.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! Planning ahead will help to you make sure everyone eats a healthy balanced diet with a variety of foods and will help you to save money by avoiding impulse buys of food that is then not used.',
                        predict: ''
                    },
                    {
                        respMsg: 'This could be helpful – before making a shopping list, write down meals you want to make this week. Try to think of what you can cook that everyone can eat – including the youngest members of the family. Check that every meal includes protein, carbohydrates and vegetables or fruit and that dairy is in a meal at least once or twice each day.',
                        predict: ''
                    },
                    {
                        respMsg: 'This could liven things up: the grill isn’t just for toast – use it to cook vegetables and fruits as well. Try grilling mushrooms, peppers, cherry tomatoes and thick slices of courgette on a kebab skewer. Brush with oil to keep them from drying out. Grilled fruits like peaches, pineapple, or mangoes taste great too.',
                        predict: ''
                    },
                    {
                        respMsg: 'Try adding diced vegetable such as carrots, onions, parsnips or courgettes, canned tomatoes or canned pulses/beans into your favourite dish for that extra flavour. If you add pulses you can use less meat and save money too.',
                        predict: ''
                    },
                    {
                        respMsg: 'Add extra vegetables to your pasta sauces, soups bolognaise or chilli con carne. Slip some peppers, spinach, red beans, onions, grated root vegetables or cherry tomatoes into your traditional recipes and then cook as usual.',
                        predict: ''
                    },
                    {
                        respMsg: 'Forget boring lettuce and tomato. Toss in grated carrots or courgettes, strawberries, spinach, sweetcorn watercress, orange segments, or pea shoots for a flavourful, fun salad. Who can make the best face or picture out of their salad?',
                        predict: ''
                    },
                    {
                        respMsg: 'As soon as finger foods are introduced make the most of chop n dip options. Try vegetable sticks (lightly cooked if needed) with houmous or a mild salsa or go fruity and dip into yoghurt or fruity sauce (simply blitz berries for a simple sauce to dip or pour over ice cream or yoghurt).',
                        predict: ''
                    },
                    {
                        respMsg: 'Try something new! Stir-fry your veggies — like broccoli, carrots, sugar snap peas, mushrooms, or green beans — for a quick-and-easy addition to any meal. Or buy ready mix from the supermarket form the veg or freezer aisles. Shop bought stir fry sauces tend to high in sugar and salt so avoid adding these for pre-schoolers.',
                        predict: ''
                    },
                    {
                        respMsg: 'Whether it is a sandwich or wrap, vegetables make great additions to both. Try sliced tomatoes, romaine lettuce, or avocado on your everyday sandwich or wrap for extra flavour. Grate or thinly slice apple with cheese or add mango to chicken or ham for a fruity twist.',
                        predict: ''
                    },
                    {
                        respMsg: 'Boost the colour and flavour of an omelette with vegetables. Simply chop, sauté, and add them to the egg as it cooks. Try combining different vegetables, such as mushrooms, spinach, onions, tomatoes or peppers.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see, thanks user name! Babies and children have smaller stomachs than adults and so it is important they eat smaller amounts of food regularly.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I get you! Some children find a lot of food on their plates off putting and this can stop them enjoying mealtimes.',
                        predict: ''
                    },
                    {
                        respMsg: 'Young children are much better at recognising when they are full than adults to serve small portions and offer more if that is all eaten. Never force a child to clean their plates as this encourage the habit of overeating.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sitting down together for a meal whenever you can is a great way to connect with your family. Keeping it relaxed is key to making sure you are getting the most out of this time together, including talking, laughing and choosing healthy foods.',
                        predict: ''
                    },
                    {
                        respMsg: 'It may seem trivial to chat about your day but Making Small Talk with children no matter how young help with speech and language development. Not every family has a table to eat around – but you can still eat together sat on the sofa or have a circle picnic on the floor.',
                        predict: ''
                    },
                    {
                        respMsg: 'Kids learn by doing. The little ones might carry the cutlery and non-breakable glasses to the table and older kids can help with preparing foods and cleaning‐up the table after.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! These are some questions you can ask me: \n\n Which foods have hidden sugars?\n\nWhat foods are processed?\n\nWhat do I need to give my child for a balanced diet?',
                        predict: '["Which foods have hidden sugars?", "What foods are processed?", "What do I need to give my child for a balanced diet?"]'
                    },
                    {
                        respMsg: 'You can also ask me questions, user name. Here’s some: \n\nMy baby has no teeth – can they eat solid foods?\n\nI’m worried about my baby choking if I give them lumpy or finger foods\n\nWhen do I give my baby 3 meals a day?',
                        predict: '["My baby has no teeth – can they eat solid foods?", "I’m worried about my baby choking if I give them lumpy or finger foods", "When do I give my baby 3 meals a day?"]'
                    },
                    {
                        respMsg: 'I also have answers to some questions. Here’s some you may want to ask: \n\nMy baby looks small, are they eating enough?\n\nHow long should a breastfeed last when weaning?\n\nHow do I know when my child has had enough breast milk?',
                        predict: '["My baby looks small, are they eating enough?", "How long should a breastfeed last when weaning?", "How do I know when my child has had enough breast milk?"]'
                    },
                    {
                        respMsg: 'I can also answer questions. Maybe you’d like to know about these: \n\nWhen can I give fruit juice or smoothies undiluted?\n\nCan I give my baby tea over 6 months of age? \n\nHow much water should a school aged child have?',
                        predict: '["When can I give fruit juice or smoothies undiluted?", "Can I give my baby tea over 6 months of age?", "How much water should a school aged child have?"]'
                    },
                    {
                        respMsg: 'I see! You can also ask me some questions. Here’s some: \n\n What is a good portion size?\n\nI think my baby is constipated. What do I do?\n\nI think my child is constipated. What should I do?',
                        predict: '["What is a good portion size?", "I think my baby is constipated. What do I do?", "I think my child is constipated. What should I do?"]'
                    },
                    {
                        respMsg: 'I’m also able to answer questions you may have. These are some you can ask me: \n\nWhat cup should I use?\n\nDoes my child have to eat vegetables?\n\nIs it true that breastfed babies enjoy a wider range of foods?',
                        predict: '["What cup should I use?", "Does my child have to eat vegetables?", "Is it true that breastfed babies enjoy a wider range of foods?"]'
                    },
                    {
                        respMsg: 'I’m also able to answer questions you may have. These are some you can ask me: \n\nWhat cup should I use?\n\nDoes my child have to eat vegetables?\n\nIs it true that breastfed babies enjoy a wider range of foods?',
                        predict: '["What cup should I use?", "Does my child have to eat vegetables?", "Is it true that breastfed babies enjoy a wider range of foods?"]'
                    },
                    {
                        respMsg: 'I see! You can also ask me some questions. Here’s some: \n\nTell me about fruits & vegetables \n\nTell me about protein foods \n\nTell me about milk, yoghurt and dairy',
                        predict: '["Tell me about fruits & vegetables", "Tell me about protein foods", "Tell me about milk, yoghurt and dairy"]'
                    },
                    {
                        respMsg: 'I also have answers to some questions. Here’s some you may want to ask: \n\nTell me about oils & fats\n\nHow do I cut back on sugars? \n\nHow much fluid do I need?',
                        predict: '["Tell me about oils & fats", "How do I cut back on sugars?", "How much fluid do I need?"]'
                    },
                    {
                        respMsg: 'Okay! These are some questions you can ask me: \n\nWhat can I give as a drink? \n\nAre there drinks I should avoid?\n\nHow can I spend less on good quality meat?',
                        predict: '["What can I give as a drink?", "Are there drinks I should avoid?", "How can I spend less on good quality meat?"]'
                    },
                    {
                        respMsg: 'Okay, I see 😊 I’m also able to answer some questions. These are some I can answer:\n\nWhat can I give as a drink? \n\nAre there drinks I should avoid?\n\nHow can I spend less on good quality meat?',
                        predict: '["What can I give as a drink?", "Are there drinks I should avoid?", "How can I spend less on good quality meat?"]'
                    },
                    {
                        respMsg: 'I’m also able to answer questions you may have. These are some you can ask me: \n\nHow do I get smart with snacking?\n\nHow do I keep food safe? \n\nHelp on best before dates',
                        predict: '["How do I get smart with snacking?", "How do I keep food safe? ", "Help on best before dates"]'
                    }

                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter7: {
        welcome: {
            1: {
                text: 'Welcome to this Chapter on active families, user name! Do you enjoy being active? How do you feel when you think about this? ',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap7,
                targetMsgArr: [
                    {
                        respMsg: 'How is being active going with your family going?',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand. Being active regularly is really important to help your children grow and develop healthily. What do you find fun?',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, thanks! Children love to play and be active and parents can play a super role in this. In fact the role that adults play is crucial – some play is more spontaneous such as running after a butterfly they spot in the garden, reaching out to touch a daisy on the lawn or playing with a box of old clothes and jewellery you pulled out of the cupboard to sort out!',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! Parents can lead by example and you can involve your kids in your daily activities such as always walking to friends rather than taking the car. Whether your child is not yet walking or just toddling, making walking to your destination an everyday normal will encourage your child to walk now, and also keep up this great habit as they grow up. Learning life skills such as care around people or cars, and how to cross a road safely is also vitally important.',
                        predict: ''
                    },
                    {
                        respMsg: 'Could you tell me more?',
                        predict: ''
                    },
                    {
                        respMsg: 'If you help keep your child active in their early years, then they are more likely to be active as adults, keeping them in good health throughout life.',
                        predict: ''
                    },
                    {
                        respMsg: 'When your kids keep active every day, they are more likely to achieve and maintain a healthy body weight!',
                        predict: ''
                    },
                    {
                        respMsg: 'When your kids keep active every day they build strong muscles and bones and improve their skills such as balance and co-ordination.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay 😊 Keeping kids active during the day can help them interact better with other children and adults!',
                        predict: ''
                    },
                    {
                        respMsg: 'Children who are active are more likely to stay a healthy weight, will tend to be fitter, healthier, better able to learn, and more self-confident. They\'re also much less likely to have health problems in later life.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ok, sure! Children whose parents encourage them to be active and eat well are more likely to stay a healthy weight and grow up as a healthy child. When they go to school, they are more likely to be confident and less likely to be bullied. Not only that, as they grow up, healthy habits mean they are more likely to avoid health problems such as diabetes, heart disease or bone and joint problems in adult life.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s interesting, why do you say that?',
                        predict: ''
                    },
                    {
                        respMsg: 'Kids muscles get stronger the more they use them. The same is true for their bones. Walking, running, jumping, and climbing are great activities for building bone as the force of our muscles and gravity combine to put pressure on our bones. This pressure tells the body to build up stronger bone. This type of exercise is called weight-bearing exercise. ',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand! As children grow up their self-confidence and self-esteem (what he or she thinks about the themselves) plays an important role in their life choices. You can start to build this right from the start by encouraging age appropriate choices and decisions. Which t shirt to wear, an apple or an orange, which game to play. Let them take the lead and make choices as often as you can.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see. A child’s degree of self-esteem can be high or low and may change at different times. Children who have a healthier self-esteem tend to have a positive sense of self and are more confident. On the other hand, when children have a poor or low self-esteem, this can have a negative effect on their life choices.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Confidence is important to a child’s future happiness, health, and success. Confident children are better able to deal with peer pressure, responsibility and independence and things that they find challenging. They should also be better able to handle both positive and negative emotions with less outbursts and tantrums.',
                        predict: ''
                    },
                    {
                        respMsg: 'Giving children simple choices is a great way to help them to feel in control. Which colour socks to wear, an apple or a pear, which cover to put on the bed. What choice of activity could you give your child, Okay, thanks! Children love to play and be active and parents can play a super role in this. In fact the role that adults play is crucial – some play is more spontaneous such as running after a butterfly they spot in the garden, reaching out to touch a daisy on the lawn or playing with a box of old clothes and jewellery you pulled out of the cupboard to sort out!? Give a choice of options that lead to the same outcome and keep them simple – then your child will find it easy to decide.',
                        predict: ''
                    },
                    {
                        respMsg: 'We are all too good at focusing on what we can’t do and the things that other people are better at than we are. We forget to focus on the things that we do well. The same goes for children of all ages. Try to ensure that every day you do something that focuses on your child’s strengths and not on their flaws.',
                        predict: ''
                    },
                    {
                        respMsg: 'Praise what your child is good at, and especially when they stick with a task that they find challenging until they get it done. Focus praise on effort and trying hard rather than the end product or achievement. Help and encourage them to have a go at doing things without feeling embarrassed – and help them to overcome things they are finding.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! Building confidence in your child is key! A great way to build confidence and a sense of self-worth is to spend quality time with your children to show that they are valuable and important. Make some time that is just for them with no jobs or distractions.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure! A good idea is to take your child on outings, eat a special family dinner together, play games – inside or out, paint a picture or do a craft activity together. Children know when you are distracted or focusing on something else so try to build in times when you truly just focus on your baby/child and nothing else.',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s OK not to be the best at everything, or to win at everything. This is where activity can help. Teaching new skills in the world of activity can be very rewarding. From learning to walk and the encouragement given at that stage to learning to climb the stairs, ride a bike, kick a ball and hop on one foot can all be a major step towards helping your child’s self-esteem.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! As children grow and develop, they can do more and more activities. Physical activity starts from birth. Once your child is born simply floating them carefully around in the bathtub and taking your baby out in the baby buggy starts to get them used to doing things.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure! As your baby gets older, begins to crawl and then can walk unaided, ideally you should try and keep them active for at least 180 minutes a day. That’s 3 hours. They don’t have to do it all at once of course as activities can be spread out into blocks throughout the day.',
                        predict: ''
                    },
                    {
                        respMsg: 'As much as you can, encourage your child to do active things that fit in with your day – you could encourage them to walk alongside the baby buggy with you when you visit friends or help you with things around the house – it might take a little longer but it can be fun and they can learn; you are leading by example and encouraging them to get more active along with you.',
                        predict: ''
                    },
                    {
                        respMsg: 'I like talking to you, user name!😊 Have you managed to get some active play today with the family?',
                        predict: ''
                    },
                    {
                        respMsg: 'Your baby’s favourite plaything is you – so try to spend time playing with your baby every day. Playing actually requires a lot of your baby’s brain and muscle power. It helps develop their social, intellectual, language and problem-solving skills – and is one of the main ways they learn about the world. Play time is fun and educational.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Activity can be encouraged from the day your child is born. Physical activity in a safe environment can be started from birth. From birth babies start to grasp and this continues as they grow and develop. Start by letting them grasp your finger, then move onto soft toys and go from there.',
                        predict: ''
                    },
                    {
                        respMsg: 'This is a good idea to do with your toddler: play with balls and encourage them to catch and throw – choose a nice soft ball that is safe to throw indoors too!',
                        predict: ''
                    },
                    {
                        respMsg: 'This is a good idea to do with your toddler: blow bubbles and let them chase the bubbles!',
                        predict: ''
                    },
                    {
                        respMsg: 'This is a good idea to do with your toddler: play music and dance around the room or play games such as ‘Ring A Ring O’ Roses and ‘Incy Wincy Spider’!',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand, user name. Is it a good time to go outdoors and play?',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s not always easy…so here is an idea I thought about for you: walk your older children to school and take your toddler with you – encourage them to walk alongside the buggy instead of sitting in it!',
                        predict: ''
                    },
                    {
                        respMsg: 'Sometimes we need a little bit of inspiration…so here is an idea I thought about for you: involve your child in helping you around the house; give them a duster to dust, a small toy brush whilst you sweep the floor!',
                        predict: ''
                    },
                    {
                        respMsg: 'Could you try walking to the shops or to see a friend? Maybe you could turn off the TV and dance to music? I enjoy rolling around on the floor. I don’t really, I can’t even do that because I’m a robot. Maybe your child would enjoy it?',
                        predict: ''
                    },
                    {
                        respMsg: 'You seem fun, user name! Lead by example and be your child’s role model. This is so true for so many parts of family life. Walk together, play together and eat together. Ask friends along and share experiences. It’s good to create routines to help everyone feel secure.',
                        predict: ''
                    },
                    {
                        respMsg: 'Even though play together is good, allow your child to play by themselves and at their own pace. Play also means they can spend time imagining and inventing things all on their own. Give them time to do nothing but daydream too!',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! All too often parents buy mountains of new toys for their kids which turn out to be a 10-minute wonder! Children need to learn how to play and keep active with basic things that are simply around the house, cardboard boxes, plastic tubs, and wooden spoons all make great toys.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 Don’t feel that you always have to spend lots of money on toys. Ask around for second-hand toys or join a local toy library. As long as they are clean it doesn’t matter that anything is second hand, and when your child grows out of something and loses interest – don’t throw it out, pass it on!',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, user name! Your child will find things that they want to do, sometimes almost by accident. Note what skills they seem to enjoy and encourage them. Kids are happy when they achieve something new and usually want to share their moment with you too. The key is to keep doing different things and ring the changes.',
                        predict: ''
                    },
                    {
                        respMsg: 'How’s it going today?',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay 😊 Older siblings and grandparents can be a massive influence in helping to keep your child active. The bond between other family members can be incredibly special. Grandparents can have oodles of experience to offer and often have more time.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ok, I hear you, user name! Encourage your kids and grandparents to do things together and they will all benefit. They can be active activities, quiet activities and activities that help your kids to grow and develop their skills such as thinking and talking.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, I see! You can have a sing-along, or read a book together, even paint a picture!',
                        predict: ''
                    },
                    {
                        respMsg: 'Walking is a fun and easy way to get active with the family. Why not take a family walk today?',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nWhen will my baby learn to crawl?\n\nWhen will my baby learn to walk? \n\nWhat is a Toy Library?',
                        predict: '["When will my baby learn to crawl?", "When will my baby learn to walk?", "What is a Toy Library?"]'
                    },
                    {
                        respMsg: 'Okay! I can also answer questions. Maybe you’re interested in some of these… \n\nHow do I register with the Children’s Centre parent and baby groups?\n\nCan Family Information Services provide me with local activities? \n\nCan Family Information Services provide me with local activities for school age children?',
                        predict: '["How do I register with the Children’s Centre parent and baby groups?", "Can Family Information Services provide me with local activities?", "Can Family Information Services provide me with local activities for school age children?"]'
                    },
                    {
                        respMsg: 'I can also answer questions. Here’s some you can ask: \n\nMy toddler gets bored of his/her toys, what can I do?\n\nWhy should families be active?\n\nWhat sort of things could we do to be active?',
                        predict: '["My toddler gets bored of his/her toys, what can I do?", "Why should families be active?", "What sort of things could we do to be active?"]'
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nWhat counts as physical activity?\n\n Which activities develops motor skills?\n\nHow much activity does my child need?',
                        predict: '["What counts as physical activity?", "Which activities develops motor skills?", "How much activity does my child need?"]'
                    },
                    {
                        respMsg: 'Okay, I see! You can also ask me questions. Here’s some: \n\nWhat physical activities are best for my child?\n\nWhat is Activity snacking?\n\n My child hates walking what do I do?',
                        predict: '["What physical activities are best for my child?", "What is Activity snacking?", "My child hates walking what do I do?"]'
                    },
                    {
                        respMsg: 'These are some questions you can ask me too: \n\nI need to drive my older kids to school – how can that encourage my younger child to walk?\n\n How much activity should my disabled child do? ',
                        predict: '["I need to drive my older kids to school – how can that encourage my younger child to walk?", "How much activity should my disabled child do?"]'
                    },
                    {
                        respMsg: 'Okay! As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\n I’m pregnant with my next child, what can I do together with my older child?\n\nWhat if I work part time or full time and my child is in nursery?',
                        predict: '["I’m pregnant with my next child, what can I do together with my older child?", "What if I work part time or full time and my child is in nursery?"]'
                    }

                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter8: {
        welcome: {
            1: {
                text: 'Welcome to this Chapter on fussy eating! How are mealtimes going for you, user name? How has it been this week for you?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap8,
                targetMsgArr: [
                    {
                        respMsg: 'Okay! Fussy eating is very common among toddler and pre-school children. It’s simply another step in the process of growing up and becoming independent. It’s very frustrating but if your child is healthy, growing normally, and has plenty of energy, they are most likely getting the nutrients they need.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah right, that’s very normal. Tap into your child’s senses about food as much as you can. When children look at, smell, taste, touch and listen to things in early childhood the habits they learn often stick with them all the way to adolescence and adulthood. If your child is introduced to different vegetables, berries and fruit in hands-on sessions such as baking and cooking, growing their own vegetables and reading about food books and playing games involving food, their willingness to choose vegetables, berries and fruit is increased.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see. Your child may refuse a food based on a certain colour or texture. For example, they could refuse foods that are red or green, contain seeds, or are squishy. This is normal and they will probably grow out of it.',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand. For a period of time, your pre-schooler may only eat a certain type of food. Your child may choose 1 or 2 foods he or she likes and refuse to eat anything else.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ok 😊 Sometimes your child may waste time at the table and seem interested in doing anything but eating.',
                        predict: ''
                    },
                    {
                        respMsg: 'Your child may be unwilling to try new foods. It is normal for your pre-schooler to prefer familiar foods and be afraid to try new things.',
                        predict: ''
                    },
                    {
                        respMsg: 'Refusing food is a normal stage that most toddlers go through and can be frustrating and extremely worrying for parents.',
                        predict: ''
                    },
                    {
                        respMsg: 'I’m sure I’ve heard that before! Keep in your mind that one day your child will hate a food and totally refuse to eat it and then sometime later they’ll love it! It also takes around 10 tastes to learn to like any new food so be patient and keep trying.',
                        predict: ''
                    },
                    {
                        respMsg: 'Hmm…I see! It may be a good idea to plan your child’s weekly meals and keep offering a variety of foods. It’s important to introduce your child to a range of tastes, textures and flavours.',
                        predict: ''
                    },
                    {
                        respMsg: 'It may take a few attempts before your child eats some foods (often 10 tries of a food are needed before it’s accepted and liked) so keep trying while also offering other foods that you know they will eat.',
                        predict: ''
                    },
                    {
                        respMsg: 'Regularly offering your child a variety of foods will add to their willingness to try other new foods. This will make things easier for your child to accept a wider variety of foods into their diet and for you to serve them a wide variety of foods.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s okay! Try to serve small portions to your child and encourage these to be eaten and have seconds on hand in case they want more.',
                        predict: ''
                    },
                    {
                        respMsg: 'Children tend to be able to regulate the amount of food they eat far better than we do as adults and some days they will be hungrier than others. During a growth spurt their appetite may soar, and then drop back down again after a few days. Your child has a small tummy so consider serving smaller meals more often such as 3 small meals a day and 2 small snacks.',
                        predict: ''
                    },
                    {
                        respMsg: 'Hey, user name 😊 – I really like talking to you. Remember, if you give your child a large drink too close to a mealtime, they are likely to feel too full to eat much of the meal you have prepared. Simply give your child water instead, small drinks regularly will keep them better hydrated than larger drinks less often.',
                        predict: ''
                    },
                    {
                        respMsg: 'Do mealtimes get messy sometimes, user name? Children usually love to try and feed themselves. As frustrating as it may be, let your child try.',
                        predict: ''
                    },
                    {
                        respMsg: 'Try to avoid the common parent trap of offering a nice dessert in reward for eating their vegetables or dinner. If you use sweet foods and desserts as a reward your child will associate that will good behaviour and make these foods seem much more desirable! Have a healthy dessert, such as fruit and then if you want to add a little something you can – but don’t make it conditional on eating other things.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, sure! Serve your child foods at meals and snacks that are variations on a theme. For example, your child may love to drink milk with a meal but if they don’t, offer them another food that is milk-based instead.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay It may be a good idea to serve a little cheese sauce with their savoury meal or custard on a fruit dessert.',
                        predict: ''
                    },
                    {
                        respMsg: 'Add veggies to main meals - your child may refuse sliced boiled carrot but will eat them when you add them to a main meal such as adding grated carrot to Bolognese sauce. For dessert, replace fresh sliced fruit with stewed fruit for a change and use tinned fruit as a handy standby.',
                        predict: ''
                    },
                    {
                        respMsg: 'I do my best at understanding you, user name! I am only a robot 😊 Often if children have a choice it helps them to eat more – but make sure choices are similar in terms of food type and the nutrition they offer. Would they like broccoli or peas? Apples or a pear? Yoghurt or custard?',
                        predict: ''
                    },
                    {
                        respMsg: 'Could you tell me more please?',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah right – how does that make you feel?',
                        predict: ''
                    },
                    {
                        respMsg: 'I think you’re wonderful 😊 Use drawing books and crayons to draw pictures of different colourful foods. Your child will learn along the way as you tell them the names of the various foods you draw. Stickers can do the same jog and most kids seem to adore sticker books – look for food-based sticker books.',
                        predict: ''
                    },
                    {
                        respMsg: 'We don’t just eat food, we see it, touch it, smell it, taste it and hear it (as we touch it and when it’s in our mouths being chewed. Some children can have very sensitive taste to smell or want their foods all at room temperature because they are sensitive to hot or cold. Trying to work out which sense most affect your child’s eating a drinking could be the key to encouraging intake of a wider range of foods.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Your child may not want to try new foods. It is normal for children to reject foods they have never tried before. Why not try new foods together as a family and each describe how the food feels, smells and tastes – make sure that those family members who are old enough try to use positive descriptions to encourage food intake and not just negative.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure 😊 Rather than worrying about what your child eats at every meal, it’s more helpful to think about what they eat over the week. Your child’s picky eating is temporary. If you don’t make it a big deal, it will usually end before school age. Learning to eat is like any other learning process and it takes time!',
                        predict: ''
                    },
                    {
                        respMsg: 'You and other family members will be role models to your child and your child will copy you all. Offer the same foods for the whole family and serve the same meal to adults and kids. Let them see you enjoy healthy foods. Talk about the colours, shapes, and textures on the plate. Watch the salt though – avoid adding salt to meals that you are going to serve to your child.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see, that’s normal. If your child refuses the food, you have served then stay calm and don’t make a fuss about it. Avoid forcing your child to eat it and quietly take the food away.',
                        predict: ''
                    },
                    {
                        respMsg: 'Eating together is a habit to stick to as much as you can. Try and sit down to family meals together as often as you can. Many families may not manage every meal, but some will be possible even if it’s just breakfast or dinner. Even if you don’t eat with the children make sure you sit at the table and talk about their food, their day and family life.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, user name! Your child may eat slowly. Try and serve meals and snacks when there is the time for your child to eat it in a calm and peaceful way. If you try and hurry the pace, then things are likely to get quite fraught! But set a reasonable time limit for a meal e.g. 30 minutes and then take it away.',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s worrying for parents when their child reject food and it’s tempting to offer them something you know they will like soon after a meal – just to make sure they’ve eaten something. It’s better to wait until the next meal (or usual snack time) though and stay with a regular meal pattern.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see 😊 If your child is tired, then it’s likely that they are too tired to eat too! Offer meals and snacks at regular times and when your child has the energy to eat.',
                        predict: ''
                    },
                    {
                        respMsg: 'It’s so much better for you and your child to eat in a calm, relaxed environment without distractions such as TV, games and toys. Young children can only concentrate on one thing at a time and distractions make it more difficult to focus on eating.',
                        predict: ''
                    },
                    {
                        respMsg: 'Your child will often eat things that other children are eating. Invite friends and their children round to tea – opt for the good eaters though! Your child is going to be more willing to taste and accept foods into their diets the foods that they have seen others eating.',
                        predict: ''
                    },
                    {
                        respMsg: 'After about 20 or 30 minutes end the meal. If you carry the meal on for too long your child might also keep eating and eating. As a result, they may eat too much and gain a bit too much weight. It’s a better idea to wait for the next snack or meal and offer them nutritious foods then.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! When your child starts to keep their mouth shut when you are trying to feed them, they gag or spit food out, then it’s pretty likely they have had enough. They might also turn their head away when you offer then food or push their spoon and bowl away – or even throw it overboard!',
                        predict: ''
                    },
                    {
                        respMsg: 'I sense you’re a great person. Often children are eating more than realise as we look at a single meal and not the whole day. Make a record of what you are serving to your child and then what they have eaten form the meal.',
                        predict: ''
                    },
                    {
                        respMsg: 'Introduce your child to different fruit and vegetables by reading books and stories that focus on fruit and vegetables characters. Show your child pictures of a range of fruit and vegetables. You can do this at any time of day, not just as a bedtime story.',
                        predict: ''
                    },
                    {
                        respMsg: 'Provide children with opportunities to eat new and disliked foods fruit and vegetables. It might take time for them to learn to like different flavours so keep offering. Offer them choices. Rather than ask, “Do you want broccoli for dinner?” ask “Which would you like for dinner, broccoli or cauliflower?”',
                        predict: ''
                    },
                    {
                        respMsg: 'Children love to be told ‘well done’ so words of simple praise can go a long way. Each time your child tastes a refused food, give them a sticker, badge, or rubber stamp.',
                        predict: ''
                    },
                    {
                        respMsg: 'Are grandparents or other members of the family helping?',
                        predict: ''
                    },
                    {
                        respMsg: 'Children are like sponges, picking up habits and behaviours from those they see around them. This means that role models can play a really important part in shaping children\'s eating habits.',
                        predict: ''
                    },
                    {
                        respMsg: 'Try to ensure that you are modelling healthy eating behaviours in front of your child.  If you want your child to eat a new food, they need to see you eating it too. If you don\'t want your child to eat a food such as chocolate or crisps, don\'t eat those foods in front of them.',
                        predict: ''
                    },
                    {
                        respMsg: 'Commenting on foods that you like can help direct children\'s attention to that food and encourage them to try it too. For example, "Mummy really likes green beans" or "Look how crunchy these carrots are". You can even say “Teddi loves greens!”',
                        predict: ''
                    },
                    {
                        respMsg: 'We don\'t all like the same foods, and that\'s fine. Do avoid commenting on foods you don’t like such as saying "urgh, I don\'t like mushrooms at all’ because your child is likely to pick up on it. They are much less likely to want to try that food. So, keep thoughts about disliked foods to yourself!',
                        predict: ''
                    },
                    {
                        respMsg: 'Could you mention others to your child who are doing good at eating vegetables?',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s normal! Siblings, other family members or friends can be very helpful for encouraging children to try a food. Remember never to pressure or force a child to eat something they don’t want!',
                        predict: ''
                    },
                    {
                        respMsg: 'Don\'t ever feel you have to cope alone. Friends and family can be a great support so don’t bottle things up and share your concerns with others.',
                        predict: ''
                    },
                    {
                        respMsg: 'When you child refuses food, has a tantrum and starts being a bit disruptive, remember it’s all part of them growing up and exerting their opinion.',
                        predict: ''
                    },
                    {
                        respMsg: 'I’m here to help and so is your health visitor! ',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! I can also answer questions. Maybe you’re interested in some of these… \n\n What is fussy eating? \n\nWhat causes fussy eating? \n\nWhere can I get help for fussy eating?',
                        predict: '["What is fussy eating?", "What causes fussy eating?", "Where can I get help for fussy eating?"]'
                    },
                    {
                        respMsg: 'I can also answer questions. Here’s some you can ask: \n\nIs constipation a cause of fussy eating?\n\n My child doesn’t eat properly – what do I do?\n\n Is my baby hungry because they keep putting their fist into their mouth?',
                        predict: '["Is constipation a cause of fussy eating?", "My child doesn’t eat properly – what do I do?", "Is my baby hungry because they keep putting their fist into their mouth?"]'
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nAll my child want to eat is sweet treats.\n\nMy baby only eats sweet things.\n\n How do you get my child to eat vegetables without an argument?',
                        predict: '["All my child want to eat is sweet treats.", "My baby only eats sweet things.", "How do you get my child to eat vegetables without an argument?"]'
                    },
                    {
                        respMsg: 'Okay, I see! You can also ask me questions. Here’s some: \n\nMy baby will only eat with the TV on is that OK?\n\n My child won’t eat vegetables what should I do? \n\nMy child won’t eat green vegetables',
                        predict: '["My baby will only eat with the TV on is that OK?", "My child won’t eat vegetables what should I do?", "My child won’t eat green vegetables"]'
                    },
                    {
                        respMsg: 'These are some questions you can ask me too: \n\nHow do I get my child to eat vegetables?\n\nMy child is suddenly refusing to eat foods they used to eat.\n\nDoes fussy eating lead to eating disorders later on?',
                        predict: '["How do I get my child to eat vegetables?", "My child is suddenly refusing to eat foods they used to eat.", "Does fussy eating lead to eating disorders later on?"]'
                    },
                    {
                        respMsg: 'Okay! As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nIs it fussy eating a sign of autism? \n\nDoes eating together really matter? \n\nWhat strategies can I use to support my fussy child?',
                        predict: '["Is it fussy eating a sign of autism?", "Does eating together really matter?", "What strategies can I use to support my fussy child?"]'
                    },
                    {
                        respMsg: 'Okay! As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nMy child refuses food at mealtimes should I give them snacks? \n\nMealtimes are such a battle ground – how do I make them more enjoyable? ',
                        predict: '["My child refuses food at mealtimes should I give them snacks?", "Mealtimes are such a battle ground – how do I make them more enjoyable?"]'
                    },
                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter9: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 9! This is all about emotional wellbeing. When you reflect on emotional wellbeing, what do you think about user name?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap9,
                targetMsgArr: [
                    {
                        respMsg: 'I understand, thank you for telling me, user name! Being a parent is wonderful and a joy, but at times can also be challenging and feel chaotic and exhausting.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand – thank you! We know that looking after physical health is important, but we often overlook our emotional wellbeing which is just as important.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s interesting, thank you for telling me 😊 If you have good emotional wellbeing you will be better able to cope with any ups and downs of being a parent and feeling positive will help to keep your baby or children feeling positive and calm as well. If you are happy and calm, they will tend to be as well.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I see. Emotional wellbeing is not something that just happens, it is something that we can practise and develop.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, I understand. Emotional health is an important part of overall health. People who are emotionally healthy are in control of their thoughts, feelings, and behaviours.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you 😊 Everyone has days where they feel angry or sad or upset for example, but it’s how you handle it that counts. People who are emotionally resilient can ride the daily challenges well. Taking time to build strong bonds with children and developing secure emotional attachments helps families to communicate and work together to overcome any challenges that come their way.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you for telling me 😊 A young child’s brain is developing rapidly and is affected by life experiences that are positive or negative. Their relationships with others, feeling secure and loved and the understanding that they have of those around them all contribute massively to their overall emotional health.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, I see 😊 Try to do at least 2 things every day that make you feel good.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah I understand! Can you make a list of the top 5 things you’re most grateful for? I’m grateful for being able to talk to you! 😊',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, thank you! Make time in your day to consider your emotions and reactions to the things that you do. Think about what makes you happy, and what makes you sad, and try to include more of the things that make you feel positive or good.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, thank you 😊 Being physically active means sitting down less and moving our bodies more. Many people find that physical activity helps them maintain a positive approach to life.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see, thank you 😊 Even a simple 20-minute stroll can clear the mind and reduce stress. Think of a walk as more than a means of transport from A to B, but a whole meditation and stress relieving package in one.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand 😊 You might not think it – particularly today when people appear to post a constant stream of happy life events and successes on social media – but everyone makes mistakes and has bad days. They just don’t post about these and so you don’t realise that they have wobbles as well.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s very common 😊 Praise your child for effort. Achievement is good too, but just trying to do something and working hard is a wonderful thing to acknowledge. Children often take a lot of practice before they learn to do something new and so praising the trying becomes really important to help them get there.',
                        predict: ''
                    },
                    {
                        respMsg: 'Most people say something similar! Reading is a great way to entertain your child and spark their imagination. Not only that it gets them away from screens, but also helps you and your child to bond. Bedtime stories are a great way to settle them down for a good night’s sleep.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, thanks 😊 Get out into the fresh air together. Go for a walk and play on the playground. Point out the ducks, the dogs and the birds and simply watch the world go by.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah, I see 😊 Visit friends who have children so the children can play together while you have a good natter with your friends. Or arrange to meet in the park or at a local activity centre. Outings are always more fun with other company around.',
                        predict: ''
                    },
                    {
                        respMsg: '😊 Try mindful eating. This involves paying attention to the taste, sight and textures of what you eat. For example, when drinking a cup of tea or coffee you could focus on how hot and liquid it feels on your tongue, how sweet it tastes or watch the steam that it gives off.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you 😊 Notice the feeling of your body moving. You might notice the breeze against your skin, the feeling of your feet or hands against different textures on the ground or nearby surfaces, and the different smells that are around you.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Move your attention slowly through different parts of the body, starting from the top of your head moving all the way down to the end of your toes. You could focus on feelings of warmth, tension, tingling or relaxation of different parts of your body.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, okay 😊 Sit and focus on your breath, sensations in your body and the things you can hear around you. Try to bring you focus back to the present if your mind starts to wander. Just notice what you do notice. ',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Given the pleasures and benefits of social ties, why not grasp opportunities to expand your social circle and deepen the ties you’ve already made?',
                        predict: ''
                    },
                    {
                        respMsg: 'I see, sure 😊 When you are looking after young children there never seems to be time to just sit and enjoy a hot drink. Simple as it sounds, taking 5 minutes when you can to just sit, and be and enjoy the moment can make a huge difference to dealing with the continuous hub bub in between.',
                        predict: ''
                    },
                    {
                        respMsg: 'I like how you think, user name! The way we think (and what we think about) can affect how we feel and act. For example, if you think or worry a lot about past or future events, you might often feel sad or anxious. Mindfulness uses various techniques to bring your attention to the present (usually focusing on your body and your breathing).',
                        predict: ''
                    },
                    {
                        respMsg: 'Put on some nursery rhymes, or other music and sing and dance. Any music will do – watch your child join in and have fun.',
                        predict: ''
                    },
                    {
                        respMsg: 'If checking social media leaves you feeling down then stop – give yourself short periods to check on important stuff and then put your phone down, for several hours at a time.',
                        predict: ''
                    },
                    {
                        respMsg: 'Put your phone down and connect with nature. (Yes even though I’m on your phone, you can come back later, I only care about helping you)!',
                        predict: ''
                    },
                    {
                        respMsg: 'There are days when everything will go perfectly to plan, but other days won’t. Realising that perfection isn’t possible and accepting limitations can make life a lot less frustrating. You didn’t manage something today? Was it really a problem? Just take a deep breath, smile, prioritise the things that actually have to be done and leave the rest until tomorrow.',
                        predict: ''
                    },
                    {
                        respMsg: 'A huge amount of social and emotional development takes place during early childhood. As children experience their own emotions, temper tantrums, mood swings, and an expanding social world, they have to learn about their emotions, as well as those of other people.',
                        predict: ''
                    },
                    {
                        respMsg: 'Love is usually the answer! Love your child, love yourself, take a moment and wish a stranger well.',
                        predict: ''
                    },
                    {
                        respMsg: 'Think of someone you know. Picture them. Wish them well, for their dreams to come true, for them to be happy.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see! Explaining feelings can also help to build a solid foundation. Right from birth explain feelings to your children. Feelings drive behaviour and you can help your child to recognise why they are feeling the way they are. For example, ‘you’re feeling sad because your special cuddly toy can’t be found’. Or I’m is feeling a bit cross today because the washing machine broke, and we can’t get our clothes clean and it’s a problem that I need to get fixed.',
                        predict: ''
                    },
                    {
                        respMsg: 'Encourage children to recognise their own emotion and also to think about how others might be feeling – this is called empathy. By talking about feelings and asking questions about emotions children will start to learn themselves and how their response to people affects how other people feel.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Talking about emotions with others can be an effective way to deal with them. So be available to chat with your children. Listen carefully to what they have to say. Offer comfort where you can.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure! Sometimes it can be helpful to explain what you are feeling and why – ‘right now I am feeling really frustrated and cross because I’ve asked you three times to put your shoes on so that we can go to the shops and you still haven’t done this.’',
                        predict: ''
                    },
                    {
                        respMsg: 'Take a moment to transcend concepts. Just sit and feel what it’s like to be you.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sometimes children’s venting, crying, silence, or quarrelling represent their first steps toward coming to terms with their emotions.',
                        predict: ''
                    },
                    {
                        respMsg: 'We often get hung up on bad habits and behaviours we don’t like and forget to praise the good stuff. Remembering to praise your child when they do something well or behave well is easily overlooked but can drive good self-esteem and confidence in children far more effectively than telling them off.',
                        predict: ''
                    },
                    {
                        respMsg: 'How have you been this week?',
                        predict: ''
                    },
                    {
                        respMsg: 'How was yesterday for you and the family?',
                        predict: ''
                    },
                    {
                        respMsg: 'I’ve had a good day today because I’m talking to you! How do you feel now?',
                        predict: ''
                    },
                    {
                        respMsg: 'Sometimes we need to help children to find different ways to deal with their emotions.  Acknowledge their feelings, I know you are feeling angry because…… and then try to direct them to a more positive way of letting this out – e.g. running around in the park and shouting at the trees rather than at another child.',
                        predict: ''
                    },
                    {
                        respMsg: 'If you think your child is working up to a tantrum, find something to distract them with straight away. This could be something you can see out of the window. For example, you could say, "Look! A cat". Make yourself sound as surprised and interested as you can.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! Losing your temper or shouting back won\'t end a tantrum. Ignore the looks you get from people around you and concentrate on staying calm.',
                        predict: ''
                    },
                    {
                        respMsg: 'Focusing on what you can do and what is going well which will improve your sense of emotional wellbeing.',
                        predict: ''
                    },
                    {
                        respMsg: 'What does it feel like to be you?',
                        predict: ''
                    },
                    {
                        respMsg: 'Take a moment to lean in, be curious, how does it feel to feel what I feel right now? Be kind.',
                        predict: ''
                    },
                    {
                        respMsg: 'Nobody picked their brain. It’s okay to feel how you feel. It’s okay for others to feel how they feel. Take a moment to ponder on where thoughts come from. Did you know you were going to think something before you thought it?',
                        predict: ''
                    },
                    {
                        respMsg: 'Being active, cutting back on alcohol and making sure we have a healthy balanced diet can help boost your mood, and help our wellbeing.',
                        predict: ''
                    },
                    {
                        respMsg: 'Now is a good time to tell your friends and family that you love them. PS: I love you.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay! I can also answer questions. Maybe you’re interested in some of these… \n\nWhat is emotional wellbeing?\n\nWhat does emotional wellbeing mean to me and my child?\n\nHow do I know that my child is developing good emotional wellbeing?',
                        predict: '["What is emotional wellbeing?", "What does emotional wellbeing mean to me and my child?", " How do I know that my child is developing good emotional wellbeing?"]'
                    },
                    {
                        respMsg: 'I can also answer questions. Here’s some you can ask: \n\nCan people with mental health problems be emotionally well? \n\n What do I do if I feel I am not coping emotionally?\n\nHow do I learn what makes me feel good?',
                        predict: '["Can people with mental health problems be emotionally well?", "What do I do if I feel I am not coping emotionally?", "How do I learn what makes me feel good?"]'
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nWhat is a Tantrum?\n\nWhy do Toddlers have Tantrums? \n\nHow do I Prevent Tantrums?',
                        predict: '["What is a Tantrum?", "Why do Toddlers have Tantrums?", "How do I Prevent Tantrums?"]'
                    },
                    {
                        respMsg: 'Okay, I see! You can also ask me questions. Here’s some: \n\n When do tantrums become a worry?\n\n What is attachment?',
                        predict: '["When do tantrums become a worry?", "What is attachment?"]'
                    },
                    {
                        respMsg: 'Okay! As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nHow do I manage multiple children with different wellbeing needs?\n\nCan we change whether we are a cup half full or half empty person?',
                        predict: '["How do I manage multiple children with different wellbeing needs?", "Can we change whether we are a cup half full or half empty person?"]'
                    },

                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter10: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 10! This is all about oral health. How do you feel about this, user name?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap10,
                targetMsgArr: [
                    {
                        respMsg: 'I see! Tooth decay, also known as dental decay or dental caries, is a major problem for children. Most cases of tooth decay could be prevented by cutting down on sugar, as well as brushing teeth with fluoride toothpaste.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand. Dental decay hurts, treatment is not pleasant, and you can help to avoid this for your children. Every parent, no matter who, needs to be mindful of taking care of their children’s teeth.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thanks for telling me! If sugary foods or drinks are consumed frequently during a day, there are more "acid attacks" on the teeth. The hard-outer layers of the teeth dissolve away leading to cavities (holes) in the teeth. These need to be filled otherwise the tooth becomes infected and will need to be removed.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, okay 😊 Create a family habit of tooth brushing twice a day for 2 minutes each time. Before bed is the most important time and at one other time of day – this should be a time that works for you and your family.',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand, thank you for telling me, user name! 😊 Always supervise toothbrushing to help make sure that all teeth are brushed properly and so that toothpaste is used in small amounts and is not consumed.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand – thank you! Fluoride is a mineral which helps to prevent tooth decay, and so it’s often added to toothpaste. Check that the toothpaste you buy for your family has between 1000 parts per million fluoride (written as ppmf) and 1450 ppmf.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s interesting, thank you for telling me 😊 Children should see their dentist at least once a year. Start taking your child to the dentist as soon as their first milk teeth appear. All children, even if they have no teeth yet, should be taken to see a dentist by the time they reach 12 months when they reach 12 months.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I see. Taking children to the dentist from as soon as their teeth emerge, or by the age of 12 months if no teeth have appeared, means any problems can be spotted and prevented or dealt with early.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, I understand. Not all children like having their teeth brushed, so you may have to keep trying. Make it into a game or brush your own teeth at the same time and then help your child finish their own.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you 😊 Some babies seem to find cutting teeth much easier than others, or it may vary for tooth to tooth. Either way teething can be quite distressing for all involved. Don’t worry it is entirely normal for babies to have a few more unsettled days as each tooth cuts through. Remember, teething is not an illness and so if baby has a temperature or appears unwell in any other way then please call your doctor or visit NHS 111.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you for telling me 😊 Tooth brushing should just be a regular part of everyday – twice for around 2 minutes each time. If they are small you may find it easier to stand or sit behind your child, cradling their chin in your hand so you can reach their top and bottom teeth more easily.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, I see 😊 If you offer children plain water from the start that is what they will expect to drink and anything else can be a treat. Once you start offering squashes and other drinks, water will become less attractive and so make it easy for yourself and don’t offer these at home. Keep squashes and fizzy drinks for treats or parties.',
                        predict: ''
                    },
                    {
                        respMsg: 'Ah I understand! During mealtimes, offer water from an open or free-flow cup. Using an open cup, or a free-flow cup without a valve, will helps babies learn to drink and is better for your baby’s teeth. If your baby is younger than 6 months, it’s important to sterilise the water by boiling it first and then letting it cool right down.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, thank you! Start right from the very beginning and keep sugar intake to a minimum to help set food preferences for less sweet foods and build good dietary habits for life. Limiting sugar is not being strict or mean – it’s being kind and the best parent that you can be.',
                        predict: ''
                    },
                    {
                        respMsg: 'Sure, thank you 😊 Here’s a top tip…swap high sugar breakfast cereals for a 50:50 mix with a sugar free cereal or wholemeal toast, crumpets, bagels, plain yogurt with fruit or porridge with berries. At weekends, try scrambled or poached eggs on toast for a tasty alternative.',
                        predict: ''
                    },
                    {
                        respMsg: 'I see, thank you 😊 Instead of cakes, pastries, biscuits or sweets, try a plain scone, bread sticks, fruit and vegetable sticks, oat or rice cakes with a small amount of peanut butter, sliced banana, cheese or humus.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand 😊 Children tend to copy behaviour - so if they see you choosing to eat less sugary food and drinks they will too.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s very common 😊 I can also answer questions. Maybe you’re interested in some of these… \n\nDo I have to clean my baby’s teeth?\n\nShould I clean my children’s teeth for them?\n\nHow much toothpaste should I use?',
                        predict: '["Do I have to clean my baby’s teeth?", "Should I clean my children’s teeth for them?", "How much toothpaste should I use?"]'
                    },
                    {
                        respMsg: 'Most people say something similar! I can also answer questions. Here’s some you can ask: \n\nWhen should I first take my child to the dentist?\n\nWhich teething gel can I use?\n\nWhen can I give my baby juice?',
                        predict: '["When should I first take my child to the dentist?", "Which teething gel can I use?", "When can I give my baby juice?"]'
                    },
                    {
                        respMsg: 'I like how you think, user name! I can also answer questions. Here’s some you can ask: \n\nIs it bad to put juice into bottles?\n\nWhen should I register my baby with a dentist? \n\nCan I prevent tooth decay?',
                        predict: '["Is it bad to put juice into bottles?", "When should I register my baby with a dentist?", "Can I prevent tooth decay?"]'
                    },
                    {
                        respMsg: 'Can you tell me more?',
                        predict: ''
                    },
                    {
                        respMsg: 'I love trying to understand you, user name. Could you tell me more?',
                        predict: ''
                    },
                    {
                        respMsg: 'Babies and children should go to the dentist with you whenever you go for check-ups so that they get used to the noises, smells and surroundings and prepare them for future visits.',
                        predict: ''
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nIs it bad to put juice into bottles?\n\nWhen should I register my baby with a dentist? \n\nCan I prevent tooth decay?',
                        predict: '["Is it bad to put juice into bottles?", "When should I register my baby with a dentist?", "Can I prevent tooth decay?"]'
                    },
                    {
                        respMsg: 'You can also ask me questions. Here’s some: \n\nCan I use a fluoride toothpaste?\n\nWhen should my baby develop teeth?\n\nWhere can I get help and advice for oral health?',
                        predict: '["Can I use a fluoride toothpaste?", "When should my baby develop teeth?", "Where can I get help and advice for oral health?"]'
                    },
                    {
                        respMsg: 'As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nWhat is tooth decay?\n\nWhy does tooth decay matter? \n\nDoes sugar cause tooth decay?',
                        predict: '["What is tooth decay?", "Why does tooth decay matter?", "Does sugar cause tooth decay?"]'
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nWhy do children get 2 sets of teeth?\n\nDo teething rings work?\n\nWhere do I buy a teething gel and other remedies?',
                        predict: '["Why do children get 2 sets of teeth?", "Do teething rings work?", "Where do I buy a teething gel and other remedies?"]'
                    },
                    {
                        respMsg: 'You can also ask me questions. Here’s some: \n\nHow can I comfort my teething baby?\n\nWhat age do children lose baby teeth?\n\nHow should I clean my child\'s teeth?',
                        predict: '["How can I comfort my teething baby?", "What age do children lose baby teeth?", "How should I clean my child\'s teeth?"]'
                    },
                    {
                        respMsg: 'As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\n What sort of brush should children use?\n\nWhich baby drinks are best? \n\nAre baby foods sugary?',
                        predict: '["What sort of brush should children use?", "Which baby drinks are best?", "Are baby foods sugary?"]'
                    },

                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter11: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 11, user name! How do you feel about sustainable eating?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap11,
                targetMsgArr: [
                    {
                        respMsg: 'I see! Sustainable eating means choosing a healthy balanced diet that meet the needs of you and your family members, while limiting impact on the environment around us. What do you think about that?',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand. We all have our own food routines and grow, buy, store, cook and waste food differently but everyone can probably make a few changes here and there to help the planet. What can you think of?',
                        predict: ''
                    },
                    {
                        respMsg: 'Thanks for telling me! Providing more sustainable food in your child’s early years can play an important part towards helping meet their needs today without compromising their future needs.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, okay 😊 To help avoid potentially irreversible damage to the plant and ensure that everyone can eat healthily by 2050, the world wide consumption of foods such as red meat and sugar needs to fall by about 50% and at the same time, the amount of fruit, vegetables, nuts, beans and pulses eaten will need to double. What do you think?',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand, thank you for telling me, user name! Reports are that half of adults in the UK want to consider dietary changes to reduce impact on global warming, however many of us still eat meat every day. It’s hard to change a lot of thing quickly and so an approach you are more likely to succeed at is to choose a couple of small changes and stick to those.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay 😊 Planning meals and avoiding over buying of food would mean less waste and that would help the planet too!',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s interesting, thank you for telling me 😊 The food that children eat in their early years not only has an impact on the health of the child eating it but also on the health of the planet. Sustainable food is about food culture and how decisions made about growing, buying, storing, cooking and wasting food today will impact future generations.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I see. Locally grown food in season tend to be less expensive than food that is flown in from another country. It’s more sustainable too. Another tip is to go to a food market towards the end of the day – you may not always get the food you had decided to buy but you are more likely to get a good deal on the price. Store holders don’t want to be left with unsold food at the end of the day as it is simply going to perish and go to waste.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, I understand. One of the best things you can do when feeding you and your child is to try and waste less food and drink.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you 😊 Wasted food and drink, regardless of its source, is harmful to the environment because of all the land, water and energy used in its production as well as the release of potent greenhouse gases (methane) by decomposing organic matter in landfill.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s very common 😊 Embrace car-free living! Walking can easily be done from your home rather than driving to a venue. You and your child can walk around the local area without the need for transportation.',
                        predict: ''
                    },
                    {
                        respMsg: 'I like how you think, user name! 😊',
                        predict: ''
                    },
                    {
                        respMsg: 'Can you tell me more?',
                        predict: ''
                    },
                    {
                        respMsg: 'I love trying to understand you, user name. Could you tell me more?',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s very common 😊 I can also answer questions. Maybe you’re interested in some of these… \n\nAm I supposed to buy organic food for my child? \n\nIs it better not to consume meat? \n\nWhat is sustainable eating?',
                        predict: '["Am I supposed to buy organic food for my child?", "Is it better not to consume meat?", "What is sustainable eating?"]'
                    },

                    {
                        respMsg: 'Most people say something similar! I can also answer questions. Here’s some you can ask: \n\nWhy do we need sustainable diets?\n\nIs a sustainable diet a healthy diet?\n\nI sometimes throw away food - does that really matter?',
                        predict: '["Why do we need sustainable diets", "Is a sustainable diet a healthy diet?", "I sometimes throw away food - does that really matter?"]'
                    },
                    {
                        respMsg: 'I like how you think, user name! I can also answer questions. Here’s some you can ask: \n\nWhy is it important to achieve a balance between energy intake and energy needs?\n\nDo sausages and bacon count as red meat?\n\nAre eggs ok to eat?',
                        predict: '["Why is it important to achieve a balance between energy intake and energy needs?", "Do sausages and bacon count as red meat?", "Are eggs ok to eat?"]'
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nWhat we need to eat more of to work towards eating a sustainable diet?\n\nIf I switch to a more sustainable diet, will my child get enough protein to grow and develop?\n\nWhat foods contain iron?',
                        predict: '["What we need to eat more of to work towards eating a sustainable diet?", "If I switch to a more sustainable diet, will my child get enough protein to grow and develop?", "What foods contain iron?"]'
                    },
                    {
                        respMsg: 'You can also ask me questions. Here’s some: \n\nI’ve heard young children shouldn’t have too much dietary fibre? \n\nWhat is a plant-based food?\n\nI thought that milk was a great food to give to my child?',
                        predict: '["I’ve heard young children shouldn’t have too much dietary fibre?", "What is a plant-based food?", "I thought that milk was a great food to give to my child?"]'
                    },
                    {
                        respMsg: 'As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nCheese is a dairy product. Where does cheese fit in with a sustainable diet?\n\nIs it OK to feed plant based ‘milks’ to my child?\n\nWhat fish can I buy to feed to my child eat when following a sustainable diet?',
                        predict: '["Cheese is a dairy product. Where does cheese fit in with a sustainable diet?", "Is it OK to feed plant based ‘milks’ to my child?", "What fish can I buy to feed to my child eat when following a sustainable diet?"]'
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nYou can also ask me questions. Here’s some: \n\nHow much fish should I give to my toddler?\n\nDo I need to cut sugar for a sustainable diet? \n\nWith sustainability in mind, what should I give my child to drink?',
                        predict: '["How much fish should I give to my toddler?", "Do I need to cut sugar for a sustainable diet?", "With sustainability in mind, what should I give my child to drink?"]'
                    },
                    {
                        respMsg: 'As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nHow should I cook fish that are more sustainable?\n\nHow much fish should we eat?\n\nHow much fish should I give to my baby when I am weaning?',
                        predict: '["How should I cook fish that are more sustainable?", "How much fish should we eat?", "How much fish should I give to my baby when I am weaning?"]'
                    },

                    {
                        respMsg: 'As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nWhat about 5-a-day and sustainable eating?\n\nShould I avoid any fruits and vegetables in a more sustainable diet?\n\nWhat about frozen food – is that a more sustainable way of keeping food?',
                        predict: '["What about 5-a-day and sustainable eating?", "Should I avoid any fruits and vegetables in a more sustainable diet?", "What about frozen food – is that a more sustainable way of keeping food?"]'
                    },
                    {
                        respMsg: 'As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nWhat’s the definition of ‘local food’?\n\nWhat Is organic food, and should I buy this?\n\nHow can I make my home meals more sustainable?\n\nDo I have to become Vegetarian or Vegan to have a sustainable diet?',
                        predict: '["What’s the definition of ‘local food’?", "What Is organic food, and should I buy this?", "How can I make my home meals more sustainable?", "Do I have to become Vegetarian or Vegan to have a sustainable diet?"]'
                    }

                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    },
    chapter12: {
        welcome: {
            1: {
                text: 'Welcome to Chapter 12! This is all about making food fun 😊 What do you think about that, user name?',
                predict: '',
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        },
        randomConvo: {
            1: {
                func: randomRespOfChap12,
                targetMsgArr: [
                    {
                        respMsg: 'I see! As children grow older having a fun relationship with food will help them to maintain a healthy balanced diet and enjoy eating the nourishing meals that provide all their nutrition. How does that sound to you?',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I understand. Sitting down together for a meal whenever you can is a great way to connect with your family.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thanks for telling me! Eating together as a family can be hard so try to do the best that you can. Try to have a parent or carer sit with the children at meals times, and whenever you can share the same foods. You are the best role model your children have for a healthy balanced diet.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, okay 😊 Even if your little one is not talking yet chatting during mealtime is important. Chat to your baby/infant and encourage them to respond with sounds or smiles.',
                        predict: ''
                    },
                    {
                        respMsg: 'I understand, thank you for telling me, user name! There are lots of things that kids can get involved with in the kitchen. There will be a few spills and kids are great at creating mess, but there will also be lots of laughs and precious memories created together.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay 😊 Have recent mealtimes been fun?',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s interesting, thank you for telling me 😊 Kids love to dip their foods. Whip up a quick dip for veggies with yogurt and seasonings such as herbs or garlic. Serve with raw vegetables like broccoli, carrots, or cauliflower. Fruit chunks go great with a yogurt and cinnamon or vanilla dip.',
                        predict: ''
                    },
                    {
                        respMsg: 'Okay, I see. Adventurous eaters aren’t born, they become that way with practice.  The trick is to start with healthy eating habits right from the start.',
                        predict: ''
                    },
                    {
                        respMsg: 'Right, I understand. Remember you are your child’s best role model, so sit together and share family meals, try new foods together and talk about them.',
                        predict: ''
                    },
                    {
                        respMsg: 'Thank you 😊 Here’s a tip: Talk everything through with your child and talk about all the ingredients you are using, ask where it grows (if using fruits or vegetables).',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s very common 😊 When you cook, you use all your senses! How many fun activities can boast this achievement?',
                        predict: ''
                    },
                    {
                        respMsg: 'I like how you think, user name! These are 10 benefits for cooking with your kid: \n\n1) Increases language development\n\n2) Enhances fine motor skills\n\n3) Increases math ability\n\n4) Improves reading skills (in older children)\n\n5) Introduces kids to scientific concepts\n\n6) Increases focus and attention\n\n7) Teaches life skills\n\n8) Promotes healthy eating\n\n9) Boosts self-confidence\n\n10) Encourages family bonding.',
                        predict: ''
                    },
                    {
                        respMsg: 'Can you tell me more?',
                        predict: ''
                    },
                    {
                        respMsg: 'I love trying to understand you, user name 😊. Could you tell me more?',
                        predict: ''
                    },

                    {
                        respMsg: 'Lettuce or other salad greens don’t need much space and are surprisingly easy to grow indoors – you don’t even need a pot – pierce a plastic bag with a few holes sin the bottom for drainage, fill with compost and sew your seeds. Just remember to sit the bag on a tray or bowl to catch excess water.',
                        predict: ''
                    },
                    {
                        respMsg: 'Pre-schoolers who play with their food are more likely to try new things and eat a more varied diet.',
                        predict: ''
                    },
                    {
                        respMsg: 'It is thought that children who are comfortable getting messy at the table are less likely to develop food neophobia (or fear of tasting new things). Fussy eaters may also be more relaxed about food when they are involved in something messy like food art, where kids make pictures on their plate using their food.',
                        predict: ''
                    },
                    {
                        respMsg: 'Each mouthful of food sounds very different as we eat it. Ask children to think about what they can hear as they munch their dinner?',
                        predict: ''
                    },
                    {
                        respMsg: 'Like adults, children will be more interested in food that looks nice, or in their case fun. Even simple things like using cutters to make sandwiches of toast in different shapes can make these more appealing to eat.',
                        predict: ''
                    },
                    {
                        respMsg: 'Create a face out of the foods in a mealtime, or as they get older, they can do this themselves.',
                        predict: ''
                    },
                    {
                        respMsg: 'Dry foods such as breakfast cereals, pasta shapes, beans and lentils or even raisins are great to create a collage. Paint a sheet of paper as a background and then use glue to stick the foods on to create a food collage.',
                        predict: ''
                    },
                    {
                        respMsg: 'A Healthy Diet is one that nurtures your child, providing all the nutrition they need everyday and giving them the life skills that they need as they grow older to select, prepare and eat their own healthy balanced diet. Making food a core part of everyday life will help your child to set goof habits for life.',
                        predict: ''
                    },
                    {
                        respMsg: 'That’s very common 😊 I can also answer questions. Maybe you’re interested in some of these… \n\nHow can I get my child cooking?\n\nHow Can Cooking Help Pre-schoolers?\n\nDoes cooking help children to try new foods?',
                        predict: '["How can I get my child cooking?", "How Can Cooking Help Pre-schoolers?", "Does cooking help children to try new foods?"]'
                    },
                    {
                        respMsg: 'Most people say something similar! I can also answer questions. Here’s some you can ask: \n\nWhat can Pre-schoolers do in the Kitchen?\n\nHow do I make mealtime fun? \n\nIs eating with your hands OK?',
                        predict: '["What can Pre-schoolers do in the Kitchen?", "How do I make mealtime fun?", "Is eating with your hands OK?"]'
                    },
                    {
                        respMsg: 'I like how you think, user name! I can also answer questions. Here’s some you can ask: \n\nDo I really need to make food into artworks? \n\nWhat art can we do with a pen and pencils or crayons?\n\nWhat are fun ways to present foods?',
                        predict: '["Do I really need to make food into artworks?", "What art can we do with a pen and pencils or crayons?", "What are fun ways to present foods?"]'
                    },
                    {
                        respMsg: 'I’m only a robot but I do know the answers to some questions! Here’s some you could ask: \n\nHow can I make meals colourful? \n\nHow do I get my toddler to eat a wider range of foods?\n\nHow do I get my baby/kids to eat vegetables?',
                        predict: '["How can I make meals colourful?", "How do I get my toddler to eat a wider range of foods?", "How do I get my baby/kids to eat vegetables?"]'
                    },
                    {
                        respMsg: 'You can also ask me questions. Here’s some: \n\nAre there any fun food sessions that we can go to?\n\n Why make food fun – surely it’s just food?',
                        predict: '["Are there any fun food sessions that we can go to?", "Why make food fun – surely it’s just food?"]'
                    },
                    {
                        respMsg: 'As well as having a chat with you, I can also answer questions you may have. These are some you can ask me about: \n\nIs it easy to cook with kids? \n\nWhat about growing food with kids?',
                        predict: '["Is it easy to cook with kids?", "What about growing food with kids?"]'
                    },
                ],
                nextPath: {
                    master: "randomConvo",
                    branch: 1
                }
            }
        }
    }
}

async function getRandmonMsgList(chapterName){
    
    return unirest
    .get(API_URL+'randomMsg/msgListByChapter?chapterType='+chapterName)
    // .headers({'Content-Type': 'application/json'})
    // .send({ 
    //     "faq": userMsg,
    // })
    .then(async(response) => {
        // console.log(response.body)
        return response.body.msgData
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = obj;
// module.exports = setName;