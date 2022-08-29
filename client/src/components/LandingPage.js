import React from "react";
import {
    Link
  } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="mt-5 p-5 bg-secondary text-center text-white rounded-5">
             <h1>Welcome to myToDo Planner</h1>
             <p>Sign in or Register to create your own planner!</p>
             <Link to="/login" className="btn btn-primary">Login</Link>
             <Link to="/register" className="btn btn-success btn ms-3">Register</Link>
        </div>
    );
}