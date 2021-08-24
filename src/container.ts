import Express = require('express')
import { createContainer, asClass } from 'awilix'
import { scopePerRequest } from 'awilix-express'
import { TestService } from './services/test.service'
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscripton.repository'

export default (app: Express.Application):void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    })

    container.register({
        //repositories
        suscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        
        //services
        testService: asClass(TestService).scoped()
    })

    app.use(scopePerRequest(container))
}