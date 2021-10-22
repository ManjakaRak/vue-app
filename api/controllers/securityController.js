// bcrypt
const bcrypt = require('bcrypt')

// jwtToken
const jwt = require('jsonwebtoken')
const JWT_SIGN_SECRET = 'it5alooo000ngS1gNs3cr3tttf0SingM1111ToK3NnN'
const Admin = require('../models/User')

module.exports = {
  // get all admin
  getAdmins(req, res) {
    Admin.find({}, function (error, user) {
      if (error) {
        res.status(404).send(`There aren't users here\nError: ${error}`)
      }
      res.json(user)
    })
  },

  // register an admin
  registerAdmin(req, res) {

    // get request
    const reqData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    // check admin
    Admin.findOne({ name: reqData.name }, (error, user) => {
      if (error) {
        res.status(500).json('An error has happened')
      }
      if (!user) {
        bcrypt.hash(req.body.password, 5, (errorHash, hashedPwd) => {
          if (errorHash) {
            res.status(500).json('Error during hash operation')
          }
          reqData.password = hashedPwd
          const newUser = new Admin(reqData)
          newUser.save((errorOnSave, userSaved) => {
            if (errorOnSave) {
              res.status(500).json('Error on save')
            }
            res.json(userSaved)
          })
        })
      } else {
        res.status(409).json('username already taken')
      }
    })
  },

  // login
  loginAdmin(req, res) {
    // a login is needed for auth a user by jasonwebtoken method
    // check request
    const password = req.body.password
    Admin.findOne({ name: req.body.name }, (error, user) => {
      if (error) {
        res.status(400).json({message: 'Utilisateur introuble'})
      }
      if (user) {
        bcrypt.compare(password, user.password, (errorCompare, valid) => {
          if (errorCompare) {
            res.status(500).json({message: 'Une erreur est survenue'})
          }
          if (valid) {
            // create token for the log in user
            const userId = user._id
            // make the token by using JWT_SIGN_SECRET
            const token = jwt.sign({
              // attributes used for the payload
              userId: userId
            }, JWT_SIGN_SECRET)
            res.json({'token': token})
          } else {
            res.status(401).json({message: 'Votre mot de passe est incorrect'})
          }
        })
      } else {
        res.status(403).json({message: 'Utilisateur introuvable'})
      }
    })
  },
  // get user loged
  getAdmin(req, res) {
    if (req.user) {
      res.send(req.user)
    }
  }
}