
let nextMaster = '';
let nextBranch = '';
let botReply = '';
let tempRandomArr = [];
let tempRandomArrOfChap2 = [];

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
        botReply += userSession.userInfo.firstName+'?' ;
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


var obj = {
    introduction: {
        intro:{
            1: {
                text: 'Hello, I’m Teddi! I am your early years robo-support. What is your name? 😉',
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
    }
}

module.exports = obj;
// module.exports = setName;