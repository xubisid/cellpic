import React, { Component } from 'react';
import axios from 'axios';
import Logo from '../../public/logo.svg'
import './App.css';
import Camera, { FACING_MODES, IMAGE_TYPES } from '../lib/components';
//import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
//import 'react-html5-camera-photo/build/css/index.css';

function dataURItoBlob (dataURI) {
  let byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  let blob = new Blob([ab], {type: mimeString});
  return blob;
}

function padWithZeroNumber (number, width) {
  number = number + '';
  return number.length >= width
    ? number
    : new Array(width - number.length + 1).join('0') + number;
}

function getFileExtention (blobType) {
  // by default the extention is .png
  let extention = IMAGE_TYPES.PNG;

  if (blobType === 'image/jpeg') {
    extention = IMAGE_TYPES.JPG;
  }
  return extention;
}

function getFileName (imageNumber, blobType) {
  const prefix = 'photo';
  const photoNumber = padWithZeroNumber(imageNumber, 4);
  const extention = getFileExtention(blobType);

  return `${prefix}-${photoNumber}.${extention}`;
}

function downloadImageFileFomBlob (blob, imageNumber) {
  window.URL = window.webkitURL || window.URL;

  let anchor = document.createElement('a');
  anchor.download = getFileName(imageNumber, blob.type);
  anchor.href = window.URL.createObjectURL(blob);
  
  let mouseEvent = document.createEvent('MouseEvents');
  mouseEvent.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  anchor.dispatchEvent(mouseEvent);
  
  
}

function downloadImageFile (dataUri, imageNumber) {
  let blob = dataURItoBlob(dataUri);
  
  downloadImageFileFomBlob(blob, imageNumber);

  const id = "38283282382";
  const message = {
    id,
    data: dataUri,
    imagename: imageNumber,
  };
  axios.post(`/api/Image`, { message })
  .then(res => {
    console.log(res);
    console.log(res.data);
  });
 
}
 
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
  constructor () {
    super();
    this.imageNumber = 0;
  }
  onTakePhoto (dataUri) {
    downloadImageFile(dataUri, this.imageNumber);
  
  
   
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
          <div className="App mobile" >
        
        <div className="mobile2">
           
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 308, height: 547}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isSilentMode = {true}
          isDisplayStartCameraError = {true}
          isFullscreen = {false}
          sizeFactor = {10}
          onCameraStart = { (stream) => { this.onCameraStart(stream); } }
          onCameraStop = { () => { this.onCameraStop(); } }
        />
          </div>
        </div>
     
    );
  }
}

export default App;