const express = require('express')
const securityController = require('../controllers/securityController')
//verify token
const userVerified = require('../utils/verifyToken')
const router = express.Router()

// security routes
router.get('/api/admins', userVerified,securityController.getAdmins)
router.post('/api/admin/add', securityController.registerAdmin)
router.post('/api/admin/login', securityController.loginAdmin)
router.get('/api/admin',userVerified, securityController.getAdmin)

module.exports = router