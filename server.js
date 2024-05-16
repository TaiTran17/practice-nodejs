import userController from "./userController";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

// Insert a new user (POST)
app.post("/users", userController.createUser);

// Update an existing user (PATCH)
app.patch("/users/:username", userController.updateUser);

// Delete a user (DELETE)
app.delete("/users/:username", userController.deleteUser);

// Search for users (GET)
app.get("/users", userController.searchUser);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
