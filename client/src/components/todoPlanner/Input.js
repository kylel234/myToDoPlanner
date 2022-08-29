import React, { useState} from "react";

export default function Input({ setIsChange }) {

    const [description, setDescription] = useState(""); // state for description to be set by post request

    const getDescription = async (e) => {
        e.preventDefault(); // prevent refresh when adding a new todo

        // create own headers to account for jwtoken
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("jwt_token", localStorage.token);

        const text = { description };
        const response = await fetch("http://localhost:3001/dashboard/todo", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(text)
        });

        const parseResponse = await response.json();
        setIsChange(true); // due to reasons explained in Dashboard.js useeffect will result in tasks being inputted
        // without needing for the page to refresh
        setDescription(""); //clears description of task from search bar after being added
        //console.log(parseResponse);

        //window.location = "/"; // dont need to manually refresh page to see changes
        //console.log(response);
    }

    return (
        <div className="center-input">
            <form className="d-flex" onSubmit={getDescription}>
                <input className="form-control style-form" type="text" placeholder="Add a task to do..." value={description} onChange={e => setDescription(e.target.value)}></input>
                <button className="btn btn-primary"><i className="fa fa-plus"></i></button>
            </form>
        </div>
    );
}