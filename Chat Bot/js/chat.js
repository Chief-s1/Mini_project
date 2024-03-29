var coll = document.getElementsByClassName("collapsible");

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");

        var content = this.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }

    });
}

function getTime() {
    let today = new Date();
    hours = today.getHours();
    minutes = today.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let time = hours + ":" + minutes;
    return time;
}
function firstBotMessage() {
    let firstMessage = "Welcome Swayam"
    document.getElementById("botStarterMessage").innerHTML = '<p class="botText"><span>' + firstMessage + '</span></p>';

    let time = getTime();

    $("#chat-timestamp").append(time);
    document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

function getHardResponse(userText) {
    let botResponse = getBotResponse(userText);

    if(!botResponse){
    botResponse="Sorry I Dont know about That";
    tspch(botResponse);
    } 
    let botHtml = '<p class="botText"><span>' + botResponse + '</span></p>';
    $("#chatbox").append(botHtml);

    document.getElementById("chat-bar-bottom").scrollIntoView(true);
}

function getResponse() {
    let userText = $("#textInput").val();

    if (userText == "") {
        userText = "Welcome CHIEF";
    }

    let userHtml = '<p class="userText"><span>' + userText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

    setTimeout(() => {
        getHardResponse(userText);
    }, 1000)

}

function buttonSendText(sampleText) {
    let userHtml = '<p class="userText"><span>' + sampleText + '</span></p>';

    $("#textInput").val("");
    $("#chatbox").append(userHtml);
    document.getElementById("chat-bar-bottom").scrollIntoView(true);

   }

function sendButton() {
     getResponse();
}

function voice_reco() {

    var content = "";
    var speechRecognition =window.webkitSpeechRecognition
    var recognition = new speechRecognition();
    
    recognition.continuous = false // used to ret cont. res
    recognition.start();
    recognition.onstart = () => {
    
        if(content.length){
            content = ''
        }
    }
    
    recognition.onresult = (event) => {
        let transcript = event.results[0][0].transcript;
        content += transcript;
        buttonSendText(content);
       getHardResponse(content);
    }
    

}
$("#textInput").keypress(function (e) {
    if (e.which == 13) {
        getResponse();
    }
});