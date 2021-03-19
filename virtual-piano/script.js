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

const main = document.querySelector(".main")
const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key, .piano-key sharp")
const statement = document.querySelector(".btn-container")

let isMouseDown = false;
let currentTarget = "";
let currentStatement = statement.children[0].classList.length === 3 ? "Notes": "Letters";
let currentMouseOverTarget = ""

function refresh(pianoKeys)
{
    for (let elem of pianoKeys)
    {
        elem.classList.toggle("piano-key-active",false)
        elem.classList.toggle("piano-key-active-pseudo",false)
    }
}

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

    if(e.target.classList[0] === "piano-key")
    {
        const note = e.target.dataset.letter; 
        playAudio(notes[note])
        toggleClasses(e.target)
        
    }
}

function MouseUpEventHandler(e)
{
    isMouseDown = false;
    refresh(pianoKeys)
}


function toggleClasses(target)
{
    target.classList.toggle("piano-key-active")
    target.classList.toggle("piano-key-active-pseudo")
}

function keyboardEventHandler(event){
    if(notes.hasOwnProperty(event.code[3]) && event.repeat == false){
        playAudio(notes[event.code[event.code.length-1]])
    }
     
}

piano.addEventListener("mousedown", e => {
    isMouseDown = true;
    currentTarget = e.target.dataset.letter;
    currentEventTarget = e.target;
    mouseEventsHandler(e)
})

main.addEventListener("mouseover", e =>{
    
    if(isMouseDown)
    {   
        if(e.target.classList[0] === "piano-key")
        {
            if(currentTarget != e.target.dataset.letter)
            {
                
                mouseEventsHandler(e)
                currentTarget = e.target.dataset.letter;
    
                toggleClasses(currentEventTarget)
                currentEventTarget = e.target
                lastRelatedTarget = e.relatedTarget

            }
        }
        
        
    }
})

window.addEventListener("mouseup", e => MouseUpEventHandler(e))

window.addEventListener("keydown", (event) => keyboardEventHandler(event))   

statement.addEventListener("click", (e) =>{
    if(e.target.textContent != currentStatement)
    {
        changeStatement()
        currentStatement = e.target.textContent;
        changeDiscription()  
    }

})
