import React, {useState} from "react";
import {
    Link
} from "react-router-dom";
import { toast } from 'react-toastify';

// get destructed prop setAuthenticate from App and will change the state of isAuthenticated to true in this login function if login valid
// this component has the same idea as register
export default function Login({setAuthenticate}) {

    const [info, setInfo] = useState({
        email: "",
        password: ""
        
    });

    const {email, password} = info;

    const onChange = (e) => {
        setInfo({...info, [e.target.name] : e.target.value});
    }

    async function login(e) {
        e.preventDefault();
        const logInfo = {email, password};
        const res = await fetch("/authenticate/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(logInfo)
        });

        const parseResponse = await res.json();
        //console.log(parseResponse);
        // check jwtoken exists then store token and user is authenticated
        if (parseResponse.jwtoken) {
            localStorage.setItem("token", parseResponse.jwtoken);
            setAuthenticate(true);
            toast.success("Logged In!")
        } else{
            setAuthenticate(false);
            toast.error(parseResponse);
        }
    } 

    return(
        <div className="mt-5 p-5 bg-primary bg-gradient rounded-3">
            <h1 className="display-4">Login</h1>
            <form onSubmit={login}>
                <input type="email" name="email" placeholder="Email" className="form-control my-3"
                value={email} onChange={e => onChange(e)}></input>   
                <input type="password" name="password" placeholder="Password" className="form-control my-3"
                value={password} onChange={e => onChange(e)}></input>
                <button className="btn btn-success">Login</button>
            </form>
            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?<Link to="/register" className="link-warning ms-1">Register</Link></p>
        </div>
    );
}