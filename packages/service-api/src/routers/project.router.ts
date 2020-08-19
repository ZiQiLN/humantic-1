import { Router } from 'express'
import { ProjectController } from '@humantic/controller'

export class ProjectRouter {
	public router: Router
	public controller: ProjectController = new ProjectController()
	/**
	 *
	 */
	constructor() {
		// eslint-disable-next-line new-cap
		this.router = Router()
		this.routes()
	}

	public routes() {
		this.router.get('/', this.controller.getProject)
		this.router.post('/', this.controller.createProject)
	}
}
