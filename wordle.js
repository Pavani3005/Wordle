document.addEventListener("DOMContentLoaded", ()=> {
    createSquares();

    let guessedWords=[[]];
    let availableSpaces=1; 
    let wordList = [
        "apple", "brick", "crane", "dance", "earth", "frost", "grain", "hound", "jolly", "knock", 
        "lemon", "mouse", "night", "ocean", "plant", "queen", "river", "stone", "tiger", "unity",
        "vivid", "whale", "xenon", "youth", "zebra", "abide", "beach", "candy", "drake", "eager",
        "fable", "giant", "haunt", "ivory", "joint", "karma", "lucky", "mirth", "nerve", "opera", 
        "piano", "quail", "rumor", "style", "toxin", "upset", "vocal", "wound", "xylem", "yield", 
        "zonal", "acorn", "blaze", "clash", "dealt", "elbow", "flame", "globe", "haven", "input", 
        "jumpy", "karma", "laser", "match", "noble", "orbit", "petal", "quick", "relax", "shark", 
        "twist", "ultra", "vowel", "wrath", "xerox", "yacht", "zesty", "angel", "brace", "charm", 
        "doubt", "eagle", "froze", "great", "human", "ideal", "joker", "kneel", "lunar", "media", 
        "naval", "olive", "polar", "quack", "rapid", "shine", "thorn", "upset", "vivid", "weary", 
        "xenon", "yeast", "zonal", "alien", "bison", "clear", "drift", "enter", "faith", "grape", 
        "hover", "input", "jolly", "knock", "loose", "merge", "noise", "optic", "press", "quest", 
        "rumor", "shift", "torch", "unity", "vowel", "woven", "xenon", "young", "zonal", "amber", 
        "brisk", "chose", "drama", "exact", "flood", "gloom", "hoist", "inbox", "judge", "kneel", 
        "liver", "manor", "nerve", "onion", "pouch", "quake", "rebel", "scent", "toast", "upper", 
        "vivid", "whirl", "xerox", "youth", "zebra", "amuse", "bride", "crazy", "doubt", "every", 
        "flute", "grind", "horse", "ideal", "joker", "kitty", "latch", "mercy", "noise", "orbit", 
        "plume", "quirk", "raise", "shine", "tight", "urban", "vocal", "whale", "xenon", "yeast"
    ];
    
    let word=wordList[Math.floor(Math.random()*wordList.length)];
    //console.log(word);
    let guessedWordsCount=0;
    const keys=document.querySelectorAll(".keyboard-row button");
   
    function getCurrentWordArr(){
        const countGuessedWords= guessedWords.length;
        return guessedWords[countGuessedWords-1];
    }
    function updateGuessedWords(letter){
        const CurrentWordArr= getCurrentWordArr();
        if (CurrentWordArr && CurrentWordArr.length<5){
            CurrentWordArr.push(letter);
            const availableSpaceEl=document.getElementById(String(availableSpaces));
            availableSpaces+=1;
            availableSpaceEl.textContent=letter;

        }
    }

    function createSquares(){
        const gameBoard= document.getElementById("board");

        for (let index = 0; index < 30; index++) {
           let square = document.createElement("div");
           square.classList.add("square");
           square.classList.add("animate__animated")
           square.setAttribute("id", index+1);
           gameBoard.appendChild(square);
        }
    }

    function getTileColor(letter,index){
        const isCorrectLetter= word.includes(letter)
        if(!isCorrectLetter){
            return "rgb(58,58,60)";
        }

        const letterInThatPosition=word.charAt(index);
        const isCorrectPosition=letter===letterInThatPosition;
        if(isCorrectPosition){
            return "rgb(83,141,78)";
        }
        return "rgb(181,159,59)";
    }

    function handleSubmitWord(){
        const CurrentWordArr=getCurrentWordArr();
        if(CurrentWordArr.length !==5){
            window.alert("Word has to be 5 letters!!");
        }
        const currentWord=CurrentWordArr.join('');
        const firstLetterId= guessedWordsCount*5+1;

        const interval=200;
        CurrentWordArr.forEach((letter,index)=>{
            setTimeout(()=>{
                const tileColor=getTileColor(letter,index);
                const letterId=firstLetterId+ index;
                const letterEl=document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style=`background-color:${tileColor};border-color:${tileColor}`;
            },interval*index)
        });
        guessedWordsCount+=1;
        if(currentWord==word){
            window.alert("Congratulations, You WON!!");
            return;
        }
        if(guessedWords.length==6){
            window.alert(`You LOST! The word is ${word}`);
        }
        guessedWords.push([]);
    }
    
    function DeleteLetter(){
        const CurrentWordArr= getCurrentWordArr();
        const removedLetter= CurrentWordArr.pop();
        guessedWords[guessedWords.length-1]=CurrentWordArr;
        const lastletterEl=document.getElementById(String(availableSpaces-1));
        lastletterEl.textContent='';
        availableSpaces-=1;
    }

    for (let i = 0; i < keys.length; i++) {
        keys[i].onclick= ({target}) => {
            const letter= target.getAttribute("data-key");

            if(letter=='enter'){
                handleSubmitWord()
                return;
            }
            if (letter=='del'){
                DeleteLetter();
                return;
            }
            updateGuessedWords(letter)
        };
    }
})
