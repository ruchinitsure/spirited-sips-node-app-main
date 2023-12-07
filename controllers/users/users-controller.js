import * as userDao from "./users-dao.js";

let currentUser = null;

const UsersController = (app) => {
  const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
  };
  const createUser = async (req, res) => {
    const newUser = req.body;
    console.log(newUser);
    const actualUser = await userDao.createUser(newUser);
    res.json(actualUser);
  };

  const updateUser = async (req, res) => {
    const userIdToUpdate = req.params.uid;
    const updates = req.body;
    const status = await userDao.updateUser(userIdToUpdate, updates);
    console.log(status);
    res.json(status);
  };

  const deleteUser = () => {
  
  };

  const register = async (req, res) => {
    const user = req.body;
    const existingUser = await userDao.findUserByUsername(user.username);
    if (existingUser) {
      res.sendStatus(403);
      return;
    }
    const currentUser = await userDao.createUser(user);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const login = async (req, res) => {
    const credentials = req.body;
    const existingUser = await userDao.findUserByCredentials(
      credentials.username,
      credentials.password
    );
    if (existingUser) {
      req.session["currentUser"] = existingUser;
      res.json(existingUser);
      return;
    }
    res.sendStatus(403);
  };

  const logout = (req, res) => {
    console.log(req.session);
    req.session.destroy();
    res.sendStatus(200);
  };

  const profile = (req, res) => {
    if (req.session["currentUser"]) {
      res.send(req.session["currentUser"]);
    } else {
      res.sendStatus(403);
    }
  };

  const updateProfile = async (req, res) => {
    const newProfile = req.body;
    req.session["currentUser"] = newProfile;
    const status = await userDao.updateUser(newProfile._id, newProfile);
    res.json(newProfile);
  };

  const findUserById = async (req, res) => {
    const uid = req.params.uid;
    const user = await userDao.findUserById(uid);
    if (user) {
      res.json(user);
      return;
    }
    res.sendStatus(404);
  };


  app.get("/users", findAllUsers);
  app.get("/users/:uid", findUserById);
  app.post("/users", createUser);
  app.put("/users/:uid", updateUser);
  app.delete("/users/:uid", deleteUser);

  app.post("/register", register);
  app.post("/login", login);
  app.post("/logout", logout);

  app.post("/profile/update", updateProfile);
  app.post("/profile", profile);
};

export default UsersController;
