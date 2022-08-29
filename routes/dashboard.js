const express = require('express');
const router = express.Router();
const pool = require("../db.js"); // gives access to run queries, as db.js code connects db to server
const authorize = require("../middleware/authorize");

// authorize middleware makes sure that the user must be authorized in order to access these routes and perform crud functions

// get all todos and username
router.get("/", authorize, async(req, res) => {
    try {
        // use left join cause it gets all data from left table regardless of relationships, WHERE specifies that we get the todo data that belongs to that specific user
        // take out password and email since user doesnt need to see that
        const user = await pool.query("SELECT username, id, description, datepublished, iscomplete FROM users LEFT JOIN todo ON users.user_id = todo.user_id WHERE users.user_id = $1", [req.user.id]);

        res.json(user.rows); // just get rows from user table 
    } catch(error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

// create
router.post("/todo", authorize, async(req, res) => {
    try {
        const { description } = req.body;
        // inserts data(description) into the table
        // $1 is user_id and is inserted so that we can use join operator to get todo data req.user.id cause of payload formate in generateJWT $2 is variable for description and the 2nd argument, description being the 2nd(meaning $1 is assigned description), 
        // returning * will get this data to show in the table
        const newToDo = await pool.query("INSERT INTO todo (user_id, description) VALUES ($1, $2) RETURNING *", [req.user.id, description]); 
        res.json(newToDo);  
    } catch(error) {
        console.log(error.message);
    }
});

// update

router.put("/todo/:id", authorize, async(req, res) => {
    try {
        const { id } = req.params;
        const { description, iscomplete } = req.body;
        if (description) {
            // description correlates to $1 and id to $2, so the specific todo can be updated
            // user_id is added as a constraint to make sure that users cant edit other users todo planners
            const updateToDo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2 AND user_id = $3", [description, id, req.user.id]);
        } else {
            const updateCompletedToDo = await pool.query("UPDATE todo SET iscomplete= $1 WHERE id = $2 AND user_id = $3", [iscomplete, id, req.user.id]);
        }
        res.json("updated");
    } catch (error) {
        console.log(error.message);
    }
});

// delete

router.delete("/todo/:id", authorize, async(req, res) => {
    try {
        const { id } = req.params;
        // based on id, deletes the todo w/ corresponding id and user_id
        const deleteToDo = await pool.query("DELETE FROM todo WHERE id = $1 AND user_id = $2", [id, req.user.id]); 
        res.json("deleted");
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = router;
