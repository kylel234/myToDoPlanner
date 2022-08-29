import React, {useState} from "react";
import {
    Link
  } from "react-router-dom";
import { toast } from 'react-toastify';

export default function Register({setAuthenticate}) {

    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: ""
    })

    const {username, email, password} = info;

    // value will equal the destructered registration info.
    // so we use onchange to target the name and value variable in inputs and change them to the registration info by changing states
    const onChange = (e) => {
        setInfo({...info, [e.target.name] : e.target.value});
    }

    // register the user
    async function register(e) {
        e.preventDefault(); // prevents refreshing when hitting register button
        const regInfo = {username, email, password};
        const response = await fetch("http://localhost:3001/authenticate/register", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(regInfo)
        });

        // parses the response so we can view the jwtoken in console which confirms that the user registered
        // also so that we can store it in local storage
        const parseResponse = await response.json();

        if (parseResponse.jwtoken) {
            localStorage.setItem("token", parseResponse.jwtoken)

            // since user is registered, setauthenticate to true
            setAuthenticate(true);
            toast.success("Registered!");
        } else {
            setAuthenticate(false);
            toast.error(parseResponse);
        }
        //console.log(parseResponse);
    }

    return(
        <div className="mt-5 p-5 bg-secondary bg-gradient rounded-3">
            <h1 className="display-4">Register</h1>
            <form onSubmit={register}>
                <input type="text" name="username" placeholder="Username" className="form-control my-3"
                value={username} onChange={e => onChange(e)}></input>    
                <input type="password" name="password" placeholder="Password" className="form-control my-3"
                value={password} onChange={e => onChange(e)}></input>
                <input type="email" name="email" placeholder="Email" className="form-control my-3"
                value={email} onChange={e => onChange(e)}></input>
                <button className="btn btn-success">Register</button>
            </form>
            <p className="small fw-bold mt-2 pt-1 mb-0">Have an account?<Link to="/login" className="link-info ms-1">Login</Link></p>
        </div>
    );
}