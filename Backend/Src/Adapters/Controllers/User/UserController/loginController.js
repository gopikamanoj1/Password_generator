

import { verifyHashPassword } from "../../../../Utils/hashPassword.js";
import jwt from 'jsonwebtoken';

export const loginController = (dependencies) => {
  const { loginUseCase } = dependencies.useCase;
  return async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(req.body, "Received login request");

      const data = { email };
      const response = await loginUseCase(dependencies).executeFunction(data);
console.log(response,"in citro");
      if (response.status) {
        const isPasswordCorrect = await verifyHashPassword(password, response.data.data.hashedPassword);

        if (isPasswordCorrect) {
          const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

          res.json({ status: true, token, data: response });
        } else {
          res.json({ status: false, message: 'Incorrect password' });
        }
      } else {
        res.json({ status: false, message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.json({ status: false, message: 'An error occurred during login' });
    }
  };
};
