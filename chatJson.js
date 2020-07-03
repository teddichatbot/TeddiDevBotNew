
let nextMaster = '';
let nextBranch = '';
let botReply = '';

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
    // if(arr.indexOf(userMsg) != -1){
    //     botReply = 'Correct 😊 Ideally all babies should be exclusively breastfed for the first six months of life. Breastfeeding should ideally also carry on during the second six months, through weaning and beyond. How does that sound?';
    //     botReply += '#&@#'
    //     nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    //     nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    // }else{
    //     botReply = 'Ideally all babies should be exclusively breastfed for the first six months of life. Breastfeeding should ideally also carry on during the second six months, through weaning and beyond. How does that sound?';
    //     botReply += '#&@#'
    //     nextMaster = obj[chapterType][mainMaster][mainBranch]['nextPath']['master']
    //     nextBranch = obj[chapterType][mainMaster][mainBranch]['nextPath']['branch']
    // }
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

let tempRandomArr = [];
const randomResp5 = async(chapterType,mainMaster,mainBranch,turnContext, userSession)=>{
    // console.log(userSession.breastFeeding.chap1RandomMsgFlag)
    
    let randomArrFlag = userSession.breastFeeding.chap1FlowingFlag;
    let randomMsgFlag = userSession.breastFeeding.chap1RandomMsgFlag;
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
                    // master: "feelMessage",
                    // branch: 1
                    master: "tipsConversation",
                    branch: 10
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
                    // {
                    //     respMsg: 'It’s worth remembering that you can breastfeed, and you are producing enough milk – feel confident! Every baby, and every mum is unique, and you and your baby will get to know each other and develop a pattern of feeds that suit you both. Babies may want to suckle very frequently day and night and that is perfectly normal – they have a tiny tummy and so of course they need to eat little and often.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'One of the challenges of babies is that their needs can change from day to day. Responsive feeding does not follow a set routine but allows both you and baby to feed as often as you want to. Try to stay relaxed, watch for your baby’s cues for when they want a feed (such as rooting for the breast) and feed as often and as long as baby needs.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Breastfeeding takes 4 – 6 weeks to fully establish and during that time baby will need to feed frequently. Be realistic about what you can achieve each day. Set yourself a few small essential tasks and don’t take on too much so that you feel in control and not overwhelmed.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'It is important to learn how to help yourself – no one can do everything, and breastfeeding takes time. It’s important to be kind to yourself and realistic about what you want to manage each day. Set a few small goals that you know you can achieve, and that will help you to feel better. These might be as simple as taking a warm shower or eating a proper hot meal (and if some else cooks it for you – even better!).',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Try to allow yourself plenty of time to get anywhere - babies have a habit or filling their nappies or wanting a feed just as you put your coat on to go somewhere. It’s all part of the fun!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'It may take a little while before you feel confident your baby is getting what they need. Remember that some babies feed quicker than others, and at first it may seem that breastfeeding takes an age, but this will get quicker as you both get the hang of it. Introducing formula feeds will reduce the amount of breast milk you produce and make breast-feeding harder. If you are concerned talk to your Health Visitors, or breast-feeding Advisor before making any changes.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Having a new baby can be very tiring and it’s important that mums make time to eat regularly when breast-feeding not only to feed themselves but also to help make the milk for baby. Try to have regular meals, drinks and snacks during the day. Have a drink every hour or so and eat a meal or nutritious snack every 2-3 hours to help keep you going.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'It’s an amazing thing to have a child and raise it. I’m here to help you. You can ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner. Remember – you can also talk to your health visitor or GP.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Would you like to know about the difference between breast milk and formula/bottle, or about why breastmilk is special? Or, you can ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                    //     predict: '["What is the difference between breast milk and formula/bottle?", "Why is Breastmilk so special?"]'
                    // },
                    // {
                    //     respMsg: 'It’s normal to wonder which breast to give. Each breast works separately and it’s important to remember to feed from both sides. Once baby comes off one breast, offer the second – if they don’t want it that great news, they are full. Or they may want just a little bit more. Then start the next feed on this second side.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'How are you feeling, ',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Remember to drink plenty of water and take time to rest. Try and get help for chores.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'In the early days your baby may want to feed very often. It could be as much as every hour in the first few days and 8 times or more every 24 hours during the first few weeks. Feed your baby as often as they want and for as long as they want. They\'ll begin to have fewer, longer feeds after a few days. It\'s fine to feed your baby whenever they are hungry, when your breasts feel full or if you just want to have a cuddle. Don’t worry it\'s not possible to overfeed a breastfed baby.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Would you like to know about responsive breastfeeding, or about how to burp your baby? You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                    //     predict: '["What is Responsive Breast Feeding?", "How do I burp my baby?"]'
                    // },
                    // {
                    //     respMsg: 'Remember, YOU CAN BREASTFEED! It’s the best choice and great for you and the baby!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Here are some questions I can help you with: \n\n Can I use formula and continue to breastfeed?\n\n Can I put baby rice in the milk bottle?\n\n What is mastitis?\n\n Can I buy a vegan formula milk?\n\n What is cluster feeding?',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Your new baby will look to you for food, comfort and reassurance as they learn about the world. Holding, cuddling, talking to and responding to your baby helps them release hormones that support their brain development, and make them feel secure.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'New babies cannot be spoiled by responding to their needs and breastfed babies cannot be overfed, so you can offer your breast for comfort as well as for food. Cuddling and feeding your baby also helps to keep you calm and allows you to sit, rest and enjoy your baby.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'Focus on eating a healthy balanced diet and try adding in some exercise, such as, brisk walking with the buggy to help shape and tone.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'It’s nice to reflect on how amazing and rewarding it is to raise a child!',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'You can also ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                    //     predict: ''
                    // },
                    // {
                    //     respMsg: 'You’re amazing! I’m here to help and so is your Health Visitor! Ask me a question and I’ll do my best to answer. I’m only a robot so if I can’t help, please provide feedback by selecting the top right-hand corner.',
                    //     predict: ''
                    // },
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
                text: 'Welcome to Giving the Healthiest Start chapter!',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 1
                }
            }
        },
        conv1: {
            1: {
                text: 'Thank you.',
                predict: '',
                nextPath: {
                    master: "conv1",
                    branch: 1
                }
            }
        }
    }
}

module.exports = obj;
// module.exports = setName;