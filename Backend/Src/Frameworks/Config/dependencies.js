
import { userRepository } from "../Repository/index.js";
import { registerUseCase,loginUseCase,savePasswordUseCase,getPasswordUseCase } from "../../Application/index.js";




const useCase = {
    registerUseCase,
    loginUseCase,
    savePasswordUseCase,
    getPasswordUseCase
}
 

const repositery = { 
    userRepository   

}


export default {
    useCase, repositery
}

