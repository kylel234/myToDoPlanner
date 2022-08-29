import React, {useState, useEffect} from "react";
import Edit from './Edit'
import IsComplete from "./IsComplete";

export default function ToDos({allToDos, setIsChange}) {

    const [toDo, setToDo] = useState([]); // default is empty arr to store todos

    // delete a to do 
    async function deleteToDo(id) {
        await fetch(`http://localhost:3001/dashboard/todo/${id}`, {
            method: "DELETE",
            headers: {jwt_token: localStorage.token}
        });

        setToDo(toDo.filter(task => task.id !== id)) // go through all todo states and filter it, checks if the id of the todo to be deleted is not equal to other ids it is filtered
    }

    // fetch from api to get all to dos
    /*async function getToDos() {
        const response = await fetch("http://localhost:3001/database/");

        const arr = await response.json();
        setToDo(arr); // sets state of toDo to current task fetched
    }*/

    // runs when component is rendered, can get multiple requests of getToDos so [] restricts to one request at a time
    // *newest change: using destructed prop allToDos from Dashboard I can get all the toDos as everytime allToDos changes
    // states, useEffect will run so setToDo will also change states for toDos therefore getting all the todo table data
    useEffect(() => {
        setToDo(allToDos);
    }, [allToDos])

    const formatDate = (s) => new Date(s).toLocaleDateString(); // formats date to mm/dd/yyyy

    // filters toDo for completed tasks only by checking task's iscomplete status
    const filterCompleted = toDo.filter(tasks => {
        return tasks.iscomplete === true;
    })

    // filters toDo for incompleted tasks only by checking task's iscomplete status
    const filterIncompleted = toDo.filter(tasks => {
        return tasks.iscomplete === false;
    })

    return (
    <div>
        <table className="table table-sm table-hover table-bordered mt-4 style-table">
        <thead>
        <h5 className="display-6">Tasks-{filterIncompleted.length} </h5>
            <tr>
                <th scope="col">Completed</th>
                <th scope="col">Description</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>
                <th scope="col">Date Published</th>
            </tr>
        </thead>
        <tbody>
            {
                filterIncompleted.map(tasks => (
                    <tr className="hover-rows" key={tasks.id}>
                        <td><IsComplete 
                        toDo={toDo} 
                        setToDo={setToDo} 
                        id={tasks.id}
                        iscomplete={tasks.iscomplete}
                        setIsChange={setIsChange}
                        />
                        </td>
                        <td>{tasks.description}</td>
                        <td><button className="btn btn-danger" onClick={() => deleteToDo(tasks.id)}><i class="fa fa-trash"></i></button></td>
                        <td><Edit tasks={tasks} setIsChange={setIsChange}/></td>
                        <td>{formatDate(tasks.datepublished)}</td>
                    </tr> 
                ))
            }
        </tbody>
        </table>

        {/* Completed Tasks */}
        <table className="table table-sm table-hover table-bordered mt-5 style-table">
        <thead>
        <h5 className="display-8">Completed-{filterCompleted.length} </h5>
            <tr>
                <th scope="col">Completed</th>
                <th scope="col">Description</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>
                <th scope="col">Date Published</th>
            </tr>
        </thead>
        <tbody>
            {
                filterCompleted.map(tasks => (
                    <tr className="hover-rows" key={tasks.id}>
                        <td><IsComplete 
                        toDo={toDo} 
                        setToDo={setToDo} 
                        id={tasks.id}
                        iscomplete={tasks.iscomplete}
                        />
                        </td>
                        <td>{tasks.description}</td>
                        <td><button className="btn btn-danger" onClick={() => deleteToDo(tasks.id)}><i class="fa fa-trash"></i></button></td>
                        <td><Edit tasks={tasks} setIsChange={setIsChange}/></td>
                        <td>{formatDate(tasks.datepublished)}</td>
                    </tr> 
                ))
            }
        </tbody>
        </table>
    </div>
    );
}