

export const getPasswordsController = (dependencies) => {
    const { getPasswordUseCase } = dependencies.useCase;
    return async (req, res) => {
      try {
        const {  email } = req.body;
        
        const data = { 
           email:email
  
         }; 
         console.log(data,"fdata in new saved generated password")
  
        const response = await getPasswordUseCase(dependencies).executeFunction(data);
  
        if (response.status) {
          
          res.json({ status: true, data: response.data });
        } else {
          res.json({ status: false, data: response.data });
        }
  
       
      } catch (error) {
        console.error("Error in get password controller:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    };
  };
  