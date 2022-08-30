const express = require("express");
const app = express();
const cors = require("cors"); // used to interact w/ diff domain apps, so backend can interact w/ frontend
//const pool = require("./db.js"); // gives access to run queries, as db.js code connects db to server
//const router = require("./routes/authentication");
const path = require("path");
const PORT = process.env.PORT || 3001;

//Middleware//
app.use(cors());
app.use(express.json()); // allows access to req.body(to access data from client side)

if (process.env.NODE_ENV === "production") {
    // allows us to serve static content to directory specified by us
    app.use(express.static(path.join(__dirname, "client/build"))); 
}

//console.log(path.join(__dirname, "client/build"));
//console.log((__dirname + '/client/build'));
//Routes//

// register and login
app.use("/authenticate", require("./routes/authentication"));

// dashboard
app.use("/dashboard", require("./routes/dashboard"));

//CODE BELOW IS RESTful API for todo planner w/o login/authentication

// get all todos on planner
/*app.get("/all", async(req, res) => {
    try {
        // gets all todos from todo table
        const allToDos = await pool.query("SELECT * FROM todo");

        res.json(allToDos.rows); // just get rows from todo table 
    } catch(error) {
        console.log(error.message);
    }
});*/

// get one todo on planner
/*app.get("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params; 
        const toDo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]); // gets a todo based on id
        res.json(toDo.rows[0]) 
    } catch(error) {
        console.log(error.message);
    }
});*/

// create a todo
/*app.post("/todo", async(req, res) => {
    try {
        const { description } = req.body;
        // inserts data(description) into the table
        const newToDo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description]); // $1 is variable for description and the first argument, description being the 2nd(meaning $1 is assigned description), returning will get this data to show in the table
        res.json(newToDo);  
    } catch(error) {
        console.log(error.message);
    }
});*/

// update a todo
/*app.put("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description, iscomplete } = req.body;
        if (description) {
            const updateToDo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id]) // description correlates to $1 and id to $3, so the specific todo can be updated
        } else {
            const updateCompletedToDo = await pool.query("UPDATE todo SET iscomplete= $1 WHERE id = $2", [iscomplete, id])
        }
        res.json("updated");
    } catch (error) {
        console.log(error.message);
    }
});*/


// delete a todo
/*app.delete("/todo/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteToDo = await pool.query("DELETE FROM todo WHERE id = $1", [id]); // based on id, deletes the todo w/ corresponding id
        res.json("deleted");
    } catch (error) {
        console.log(error.message);
    }
});*/

// keeps client side routing functional, so whenever user inputs unkown routes it still reroutes to the correct route
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log("Server starts");
});