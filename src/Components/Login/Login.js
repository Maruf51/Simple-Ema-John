import React, { useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';


const LogIn = () => {
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const [user, setUser] = useState({
        email: '',
        password: '',
        error: '',
        success: false,
    })
    const handleChange = (e) => {
        const newUser = {...user};
        newUser[e.target.name] = e.target.value;
        setUser(newUser);
    }
    const handleLogIn = (e) => {
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(response => {
            console.log(response)
            const newUser = {...user};
            newUser.error = '';
            newUser.success = true;
            setUser(newUser);
            setLoggedInUser(newUser);
            console.log(response);
            history.replace(from);
        })
        .catch(function(error) {
            // var errorCode = error.code;
            // var errorMessage = error.message;
            const newUser = {...user};
            newUser.error = error.message;
            newUser.success = false;
            setUser(newUser);
          });
        e.preventDefault();
    }
    return (
        <div>
            <form action="" className="form">
                <fieldset>
                    <legend className="legend">Log In</legend>
                    <div className="email">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" onBlur={handleChange} placeholder="Enter Your Email..." required/>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onBlur={handleChange} placeholder="Enter Your Password..." required/>
                    </div>
                    <input className="regLogBtn" onClick={handleLogIn} type="submit" value="Log in"/>
                    <p style={{color: 'red', textAlign: 'center'}}>{user.error}</p>
                    {
                        user.success && <p style={{color: '#47ff47', textAlign: 'center'}}>Logged in successfully</p>
                    }
                    <p className="account">create an account! <Link to="/register">Register</Link></p>
                </fieldset>
            </form>
        </div>
    );
};

export default LogIn;