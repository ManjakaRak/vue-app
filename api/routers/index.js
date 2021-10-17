const express = require('express')
const securityController = require('../controllers/securityController')
const router = express.Router()

// security routes
router.get('/api/admins', securityController.getAdmins)
router.post('/api/admin/add', securityController.registerAdmin)
router.post('/api/admin/login', securityController.loginAdmin)
router.get('/api/admin', securityController.getAdmin)

module.exports = router