function tspch(msg)
{
    var speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = msg;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    speechSynthesis.speak(speech);
}


function getchatans(userMessage){
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const API_KEY = "Chat-Gpt Api Key";
    
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}],
        })
    }
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
       var mssg= data.choices[0].message.content;         
    let botHtml = '<p class="botText"><span>' + mssg + '</span></p>';
    $("#chatbox").append(botHtml);
    tspch(mssg);


    }).catch((error) => {
       console.log(error);
    })
    
}


function getBotResponse(content) {
    var s="";

    if(content.includes("what")||content.includes("how") || content.includes("can") || content.includes("who") || content.includes("are")){
        tspch("Searching for"+content);
        getchatans(content);
        return "Searching..";   
    }
    
    else{

    if (content.includes("hello") ||content.includes("hii") || content.includes("hey") || content.includes("Welcome CHIEF")){
        tspch("Hello there! I'm Your Assistant How Can i Help You Today ?");
        return "Hello there! I'm Your Assistant How Can i Help You Today ?";
    }

    if (content.includes("my name")){
        tspch("Your name is Swayam Manori");
        return "Your name is Swayam Manori";
    }

    if (content.includes("something about me") ){
        tspch("Your name is Swayam Manori You are currently pursuing BTech in Computer Science From  GEHU Dehradun your Current section is C Your Roll Number is 2018808");
        return "Your name is Swayam Manori<br>You are currently pursuing B.Tech in Computer Science From  GEHU Dehradun<Br>your Current section-C<br>Your Roll-NO:2018808";
    }


    if (content.includes("your skills") ){
        tspch("I could do Multiple Things to help you. Some Of which are");
        return ("1.Answer Your Queries😉<br>2.Show Weather🌤️<br>3.Play Songs🎶<br>4.Open online Documents📄<br>5.Play Game 🎮<br>6.Find a Location in Map🗺️<br>And Many More 😎");
    }

    if (content.includes("goodbye") ||content.includes("bye") ) {
        tspch("Talk to you later!");
        return "Talk to you later!";
    } 

    if (content.includes("thank you") ||content.includes("good") ) {
        tspch("I'm Glad that i could help");
        return "I'm glad that i could help";
    } 
    
    if(content.includes("search")){
        s=content.slice(6); 
        tspch("Searching for"+s);
       window.open("https://www.google.co.in/search?q="+s);
       return("Searching...")
    }

    if(content.includes("weather")){
        s=content; 
        tspch("Searching for"+s);
       window.open("https://www.google.co.in/search?q="+s);
       return("Searching...")
    }


    if(content.includes("will")){
        s=content;
        tspch("Searching for"+s);
       window.open("https://www.google.co.in/search?q="+s);
       return("Searching...");
    }

    if(content.includes("your name")){
        tspch("My Name is CHIEF");
        return("My Name is CHIEF");
    }


	 if(content.includes("song")){
        s=content.slice(4); 
        tspch("Opening Youtube");
        wbln=window.open("https://www.youtube.com/search?q="+s);
        return("Searching...");
    }
    

        if(content.includes("exit")){
            tspch("Thank You For Using Me");
            window.close(); 
            return("Thank You")
             }
             
             
    if(content.includes("open")){
        if(content.includes("Word")){
           window.open("https://docs.google.com/document/u/0/?tgif=d");
           return("Opening requested document");
        }
        if(content.includes("Excel")){
            window.open("https://docs.google.com/spreadsheets/u/0/?tgif=d");
            return("Opening requested document");
        } 
        if(content.includes("PowerPoint")){
            window.open("https://docs.google.com/presentation/u/0/?tgif=d"); 
            return("Opening requested document");
        } 
        if(content.includes("forms")){
            window.open("https://docs.google.com/forms/u/0/?tgif=d");
            return("Opening requested document");
        }
    } 
    if(content.includes("find")){
        s=content.slice(4);
        window.open("https://www.google.com/maps/search/"+s);
        return("Searching...");
    }

    if(content.includes("play game")){
        tspch("Which Game do you want to play ?");
        return("1.rock paper scissor 🪨 📄 ✂️<br>2.snakee🐍<br>3.pig game🐷<br>4.number guess🔢");
    }
    
    if(content.includes("snakee")){
        tspch("Opening Snakee");
        window.open("games/Snakee/index.html");
        return("Opening snakee🐍");
    }

    if(content.includes("rock paper scissor")){
        tspch("Opening Rock Paper Scissor");
        window.open("games/rps/index.html");
        return("Opening Rock Paper Scissor 🪨 📄 ✂️");
    }

    if(content.includes("pig game")){
        tspch("Opening pig game");
        window.open("games/pigGame/index.html");
        return("Opening pig game🐷");
    }
    if(content.includes("number guess")){
        tspch("Opening Number Guess");
        window.open("games/numguess/index.html");
        return("Opening number guess🔢");
    }

}

}

