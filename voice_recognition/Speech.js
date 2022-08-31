var textBox = document.querySelector("textarea");
var startBtn = document.querySelector("#start-btn");
var stopBtn = document.querySelector("#stop-btn");

var wbln="";
var content = "";
var s="";//for special functions

var speechRecognitionIsOn = false;

var speechRecognition =window.webkitSpeechRecognition
var recognition = new speechRecognition();

recognition.continuous = false // used to ret cont. res

recognition.onstart = () => {

    if(content.length){
        content = ''
    }
}

recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    content += transcript;
    textBox.value = content;

    if(content.includes("search")){
        s=content.slice(6); 
       window.open("https://www.google.co.in/search?q="+s);
    }


    if(content.includes("what's")){
        s=content.slice(6); 
       wbln=window.open("https://www.google.co.in/search?q="+s);

    }
    
	 if(content.includes("stop")){
        speechRecognitionIsOn = false;
        recognition.stop();
        textBox.value = "THANK YOU FOR USINIG THIS......"
    }

    if(content.includes("close")){
        wbln.close(); 
         }

	 if(content.includes("play")){
        s=content.slice(4); 
        wbln=window.open("https://www.youtube.com/search?q="+s);
    }
    
    
    if(content.includes("clear")){
       content=''
       textBox.value = content; 
        }

        if(content.includes("exit")){
            window.close(); 
             }
             
             
    if(content.includes("open")){
        if(content.includes("Word")){
           wbln=window.open("https://docs.google.com/document/u/0/?tgif=d");
        }
        if(content.includes("Excel")){
            wbln=window.open("https://docs.google.com/spreadsheets/u/0/?tgif=d");
        } 
        if(content.includes("PowerPoint")){
            wbln=window.open("https://docs.google.com/presentation/u/0/?tgif=d"); 
        } 
        if(content.includes("forms")){
            wbln=window.open("https://docs.google.com/forms/u/0/?tgif=d");
        }
    } 
    if(content.includes("find")){
        s=content.slice(4);
        window.open("https://www.google.com/maps/search/"+s);
    }
}
recognition.onaudioend = () => {
    textBox.value = "Audio has ended";
}
recognition.onerror = (e) => {
    console.log(e)
    textBox.value = "Speech not recognized !!!!\n"
}

recognition.onend = () => {
    if(speechRecognitionIsOn){
        recognition.start();
    }  
}

startBtn.addEventListener('click',() => {
    speechRecognitionIsOn = true;
    textBox.value = "voice recognition started\n";
    recognition.start();
});
stopBtn.addEventListener('click',() => {
    speechRecognitionIsOn = false;
    recognition.stop();
    textBox.value = "THANK YOU......";
});