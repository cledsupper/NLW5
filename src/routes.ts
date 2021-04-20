import { Router } from "express"
import { SettingsController } from "./controllers/SettingsController"

const routes = Router()

const settingsController = new SettingsController()

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

export { routes }