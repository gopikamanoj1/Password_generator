// Src/Adapters/Routes/index.js
import express from "express";
import { UserController } from "../../Controllers/index.js";

export const UserRoutes = (dependencies) => {
  const router = express();

  // ===============================================================================================
  // USER ROUTES
  // ===============================================================================================
  const { registerController,loginController,savePasswordController ,getPasswordsController} = UserController(dependencies);
  // router.post("/login", authController);
  router.post('/register',registerController)
  router.post('/login', loginController)
  router.post('/savePassword',savePasswordController)
  router.post('/getPasswords',getPasswordsController)
  

  return router;
};
