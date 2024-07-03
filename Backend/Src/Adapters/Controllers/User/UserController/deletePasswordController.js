

export const deletePasswordController = (dependencies) => {
    const { deletePasswordUseCase } = dependencies.useCase;
    return async (req, res) => {
      try {
        const {   passwordId } = req.body;
        const data = { 
            passwordId:passwordId
         }; 
         console.log(data,"data kko");
  
        const response = await deletePasswordUseCase(dependencies).executeFunction(data);
        console.log(response,"controller ");
  
        if (response.status) {
          
          res.json({ status: true, data: response.data });
        } else {
          res.json({ status: false, data: response.data });
        }
  
       
      } catch (error) {
        console.error("Error in deletePassword controller:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    };
  };
  