const db = require("../models");
const config = require("../config/auth.config");
const mongoose =require('mongoose')
const User = db.user;
const Product = db.product;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.user_Id) {
        user.findAll({
          where: {
            name: {
             username: req.body.user_Id
            }
          }
        }).then(user => {
          user.setUser(user).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
       var authorities = [];
 
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.findAll = (req, res) => {
  Product.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while authenticating Users information"
      });
    });
};