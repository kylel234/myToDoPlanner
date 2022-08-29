import React, { useState } from "react";

// pass prop tasks to get each task/todo from ToDos.js
export default function Edit({ tasks, setIsChange }) {
  const [description, setDescription] = useState(tasks.description); // default state gets curr description of task from prop

  //save changes function
  async function saveChanges() {

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("jwt_token", localStorage.token);

    const text = { description };
    await fetch(`http://localhost:3001/dashboard/todo/${tasks.id}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(text)
    });

    setIsChange(true);

    //window.location = "/"; // dont need to manually refresh page to see changes
  }

  return (
    <div>
      <button type="button" class="btn btn-success" data-toggle="modal"
        data-target={`#id${tasks.id}`}>
        <i class="fa fa-edit"></i> 
      </button>
      {/* to get each specific task/todo we look at id but cant use numbers for id in css, so id will be formatted id(id number) */ }
      <div class="modal" id={`id${tasks.id}`}>
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit</h4>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>

            <div class="modal-body">
              <input type="text" className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div class="modal-footer">
              <button type="button" className="btn btn-success"
                data-dismiss="modal"
                onClick={e => saveChanges(e)}
              >
                 <i class="fa fa-save"></i> Save
              </button>
              <button type="button" className="btn btn-danger"
                data-dismiss="modal"
              >
                <i class="fa fa-close"></i> Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}