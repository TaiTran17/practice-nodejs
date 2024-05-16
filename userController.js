const createUser = async (req, res) => {
  const newUser = req.body;

  // Check if username already exists
  if (users.some((user) => user.username === newUser.username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
};

const updateUser = async (req, res) => {
  const { username } = req.params;
  const updatedData = req.body;

  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Prevent username duplication
  if (updatedData.username && updatedData.username !== username) {
    if (users.some((user) => user.username === updatedData.username)) {
      return res.status(400).json({ message: "Username already exists" });
    }
  }

  const updatedUser = { ...users[userIndex], ...updatedData };
  users[userIndex] = updatedUser;

  res.status(200).json({ message: "User updated", user: updatedUser });
};

const deleteUser = async (req, res) => {
  const { username } = req.params;

  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: "User deleted" });
};

const searchUser = async (req, res) => {
  const { username, fullname, role, activeYn } = req.query;

  let filteredUsers = users;

  if (username) {
    filteredUsers = filteredUsers.filter((user) =>
      user.username.includes(username)
    );
  }
  if (fullname) {
    filteredUsers = filteredUsers.filter((user) =>
      user.fullname.includes(fullname)
    );
  }
  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role.includes(role));
  }
  if (activeYn) {
    filteredUsers = filteredUsers.filter((user) => user.activeYn === activeYn);
  }

  res.status(200).json(filteredUsers);
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  searchUser,
};
