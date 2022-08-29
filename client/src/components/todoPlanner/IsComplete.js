import React from "react";

// pass in destructed props/values from ToDos to be used for checking for completed/incompleted tasks
export default function IsComplete( {toDo, setToDo, id, iscomplete, setIsChange} ) {

    // update todo completed status
    async function getCompleted() {

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("jwt_token", localStorage.token);

        const bool = { iscomplete: true };
        await fetch(`http://localhost:3001/dashboard/todo/${id}`, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(bool)
            }
        );

        // traverses through todos and finds completed todos 
        setToDo(toDo.map((tasks) => {
            if (tasks.id === id) {
             return { ...tasks, iscomplete: true } // spreads features of task/todo, sets iscomplete as true
            }
            return tasks;
        })
        );

        setIsChange(true);

        //window.location = "/";
    }

    //console.log(iscomplete);

    // check task for completion, additionally switches btn style and text depending on if task is complete
    return (
        <div>
            <button type="submit" className={iscomplete ? "btn btn-success" : "btn btn-warning color-btnText"} onClick={() => getCompleted()} disabled={iscomplete}>{iscomplete ? "Completed" : "Incomplete"}</button>
        </div>
    );
}