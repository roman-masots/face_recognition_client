import React, { Component } from 'react';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesSettings = {
  particles: {
    number: { value: 150, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 }
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false }
    },
    move: {
      enable: true,
      speed: 5,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 }
    }
  },
}

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  calculateFaceLocation = (data) => {
    let faces = data.outputs[0].data.regions.map((obj, index) => {
      const clarifaiFace = obj.region_info.bounding_box;
      const image = document.querySelector('#inputImage');
      const width = image.width;
      const height = image.height;
      return {
        id: index,
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
    return faces;
  }

  displayFaceDetectionBox = box => {
    this.setState({ box });
  }

  onEnterKeyClick = event => {
    if (event.charCode === 13) {
      this.onButtonClick();
    }
  }

  onButtonClick = () => {
    this.setState({ imageUrl: this.state.input })
    fetch('http://localhost:3001/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log)
        }
        this.displayFaceDetectionBox(this.calculateFaceLocation(response))
      })
      .catch(error => console.log(error))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route })
  }

  render() {
    const { isSignedIn, route, imageUrl, box, user } = this.state;
    return (
      <div className="App" >
        <Particles className='particles' params={particlesSettings} />
        {route === 'home'
          ?
          <div>
            <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onButtonClick} onEnterKeyClick={this.onEnterKeyClick} />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin' || route === "signout"
              ?
              <div>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>
              :
              <div>
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>
          )
        }
      </div>
    );
  }
}

export default App;
