const notes =
{
    K : "assets/audio/a.mp3",
    O : "/assets/audio/a♯.mp3",
    L : "assets/audio/b.mp3",
    D : "assets/audio/c.mp3",
    R : "assets/audio/c♯.mp3",
    F : "assets/audio/d.mp3",
    T : "assets/audio/d♯.mp3",
    G : "assets/audio/e.mp3",
    H : "assets/audio/f.mp3",
    U : "assets/audio/f♯.mp3",
    J : "assets/audio/g.mp3",
    I : "assets/audio/g♯.mp3",

} 

const lettersAll = ["D", "F", "G", "H", "J", "K", "L", "R", "T", undefined, "U", "I", "O"];
const notesAll = ["c", "d", "e", "f", "g", "a", "b", "c♯", "d♯", undefined, "f♯", "g♯", "a♯"];

const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key, .piano-key sharp")
const statement = document.querySelector(".btn-container")

let isMouseDown = false;
let currentTarget = "Notes";
let currentStatement = statement.children[0].classList.length === 3 ? "Notes": "Letters";

function changeStatement()
{
    let active;
    let inActive;
    for (let i = 0; i < 2; i++){
        if(statement.children[i].classList.length == 3)
        {
            active = statement.children[i]
            inActive = i === 0 ? statement.children[1] : statement.children[0]
        }
    }
    active.classList.toggle("btn-active")
    inActive.classList.toggle("btn-active")
}

function changeDiscription()
{
    if(currentStatement == "Notes")
    {
        for(let i = 0; i < pianoKeys.length; i++)
        {
            if(notesAll[i] != undefined)
            {
                pianoKeys[i].dataset.note = notesAll[i]
            }
            
        }
    }
    else{
        for(let i = 0; i < pianoKeys.length; i++)
        {
            if(lettersAll[i] != undefined)
            {
                pianoKeys[i].dataset.note = lettersAll[i]
            }
            
        }
        
    }
}

function playAudio (source)
{
    const audio = new Audio();
    audio.src = source;
    audio.currentTime = 0;
    audio.play();
}

function mouseEventsHandler(e)
{
    isMouseDown = true;
    currentTarget = e.target.dataset.letter;
    if(e.target.classList.value === "piano-key")
    {
        const note = e.target.dataset.letter; 
        playAudio(notes[note])
    }
    else if (e.target.classList.value === "piano-key sharp"){
        const note = e.target.dataset.letter;
        playAudio(notes[note])
    }   
}

function keyboardEventHandler(event){
    if(notes.hasOwnProperty(event.code[3])){
        playAudio(notes[event.code[3]])
    }
     
}

piano.addEventListener("mousedown", e => mouseEventsHandler(e))

piano.addEventListener("mouseup", e => {
    isMouseDown = false;
})

piano.addEventListener("mousemove", e =>{
    if(isMouseDown)
    {   
        if(currentTarget != e.target.dataset.letter)
        {
            if(e.target.classList.value === "piano-key")
            {
                const note = e.target.dataset.letter; 
                playAudio(notes[note])
            }
            else if (e.target.classList.value === "piano-key sharp"){
                const note = e.target.dataset.letter; 
                playAudio(notes[note])
            }
            currentTarget = e.target.dataset.letter;
        }
        
    }

})

window.addEventListener("keydown", (event) => keyboardEventHandler(event))   

statement.addEventListener("click", (e) =>{
    if(e.target.textContent != currentStatement)
    {
        changeStatement()
        currentStatement = e.target.textContent;
        changeDiscription()  
    }

})

