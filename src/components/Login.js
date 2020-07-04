import React, {useState} from 'react';
import '../style/Login.scss';

const [inputUsername, setInputUsername] = useState("")
const [inputPassword, setInputPassword] = useState("")



const Login = () => {
    return <section className="content">
                <div className='polygon1'><img src={require('../images/polygon1.png')} alt="polygon"/></div>
                <div className='polygon2'></div>
                <div className='polygon3'><img src={require('../images/polygon3.png')} alt="polygon"/></div>
                <div className='polygon4'></div>
                <div className='polygon6'><img src={require('../images/polygon6.png')} alt="polygon"/></div> 
                <div className='polygon5'><img src={require('../images/polygon5.png')} alt="polygon"/></div>
                <div className="login_img"><img src={require('../images/sitting4.svg')} alt="man sitting"/></div>
                <form>
                    <label htmlFor="user" className="username"></label>
                    <input id='user' type="text" name='user' placeholder="User name" required/>
                    <label htmlFor="pw" className="password"></label>
                    <input id='pw' name='pw' type="password" placeholder="Password"/>
                    <button className="loginBtn">Login</button>
                </form>
            </section>
    
}

export default Login;