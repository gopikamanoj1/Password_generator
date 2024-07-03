import { registerController } from './registerController.js';
import {loginController}  from './loginController.js';
import { savePasswordController } from './savePasswordController.js';
import { getPasswordsController } from './getPasswordsController.js';
import {editPasswordsController} from  './editPasswordsController.js';
import {deletePasswordController} from './deletePasswordController.js'

export default (dependencies)=>{
    return {
   
        registerController:registerController(dependencies),
        loginController:loginController(dependencies),
        savePasswordController:savePasswordController(dependencies),
        getPasswordsController:getPasswordsController(dependencies),
        editPasswordsController:editPasswordsController(dependencies),
        deletePasswordController:deletePasswordController(dependencies)


        
   
    } 
   
   } 