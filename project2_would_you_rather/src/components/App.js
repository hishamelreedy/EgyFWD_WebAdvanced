import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import UserChoice from './UserChoice'
import UserHome from './UserHome'
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import LoadingBar from 'react-redux-loading'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Particles from 'react-particles-js'

class App extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
              {this.props.loading === true 
                ? null 
                : <div>
                  <Particles 
          params={{
            particles: {
              number: {
                value: 300,
                density: {
                  enable: true,
                  value_area: 800
                }
              },
              color: {
                value: "#41ead4"
              },
              shape: {
                type: "circle",
                stroke: {
                  width: 0,
                  color: "#000000"
                },
                polygon: {
                  nb_sides: 20
                },
                image: {
                  src: "img/github.svg",
                  width: 100,
                  height: 100
                }
              },
              opacity: {
                value: 0.5,
                random: false,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false
                }
              },
              size: {
                value: 7,
                random: true,
                anim: {
                  enable: false,
                  speed: 40,
                  size_min: 0.1,
                  sync: false
                }
              },
              line_linked: {
                enable: true,
                distance: 150,
                color: "#41ead4",
                opacity: 0.4,
                width: 1
              },
              move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200
                }
              }
            },
            retina_detect: true
          }}
          style={{
            width: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        />
                    <Route path='/' exact component={UserChoice} />
                    <Route path='/home/:id' component={UserHome} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={LeaderBoard} />
                  </div>
                }
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ selectUser }) {
  return {
    //sets a new property onto the component
    loading: selectUser === null
  }
}

export default connect(mapStateToProps)(App);
