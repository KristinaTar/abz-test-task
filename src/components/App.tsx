import React from 'react';
import './App.scss';
import Users from './Users/Users';
import logo from '../images/Logo.svg';



function App() {
  return (
    <div>
      <div className="header__line">
      </div>
      <div className="app__container">
        <div className="header__menu">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <button>
            Users
          </button>
          <button>
            Sign up
          </button>
        </div>
        <header className='header'>
          <div className='header__content'>
            <div className='header__content-title'>
              Test assignment for front-end developer
            </div>
            <div className='header__content-body'>
              What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
            </div>
          </div>
          <button className="header__button">Sign up</button>
        </header>
        <Users photo={''} name={''} position={''} email={''} phone={''} />
      </div>
    </div>
  );
}

export default App;
