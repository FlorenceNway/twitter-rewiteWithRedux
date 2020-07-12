import React, {useState, useEffect} from 'react';
import API from './API';
import {useDispatch,} from 'react-redux';
import { useHistory } from "react-router-dom";
import {saveLoginUser} from '../store/login.actions'
import '../style/Login.scss';


const Login = () => {

const dispatch = useDispatch();
const history = useHistory();

const [loginDetails, setLoginDetails] = useState({
            userName: "",
            password: ""      
})

const [fetchUsers, setFetchUsers] = useState([]);

const inputHandler = (e) => {
    const {name, value} = e.target

    setLoginDetails(
        {...loginDetails,
         [name]: value}
    )
}

useEffect(() => { 
    API.getUsers().then((users) => {
      setFetchUsers(users);
    });

}, []);


const submitHandler = (e) => {
    e.preventDefault()
    const {userName, password} = loginDetails
  
    const validUser = fetchUsers.filter(user => user.name === userName && user.password === password)
    console.log('valid',validUser)

    if(validUser) {
        history.push('/tweets')
    }
    
    dispatch(saveLoginUser(validUser)) //dispatch expect to have object with type and payload props

//Reset
    setLoginDetails({
        userName: "",
        password: ""
    })
}

    return <section className="content">
                <div className='polygon1'><img src={require('../images/polygon1.png')} alt="polygon"/></div>
                <div className='polygon2'></div>
                <div className='polygon3'><img src={require('../images/polygon3.png')} alt="polygon"/></div>
                <div className='polygon4'></div>
                <div className='polygon6'><img src={require('../images/polygon6.png')} alt="polygon"/></div> 
                <div className='polygon5'><img src={require('../images/polygon5.png')} alt="polygon"/></div>
                <div className="login_img"><img src={require('../images/sitting4.svg')} alt="man sitting"/></div>
                <form onSubmit = {submitHandler}>
                    <label htmlFor="user" className="username"></label>
                    <input id='user' type="text" name='userName' placeholder="User name" onChange={inputHandler} value={loginDetails.userName} required/>
                    <label htmlFor="pw" className="password"></label>
                    <input id='pw' name='password' type="password" placeholder="Password" onChange={inputHandler} value={loginDetails.password} required/>
                    <button className="loginBtn" type={'submit'}>Login</button>
                </form>
            </section>
    
}

export default Login;