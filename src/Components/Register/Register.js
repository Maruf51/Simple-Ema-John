import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import { Link } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Register = () => {
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        success: false
      })
      const handleChange = (e) => {
        let isValid = true;
        if(e.target.name === 'email'){
          isValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
          const passwordLengthValidator = e.target.value.length > 5;
          const passwordNumberCheck = /\d{1}/.test(e.target.value);
          isValid = passwordLengthValidator && passwordNumberCheck;
        }
        if(isValid){
          const newUser = {...user}
          newUser[e.target.name] = e.target.value;
          setUser(newUser);
        }
      }
      const handleRegister = (e) => {
        if(user.firstName && user.lastName && user.email && user.password){
          firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(response => {
            const newUser = {...user}
            newUser.error = '';
            newUser.success = true;
            setUser(newUser);
            userInfo(user);
          })
          .catch(function(error) {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            const newUser = {...user};
            newUser.error = error.message;
            newUser.success = false;
            setUser(newUser);
          });
        }
        e.preventDefault();
      }

    const userInfo = (userInfo) => {
        var user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: userInfo.firstName + ' ' + userInfo.lastName,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        password: userInfo.password
        }).then(function() {
        
        }).catch(function(error) {

        });
        }
    return (
        <div>
            <form action="" className="form">
                <fieldset>
                <legend className="legend">Register Here</legend>
                <div>
                    <div className="name">
                    <div className="firstName">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" name="firstName" onBlur={handleChange} placeholder="Enter Your First Name..." required/>
                    </div>
                    <div className="lastName">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" name="lastName" onBlur={handleChange} placeholder="Enter Your Last Name..." required/>
                    </div>
                    </div>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" onBlur={handleChange} placeholder="Enter Your Email..." required/>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onBlur={handleChange} placeholder="Enter Your Password..." required/>
                    </div>
                    <input className="regLogBtn" onClick={handleRegister} type="submit" value="Register"/>
                </div>
                <p style={{color: 'red', textAlign: 'center'}}>{user.error}</p>
                {
                    user.success && <p style={{color: '#47ff47', textAlign: 'center'}}>Register Successful</p>
                }
                
                <p className="account">Have an account! <Link to="/login">Log in</Link></p>
                </fieldset>
            </form>
        </div>
    );
};

export default Register;