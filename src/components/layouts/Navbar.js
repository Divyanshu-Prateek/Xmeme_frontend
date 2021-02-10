import React from 'react'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-primary navbar">
      <h1 style={{fontSize: '2.5rem'}}>
        Xmeme
      </h1>
      <ul>
        <li>
          <Link to="/" style={{fontSize: '1.5rem'}}>Home</Link>
        </li>
        <li>
          <Link to='/memes' style={{fontSize:'1.5rem'}}>Memes</Link>
        </li>
        <li>
          <Link to="/about" style={{fontSize: '1.5rem'}}>About</Link>
        </li>
        <li>
          <Link to='/swagger' style={{fontSize:'1.5rem'}}>Swagger</Link>
        </li>
        
      </ul>
    </nav>
  )
}

export default Navbar
