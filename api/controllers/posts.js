// import model(s)
const PostModel = require('../models/Post')

// function get all posts records
/**
 * @param app: express()
 */
const controller = app => {
  app.get('/api/posts', (_, res) => {
    PostModel.find({})
      .then(data => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
  })
}
module.exports = controller
