const defaultFilters = {
    "--blur": [0,"px"],
    "--invert": [0,"%"],
    "--sepia": [0,"%"],
    "--saturate": [100,"%"],
    "--hue": [0,"deg"]
}

const filters = document.querySelector('.filters');
const resetButton = document.querySelector(".btn-reset")

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


window.addEventListener('mousedown', e => isMouseDown = true)
window.addEventListener("mouseup", e => isMouseDown = false)

filters.addEventListener("mousemove", e=> inputHandler(e))

resetButton.addEventListener("click", e => resetFilters())