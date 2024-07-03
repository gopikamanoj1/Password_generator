

export const editPasswordsController = (dependencies) => {
    const { editPasswordsUseCase } = dependencies.useCase;
    return async (req, res) => {
      try {
        const {  email, password,_id } = req.body;
        const data = { 
            email:email,
            password:password,
            _id:_id
         }; 
         console.log(data,"data");
  
        const response = await editPasswordsUseCase(dependencies).executeFunction(data);
        console.log(response,"controller ");
  
        if (response.status) {
          
          res.json({ status: true, data: response.data });
        } else {
          res.json({ status: false, data: response.data });
        }
  
       
      } catch (error) {
        console.error("Error in editPasswordsController controller:", error);
        res.status(500).json({ status: false, message: "Internal Server Error" });
      }
    };
  };
  