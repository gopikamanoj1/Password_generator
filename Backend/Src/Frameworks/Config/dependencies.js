
import { userRepository } from "../Repository/index.js";
import { registerUseCase,loginUseCase,savePasswordUseCase,getPasswordUseCase,editPasswordsUseCase, deletePasswordUseCase } from "../../Application/index.js";




const useCase = {
    registerUseCase,
    loginUseCase,
    savePasswordUseCase,
    getPasswordUseCase,
    editPasswordsUseCase,
    deletePasswordUseCase
}
 

const repositery = { 
    userRepository   

}


export default {
    useCase, repositery
}

