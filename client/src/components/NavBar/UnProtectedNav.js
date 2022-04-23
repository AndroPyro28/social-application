import React from 'react';
import styled from 'styled-components';
import {UnAuthNavBar} from './NavBar';
function UnProtectedNav() {

  const signupActive = {
    background: 'none',
    color:'black'
  }

  const loginActive = {
    background: 'black',
    color:'white'
  }

  return <UnAuthNavBar>
    <div> {"<HelloFriends/>"}</div>
    
      {
        window.location.pathname == "/signup" && (
          <div>
          <a href="/signup">signup</a>
          <a href="/login">login</a>
          </div>
        ) 
    }
        {
       window.location.pathname == "/login" && (
          <div>
          <a href="/signup"
          style={signupActive}
          >signup</a>
          <a href="/login" style={loginActive}>login</a>
          </div>
        )
      }
  </UnAuthNavBar>;
}

export default UnProtectedNav;
