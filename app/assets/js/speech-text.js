window.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("button");
  const result = document.getElementById("result");
  const main = document.getElementsByTagName("main")[0];
  
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
  var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;
  var SpeechSynth = window.speechSynthesis;
  
  var listening = false;
  
  var chart = ['e',
               'f', 'p',
               't', 'o', 'z',
               'l', 'p', 'e', 'd',
               'p', 'e', 'c', 'f', 'd',
               'e', 'd', 'f', 'c', 'z', 'p',
               'f', 'e', 'l', 'o', 'p', 'z', 'd',
               'd', 'e', 'f', 'p', 'o', 't', 'e', 'c',
               'l', 'e', 'f', 'o', 'd', 'p', 'c', 't',
               'f', 'd', 'p', 'l', 't', 'c', 'e', 'o',
               'p', 'e', 'z', 'o', 'l', 'c', 'f', 't', 'd'];
  var charsTested = 0;
  
  var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                 'u', 'v', 'w', 'x', 'y', 'z'];
  var grammar = '#JSGF V1.0; grammar letters; public <letters> = ' + letters.join(' | ') + ' ;'
  
  // Speech recognition
  if (typeof SpeechRecognition !== "undefined") {
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);

    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = "en-IN"
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const stop = () => {
      main.classList.remove("speaking");
      recognition.stop();
      button.textContent = "Start listening";
    };

    const start = () => {
      main.classList.add("speaking");
      recognition.start();
      button.textContent = "Stop listening";
    };
    
    const parseResults = results => {
      return;
    }

    recognition.onresult = event => {
      result.innerHTML = "";
      if (event.results) {
        // Only consider the first result
        const res = event.results[0];
        console.log(res);
        
        // Extract the transcript returned
        const t = res[0].transcript.toUpperCase();
        
        // Check if we need to stop
        // if (t.toLowerCase().split(" ").includes("stop") || charsTested >= chart.length) {
        //   stop();
        //   listening = false;
        //   return;
        // }
        
        // for (const w of t.split(" ")) {
        //   if (w.length != 1) {
        //     recognition.stop();
        //     speak("Please repeat");
        //     recognition.start();
        //     return;
        //   }
        // }

        const text = document.createTextNode(t);
        const p = document.createElement("p");
        if (res.isFinal) {
          p.classList.add("final");
          charsTested += t.length;
          speak(t);
          console.log(t);
        }
        p.appendChild(text);
        result.appendChild(p);
      }
    };

    button.addEventListener("click", event => {
      listening ? stop() : start();
      listening = !listening;
    });
  }
  
  else {
    button.remove();
    const message = document.getElementById("message");
    message.removeAttribute("hidden");
    message.setAttribute("aria-hidden", "false");
  }
  
  // Speak the word for confirmation
  function speak(word) {
    if (SpeechSynth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }
    
    if (word != "") {
      var utterThis = new SpeechSynthesisUtterance(word);
      utterThis.onend = event => {
        console.log("SpeechSynthesisUtterance.onend");
      }
      utterThis.onerror = event => {
        console.log("SpeechSynthesisUtterance.onerror");
      }
      SpeechSynth.speak(utterThis);
      return;
    }
  }
});
