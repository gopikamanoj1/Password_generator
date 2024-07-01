

export default function getPasswordUseCase(dependencies) {
    const { userRepository } = dependencies.repositery;
  
    const executeFunction = async (data) => {
      try {
        const response = await userRepository.getPassword(data);
  
        if (response.status) {

          return { status: true, data: response.data };
        } else {
          return { status: false, data:response.data  };
        }
      } catch (error) {
        console.error("Error in save passowrd use case:", error);
        return { status: false, message: "Internal Server Error" };
      }
    };
  
    return { executeFunction };
  }
  