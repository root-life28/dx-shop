import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom';
import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInaAndSignUpPage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import {auth,createUserProfileDocument} from './firebase/firebase.utils';

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
        // this.setState({
        //   currentUser:{
        //     id:snapShot.id,
        //     ...snapShot.data()
        //   }
        // })
        
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
        <Route path='/signin' element={<SignInaAndSignUpPage />} />
      </Routes>
        </div>
      );
    }
}
const mapDispatchToProps= dispatch =>({
 setCurrentUser:user=>dispatch(setCurrentUser(user))
});
export default connect(null,mapDispatchToProps)(App);
