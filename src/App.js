import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInaAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';

function App() {
  return (
    <div className='App'>
      <Header/>
  <Routes>
    <Route path='/' element={<HomePage/>}/>
    <Route path='/shop' element={<ShopPage />}/>
    <Route path='/signin' element={<SignInaAndSignUpPage />}/>
  </Routes>
    </div>
  );
}

export default App;
