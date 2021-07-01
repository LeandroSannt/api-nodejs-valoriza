import {Router} from "express"
import {CreateUserController} from './src/controllers/CreateUserController'
import {CreateTagController} from './src/controllers/CreateTagController'
import {CreateComplimentController} from './src/controllers/CreateComplimentController'
import {AuthenticateUserController} from "./src/controllers/AuthenticatUserController"

import  {ensureAdmin} from "./src/middlewares/ensureAdmin"
import  {ensureAuthenticated} from "./src/middlewares/ensureAuthenticated"


const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()

const authenticateUserController = new AuthenticateUserController()

router.post("/users", createUserController.handle)
router.post("/tags",ensureAuthenticated,ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated,createComplimentController.handle)


export { router }