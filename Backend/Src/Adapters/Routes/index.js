 // Src/Adapters/Routes/index.js

import express from "express";
import  {UserRoutes} from './UserRouter/index.js'

export const routes=(dependencies)=>{
    const routes = express()
    routes.use('/auth',UserRoutes(dependencies))
    
    return routes
}


