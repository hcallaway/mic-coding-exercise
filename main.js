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

// Grab page dimensions
function updatePageDimensions() {
    pageWidth = window.innerWidth;
    pageHeight = window.innerHeight / 3;
}

// Manually call 1st time to have access to dimensions
updatePageDimensions()

// Initiate list of pixel points across page
let xplotPoints = []
// Grab each pixel point and add to array
for (var i = 0; i <= pageWidth; i++) {
    xplotPoints.push(i)
}

let t = 0

// Sine Wave Animation
function animate() {
    // Establish Y coordinate for each x coordinate
    let plotPoints = xplotPoints.map(x => {

        let y = pageHeight + amplitude * Math.sin((x + t) / wavelength)
        
        return [x, y]
    })
    
    // Build SVG path from coordinates
    let path = "M" + plotPoints.map(p => {
        return p[0] + "," + p[1]
    }).join(" L")
    
    // Send SVG path to the DOM
    document.getElementById("wave").setAttribute("d", path)
    
    t += frequency
    
    // Animation
    requestAnimationFrame(animate)
}

// Check for page resize (for establishing page dimensions)
function onResize() {
    updatePageDimensions();
};

animate()