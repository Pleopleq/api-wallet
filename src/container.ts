import Express = require('express')
import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { TestService } from './services/test.service'

export default (app: Express.Application):void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    })

    container.register({
        testService: asClass(TestService).scoped()
    })

    app.use(scopePerRequest(container))
}