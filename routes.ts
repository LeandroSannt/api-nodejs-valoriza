import {Router} from "express"
import {CreateUserController} from './src/controllers/CreateUserController'
import {CreateTagController} from './src/controllers/CreateTagController'
import {CreateComplimentController} from './src/controllers/CreateComplimentController'
import {AuthenticateUserController} from "./src/controllers/AuthenticatUserController"

import  {ensureAdmin} from "./src/middlewares/ensureAdmin"
import  {ensureAuthenticated} from "./src/middlewares/ensureAuthenticated"
import { ListUserSendComplimentsController } from "./src/controllers/ListUserSendComplimentsController"
import { ListUserReceiveComplimentsController } from "./src/controllers/ListUserReceiveComplimentsController"
import { ListTagsController } from "./src/controllers/ListTagsController"

import { ListUsersController } from "./src/controllers/ListUsersController"


const router = Router()

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const createComplimentController = new CreateComplimentController()
const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiveComplimentsController()
const listUsersController = new ListUsersController()

const authenticateUserController = new AuthenticateUserController()

const listTagsController = new ListTagsController()


router.post("/users", createUserController.handle)
router.post("/tags",ensureAuthenticated,ensureAdmin, createTagController.handle)
router.post("/login", authenticateUserController.handle)
router.post("/compliments", ensureAuthenticated,createComplimentController.handle)

router.get("/users/compliments/send",ensureAuthenticated,listUserSendComplimentsController.handle)
router.get("/users/compliments/receiver",ensureAuthenticated,listUserReceiveComplimentsController.handle)

router.get("/tags",ensureAuthenticated,listTagsController.handle)
router.get("/users",ensureAuthenticated,listUsersController.handle)

export { router }