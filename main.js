// DOM selectors
const amplitudeSelector = document.getElementById('amplitude');
const waveLengthSelector = document.getElementById('wavelength');
const frequencySelector = document.getElementById('frequency');
const wave = document.getElementById('wave');

// Allow for change to wave Amplitude, Length, Frquency
let amplitude = Number(amplitudeSelector.value);
let frequency = Number(frequencySelector.value);
let wavelength = Number(waveLengthSelector.value);

// Event listeners for wave changes
amplitudeSelector.addEventListener('change', (evt) => {
    amplitude = Number(evt.currentTarget.value);
});

waveLengthSelector.addEventListener('change', (evt) => {
    wavelength = Number(evt.currentTarget.value);
});

frequencySelector.addEventListener('change', (evt) => {
    frequency = Number(evt.currentTarget.value);
});

// Event Listener for  Window Resize
window.addEventListener('resize', onResize);

function updatePageDimensions() {
    pageWidth = window.innerWidth;
    pageHeight = window.innerHeight / 3;
}

updatePageDimensions()


let xplotPoints = []
for (var i = 0; i <= pageWidth; i++) {
    xplotPoints.push(i)
}

let t = 0

function animate() {
    
    let plotPoints = xplotPoints.map(x => {

        let y = pageHeight + amplitude * Math.sin((x + t) / wavelength)
        
        return [x, y]
    })
    
    let path = "M" + plotPoints.map(p => {
        return p[0] + "," + p[1]
    }).join(" L")
    
    document.getElementById("wave").setAttribute("d", path)
    
    t += frequency
    
    requestAnimationFrame(animate)
}

function onResize() {
    updatePageDimensions();
};

animate()