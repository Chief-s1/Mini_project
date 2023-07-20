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

function getBotResponse(content) {
    var s="";

    if (content.includes("hello") ||content.includes("hi") ){
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


    if (content.includes("what can you do") ){
        tspch("I could do Multiple Things to help you. Some Of which are");
        return ("1.Answer Your Queries😉<br>2.Show Weather🌤️<br>3.Play Songs🎶<br>4.Open online Documents📄<br>5.Play Game 🎮<br>6.Find a Location in Map🗺️<br>And Many More 😎");
    }

    if (content.includes("goodbye") ||content.includes("Thank you") ) {
        tspch("Talk to you later!");
        return "Talk to you later!";
    } 
    
    if(content.includes("search")){
        s=content.slice(6); 
        tspch("Searching for"+s);
       window.open("https://www.google.co.in/search?q="+s);
    }

    if(content.includes("your name")){
        tspch("My Name is CHIEF");
        return("My Name is CHIEF");
    }


    if(content.includes("what's")){
        s=content.slice(6); 
        tspch("Searching for"+s);
       window.open("https://www.google.co.in/search?q="+s);
    }
    
	 if(content.includes("play")){
        s=content.slice(4); 
        tspch("Opening Youtube");
        wbln=window.open("https://www.youtube.com/search?q="+s);
    }
    

        if(content.includes("exit")){
            tspch("Thank You For Using Me");
            window.close(); 
             }
             
             
    if(content.includes("open")){
        if(content.includes("Word")){
           window.open("https://docs.google.com/document/u/0/?tgif=d");
        }
        if(content.includes("Excel")){
            window.open("https://docs.google.com/spreadsheets/u/0/?tgif=d");
        } 
        if(content.includes("PowerPoint")){
            window.open("https://docs.google.com/presentation/u/0/?tgif=d"); 
        } 
        if(content.includes("forms")){
            window.open("https://docs.google.com/forms/u/0/?tgif=d");
        }
    } 
    if(content.includes("find")){
        s=content.slice(4);
        window.open("https://www.google.com/maps/search/"+s);
    }



}