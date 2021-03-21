const defaultFilters = {
    "--blur": [0,"px"],
    "--invert": [0,"%"],
    "--sepia": [0,"%"],
    "--saturate": [100,"%"],
    "--hue": [0,"deg"]
}

const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';

const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg','11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];


let dayTime = ["morning/","day/","evening/","night/"]
let imgIndex = 0;

const filters = document.querySelector('.filters');
const resetButton = document.querySelector(".btn-reset")
const fullScreenButton = document.querySelector(".fullscreen")
const image = document.querySelector("img[alt=image]");
const nextPicture = document.querySelector(".btn-next")



let isMouseDown = false;

function inputHandler(e)
{
    if(isMouseDown)
    {
        if(e.target.type === "range")
        {
            const suff = e.target.dataset.sizing;
            const output = e.target.parentNode.childNodes[3];
            output.value = e.target.value;
            document.documentElement.style.setProperty(`--${e.target.name}`,output.value + suff)
        }
    }
    
}

function resetFilters()
{
    
    for (let filter of filters.childNodes)
    {
        if(filter.nodeName == "LABEL"){
            filter.childNodes[1].value = defaultFilters[`--${filter.childNodes[1].name}`][0]
            filter.childNodes[3].value = defaultFilters[`--${filter.childNodes[1].name}`][0]
        }

    }
    for (let prop in defaultFilters)
    {
        document.documentElement.style.setProperty(prop,defaultFilters[prop].join(''))
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) 
    {
        document.documentElement.requestFullscreen();
    } 
    else {
      if (document.exitFullscreen) 
      {
        document.exitFullscreen();
      }
    }
  }

function getImg()
{
    let source = base; 

    const now = new Date();

    if(now.getHours >= 6 && now.getHours <= 11)
    {
        source += dayTime[0];
    }
    else if(now.getHours >= 12 && now.getHours <= 17)
    {
        source += dayTime[1];
    }
    else if(now.getHours >= 18 && now.getHours <= 23){
        source += dayTime[2];
    }
    else{
        source += dayTime[3];
    }

    const index = imgIndex % images.length;
    source += images[index];
    viewBgImage(source)
    imgIndex += 1;
    nextPicture.disabled = true;
    setTimeout(() => nextPicture.disabled = false, 1000)
}

function viewBgImage(src) 
{  
    const img = new Image();
    img.src = src;
    img.onload = () => {      
       image.src = src;
    }; 
}


window.addEventListener('mousedown', e => isMouseDown = true)
window.addEventListener("mouseup", e => isMouseDown = false)

filters.addEventListener("mousemove", e=> inputHandler(e))

resetButton.addEventListener("click", e => resetFilters())

fullScreenButton.addEventListener("click", e=> toggleFullScreen());

nextPicture.addEventListener("click",e=> getImg())

console.log(1 % images.length)
