const canvas = document.querySelector('#canvas1');
const file = document.querySelector('#fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.globalCompositeOperation = 'destination-over'
let audioSource;
let analyser;
let volumeMeter;


file.addEventListener('change', function(){
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    const audioContext = new AudioContext();
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();

    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
///
    const pcmData = new Float32Array(analyser.fftSize);

    console.log(dataArray);

    const barWidth = canvas.width/bufferLength;
    let barHeight;
    let x;

    function animate2(){
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);

        analyser.getFloatTimeDomainData(pcmData);

        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray, pcmData);
        drawVisualiser2(bufferLength, x, barWidth, barHeight, dataArray, pcmData);
        drawVisualiser3(bufferLength, x, barWidth, barHeight, dataArray, pcmData);

        requestAnimationFrame(animate2);
    }
    animate2();

})

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray, pcmData){
    for(let i = 0; i < bufferLength; i++){

        let sumSquares = 0.0;
        for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
        volumeMeter = (Math.sqrt(sumSquares / pcmData.length))


        barHeight = (Math.pow(dataArray[i],volumeMeter+0.7))/2;
        // barHeight = (Math.pow(dataArray[i],pcmData[i]+1))/2;

        let hue = barHeight+i
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);


        ctx.rotate(i+(bufferLength + (Math.sqrt(5)) / 2));
        ctx.fillStyle = 'hsl(' + hue + ',100%,' + (Math.sqrt(bufferLength)) + '%)';
        ctx.fillRect(0, 0, barWidth, barHeight)
        x += barWidth;
        ctx.restore();
        
    }
}

function drawVisualiser2(bufferLength, x, barWidth, barHeight, dataArray, pcmData){
    for(let i = bufferLength; i > 10; i--){

        let sumSquares = 0.0;
        for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
        volumeMeter = (Math.sqrt(sumSquares / pcmData.length))


        barHeight = (Math.pow(dataArray[i],volumeMeter+0.7))/2;

        // let hue = i*(Math.pow(volumeMeter+16, 1.02))
        let hue = i*17
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);


        ctx.rotate(i+(volumeMeter + (Math.sqrt(5)) / 2));
        ctx.fillStyle = 'hsl(' + hue + ',100%,' + '50%)';
        ctx.fillRect(0, 0, barWidth*2, barHeight)
        x += barWidth;
        ctx.restore();
        
    }
}


function drawVisualiser3(bufferLength, x, barWidth, barHeight, dataArray, pcmData){

for(let i = 0; i < bufferLength*0.9; i++){

    let sumSquares = 0.0;
    for (const amplitude of pcmData) { sumSquares += amplitude*amplitude; }
    volumeMeter = (Math.sqrt(sumSquares / pcmData.length))


    barHeight = Math.sqrt(dataArray[i]*(volumeMeter+1))

    // let hue = i*(Math.pow(volumeMeter+16, 1.02))
    let hue = i*200
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);


    ctx.rotate(i+(1 + (Math.sqrt(5)) / 2));
    ctx.fillStyle = 'hsl(' + hue + ',100%,' + '20%)';
    ctx.fillRect(x, 0, barWidth*2, barHeight)
    x += barWidth;
    ctx.restore();
    
}
}