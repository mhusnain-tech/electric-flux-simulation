document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('fluxCanvas');
    const ctx = canvas.getContext('2d');
    const [electricFieldSlider, areaSlider, angleSlider] = 
          ['electricField', 'area', 'angle'].map(id => document.getElementById(id));
    const [fieldValueDisplay, areaValueDisplay, angleValueDisplay] = 
          ['fieldValue', 'areaValue', 'angleValue'].map(id => document.getElementById(id));
    function drawFlux() {
        const E = +electricFieldSlider.value;
        const A = +areaSlider.value;
        const θ = angleSlider.value * Math.PI / 180; // Convert to radians
        const flux = E * A * Math.cos(θ);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw electric field lines
        ctx.strokeStyle = '#00f';
        for (let i = 0; i < 10; i++) {
            ctx.beginPath();
            ctx.moveTo(50 + i * 20, 50);
            ctx.lineTo(50 + i * 20, 350);
            ctx.stroke();
        }// Draw area rectangle
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.save();
        ctx.translate(300, 200);
        ctx.rotate(θ);
        ctx.fillRect(-50, -50, A, A);
        ctx.restore();// Display flux value
        ctx.fillStyle = '#000';
        ctx.font = '20px Arial';
        ctx.fillText(`Electric Flux: ${flux.toFixed(2)}`, 10, 30);
    }
    function updateValues() {
        fieldValueDisplay.textContent = electricFieldSlider.value;
        areaValueDisplay.textContent = areaSlider.value;
        angleValueDisplay.textContent = angleSlider.value;
        drawFlux();
    }
    [electricFieldSlider, areaSlider, angleSlider].forEach(slider => 
        slider.addEventListener('input', updateValues)
    );
    updateValues();
});