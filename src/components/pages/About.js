import React, {Fragment} from 'react'
import {Jumbotron,Button} from 'react-bootstrap';

const About = () => {
  return (
    <Fragment>
      <Jumbotron>
        <h1 style={{}}>About Xmeme</h1>
        <p>Xmeme is a fullstack application which is used to submit different memes by users all over the world</p>
      <p>Version: 0.0.1</p>
        <p style={{}}>
          <Button variant="primary">GitHub Docs</Button>
        </p> 
      </Jumbotron>
      <h3>Made by- Prateek Divyanshu</h3>
      <p>Xmeme is a fullstack application which is used to submit different memes by users all over the world</p>
      <p>Version: 0.0.1</p>
    </Fragment>
  )
}

export default About
