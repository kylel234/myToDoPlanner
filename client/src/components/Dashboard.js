import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "./todoPlanner/Input";
import Todos from "./todoPlanner/ToDos";

export default function Dashboard({ setAuthenticate }) {
  const [name, setName] = useState("");
  const [allToDos, setToDos] = useState([]); // gets all of the toDos, default as empty array
  const [isChange, setIsChange] = useState(false);

  const getUserInfo = async () => {
    const res = await fetch("/dashboard/all", {
      method: "GET",
      headers: { jwt_token: localStorage.token }
    });

    const parsedResponse = await res.json();

    console.log(parsedResponse);
    setToDos(parsedResponse);

    // get username by getting the first item from parsedResponse
    setName(parsedResponse[0].username);
  };

  async function logout(e) {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuthenticate(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

  // runs whenver something changes within isChange state, this results in user info being fetched and setIsChange being false when there is no more data to be fetched
  useEffect(() => {
    getUserInfo();
    setIsChange(false);
  }, [isChange]);

  return (
    <div>
      <h1 className="display-3 text-center m-5">{name}'s ToDo Planner</h1>
        <button onClick={e => logout(e)} className="btn btn-danger pos-btn">
          Logout
        </button>
      <Input setIsChange={setIsChange} />
      <Todos allToDos={allToDos} setIsChange={setIsChange} />
    </div>
  );
};