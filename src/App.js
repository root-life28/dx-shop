import React from 'react';
import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInaAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';
import {selectCurrentUser} from './redux/user/user.selectors';

import { createStructuredSelector } from 'reselect';

class  App extends React.Component {



   unsubscribeFromAuth=null;

  componentDidMount(){
    const {setCurrentUser}=this.props;
   this.unsubscribeFromAuth= auth.onAuthStateChanged(async userAuth=>{
   
    if(userAuth)
    {
      const userRef= await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot =>{
        setCurrentUser({
          id:snapShot.id,
          ...snapShot.data()
        });
       
        
      });
      
    }
    else
    {
      setCurrentUser(userAuth);
    }
      
    })
  }

  componentWillUnmount()
  {
    this.unsubscribeFromAuth();
  }

  render(){

      return (
        <div className='App'>
          <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/shop' element={<ShopPage />}/>
        <Route  path='/signin' element={this.props.currentUser ? <Navigate to='/'/>:<SignInaAndSignUpPage/>} />
        <Route path='/checkout' element={<CheckoutPage />}/>
      </Routes>
        </div>
      );
    }
}
const mapStateToProps=createStructuredSelector({
  currentUser:selectCurrentUser
});
const mapDispatchToProps= dispatch =>({
 setCurrentUser:user=>dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
