import { Express } from 'express'
import { postController } from '../controllers/post.server.controller'

export default class IndexRoute {
  constructor(app: Express) {
    app.route('/posts/').post(postController.create)
    app.route('/posts/').get(postController.index)
    app.route('/posts/:postID').get(postController.show)
    app.route('/posts/:postID').patch(postController.update)
    app.route('/posts/:postID').delete(postController.delete)
  }
}
