import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
        <h4>Version 1.0.0</h4>
    <p>
        This app is buid by <strong>Cedric KARUNGU</strong> <br/>
        <Link to='/'>Home</Link>
    </p>
    </div>
  )
}

export default About