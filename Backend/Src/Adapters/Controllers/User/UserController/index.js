import { registerController } from './registerController.js';
import {loginController}  from './loginController.js';
import { savePasswordController } from './savePasswordController.js';
import { getPasswordsController } from './getPasswordsController.js';

export default (dependencies)=>{
    return {
   
        // authController:authController(dependencies),
        registerController:registerController(dependencies),
        loginController:loginController(dependencies),
        savePasswordController:savePasswordController(dependencies),
        getPasswordsController:getPasswordsController(dependencies)

        
   
    } 
   
   } 