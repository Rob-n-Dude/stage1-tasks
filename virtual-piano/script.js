const notes =
{
    a : "assets/audio/a.mp3",
    aSh : "/assets/audio/a♯.mp3",
    b : "assets/audio/b.mp3",
    c : "assets/audio/c.mp3",
    cSh : "assets/audio/c♯.mp3",
    d : "assets/audio/d.mp3",
    dSh : "assets/audio/d♯.mp3",
    e : "assets/audio/e.mp3",
    f : "assets/audio/f.mp3",
    fSh : "assets/audio/f♯.mp3",
    g : "assets/audio/g.mp3",
    gSh : "assets/audio/g♯.mp3",

} 


const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key, .piano-key sharp")


function playAudio (source)
{
    const audio = new Audio();
    audio.src = source;
    audio.currentTime = 0;
    audio.play();
}

piano.addEventListener("click", (e) => {
    if(e.target.classList.value === "piano-key")
    {
        const note = e.target.dataset.note; 
        playAudio(notes[note])
    }
    else if (e.target.classList.value === "piano-key sharp"){
        const note = e.target.dataset.note[0] + "Sh"
        playAudio(notes[note])
    }   
})

window.addEventListener("keydown", (event) => {
        console.log(event.code)
        switch (event.code)
    {
        case "KeyD":
            playAudio(notes["c"])
            break;  
        case "KeyF":
            playAudio(notes["d"])
            break;  
        case "KeyG":
            playAudio(notes["e"])
            break;  
        case "KeyH":
            playAudio(notes["f"])
            break;  
        case "KeyJ":
            playAudio(notes["g"])
            break;  
        case "KeyK":
            playAudio(notes["a"])
            break;  
        case "KeyL":
            playAudio(notes["b"])
            break;  
        case "KeyR":
            playAudio(notes["cSh"])
            break;  
        case "KeyT":
            playAudio(notes["dSh"])
            break;   
        case "KeyU":
            playAudio(notes["fSh"])
            break;  
        case "KeyI":
            playAudio(notes["gSh"])
            break;  
        case "KeyO":
            playAudio(notes["aSh"])
            break;  
        
    }
})