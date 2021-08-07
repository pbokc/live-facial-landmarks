import React, {useRef} from 'react'; 
import logo from './logo.svg';
import './App.css';
import Webcam from 'react-webcam'; 
import * as tf from '@tensorflow/tfjs'; 
import * as facemesh from '@tensorflow-models/facemesh';
//import { nextFrame } from '@tensorflow/tfjs';
import { drawPoints } from './utilities'; 

function App() {
  const webcamRef = useRef(null); 
  const canvasRef = useRef(null); 

  const getLandmarks = async () => {
    const nn = await facemesh.load({inputResolution:{width:640,height:480}, scale:0.8,}); 

    setInterval(() => {
      detect(nn);
    }, 5); 
  }; 

  const detect = async (nn) => {
    if (typeof webcamRef.current !== 'undefined' && 
        webcamRef.current !== null && 
        webcamRef.current.video.readyState === 4) {
          const video = webcamRef.current.video; 
          const videoHeight = webcamRef.current.video.videoHeight; 
          const videoWidth = webcamRef.current.video.videoWidth; 

          webcamRef.current.video.height = videoHeight; 
          webcamRef.current.video.width = videoWidth; 

          canvasRef.current.height = videoHeight; 
          canvasRef.current.width = videoWidth; 

          const face = await nn.estimateFaces(video); 
          console.log(face); 

          const cnvs = canvasRef.current.getContext('2d'); 
          drawPoints(face, cnvs);
    }
  };

  getLandmarks(); 

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        style={{
          position: "absolute", 
          marginLeft: "auto", 
          marginRight: "auto", 
          left: 0, 
          right: 0, 
          textAlign: "centr", 
          zIndex: 9,
          width: 640, 
          height: 480
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", 
          marginLeft: "auto", 
          marginRight: "auto", 
          left: 0, 
          right: 0, 
          textAlign: "centr", 
          zIndex: 9,
          width: 640, 
          height: 480
        }}
      />
    </div>
  );
}

export default App;
