

export const savePasswordController = (dependencies) => {
  const { savePasswordUseCase } = dependencies.useCase;
  return async (req, res) => {
    try {
      const { password, email } = req.body;
      
      const data = { 
         password: password,
         email:email

       }; 
       console.log(data,"fdata in new saved generated password")

      const response = await savePasswordUseCase(dependencies).executeFunction(data);

      if (response.status) {
        
        res.json({ status: true, data: response.data });
      } else {
        res.json({ status: false, data: response.data });
      }

     
    } catch (error) {
      console.error("Error in save password controller:", error);
      res.status(500).json({ status: false, message: "Internal Server Error" });
    }
  };
};
