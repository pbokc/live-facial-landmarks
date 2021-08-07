export const drawPoints = (predictions, canvas) => {
    if (predictions.length > 0) {
        predictions.forEach((prediction) => {
            const points = prediction.scaledMesh; 

            for (let i = 0; i < points.length; i++) {
                const x = points[i][0]; 
                const y = points[i][1]; 
                canvas.beginPath(); 
                canvas.arc(x, y, 1, 0, 3 * Math.PI); 
                canvas.fillStyle = 'green'; 
                canvas.fill(); 
            }
        });
    }
};