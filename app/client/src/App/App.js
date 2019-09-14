import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../../public/logo.svg'
import './App.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
//import 'react-html5-camera-photo/build/css/index.css';


 
//GET request to server from client
axios.get('/api/', {
  
})
.then(response => {
  
})
.catch(error => {

});

//POST request to server from client
axios.post('/api/', {
  
})
.then(response => {
  
})
.catch(error => {

});

//PUT request to server from client
axios.put('/api/', {
  
})
.then(response => {
  
})
.catch(error => {

});

//DELETE request to server from client
axios.delete('/api/', {
  
})
.then(response => {
  
})
.catch(error => {

});  

class App extends Component {
 onTakePhoto (dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto');
  }

  onCameraError (error) {
    //const id = uuidv4();
    const id = "38283282382";
    const message = {
      id,
      text: "ahmed",
      userId: "0",
    };
    axios.post(`/api/Image`, { message })
    .then(res => {
      console.log(res);
      console.log(res.data);
    });

    console.error('onCameraError', error);
  }
   
  onCameraStart (stream) {
    console.log('onCameraStart');
  }

  onCameraStop () {
    console.log('onCameraStop');
  }

  render () {
    return (
      <div className="App">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isSilentMode = {true}
          isDisplayStartCameraError = {true}
          isFullscreen = {true}
          sizeFactor = {1}
          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
          onCameraStop = { () => { this.onCameraStop(); } }
        />
      </div>
    );
  }
}

export default App;