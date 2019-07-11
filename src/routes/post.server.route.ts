import { Express } from 'express'
import { postController } from '../controllers/post.server.controller'

export default class IndexRoute {
  constructor(app: Express) {
    app.route('/posts/').post(postController.create)
    app.route('/posts/').get(postController.index)
    app.route('/posts/:postId').get(postController.show)
    app.route('/posts/:postId').patch(postController.update)
    app.route('/posts/:postId').get(postController.delete)
  }
}
