// export default function loginUseCase(dependencies) {
//     const { userRepository } = dependencies.repositery;
  
//     const executeFunction = async (data) => {
//       try {
//         // Check if user already exists
//         const response = await userRepository.loginUser(data.email);
  
//         if (response) {
//           console.log(response,"response");
//             return { status: true, data: response };
//         } else {
//           console.log(response,"response1");

//          return {status: false , data : response.data}
//         }
//       } catch (error) {
//         console.error("Error in login use case:", error);
//         return { status: false, message: "Internal Server Error" };
//       }
//     };
  
//     return { executeFunction };
//   }
  


export default function loginUseCase(dependencies) {
  const { userRepository } = dependencies.repositery;

  const executeFunction = async (data) => {
    try {
      // Check if user already exists
      const response = await userRepository.loginUser(data.email);

      if (response.status) {
        console.log(response,"res in usecase");
        console.log(response, "response");
        return { status: true, data: response };
      } else {
        console.log(response, "response1");
        return { status: false, message: "User not found" };
      }
    } catch (error) {
      console.error("Error in login use case:", error);
      return { status: false, message: "Internal Server Error" };
    }
  };

  return { executeFunction };
}
