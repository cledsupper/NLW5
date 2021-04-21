import { Router } from "express"
import { MessagesController } from "./controllers/MessagesController"
import { SettingsController } from "./controllers/SettingsController"
import { UsersController } from "./controllers/UsersController"

const routes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()

/**
 * Tipos de parâmetros
 * Routes Params => Parâmetros de rotas
 * https://localhost:3333/settings/1
 * Query Params => Filtros e buscas
 * https://localhost:3333/settings/1?search=adadef
 * Body Params => {
 *   key: value,
 *   ...
 * }
 */

routes.post("/settings", settingsController.create)
routes.post("/users", usersController.create)
routes.post("/messages", messagesController.create)

export { routes }