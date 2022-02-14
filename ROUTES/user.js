const app = (module.exports = require("express")());
const userController = require("../CONTROLLER/user");

app.post('/register', userController.register)
app.post('/login', userController.login)
app.post('/googlelogin', userController.loginGoogleUser)