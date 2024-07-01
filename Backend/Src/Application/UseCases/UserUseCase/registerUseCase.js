export default function registerUseCase(dependencies) {
  const { userRepository } = dependencies.repositery;

  const executeFunction = async (data) => {
    try {
      const userExists = await userRepository.findUserByEmail(data.email);

      if (userExists) {
        return { status: false, data: "User already exists" };
      } else {
        const newUser = await userRepository.registerUser(data);
        return { status: true, data: newUser };
      }
    } catch (error) {
      console.error("Error in register use case:", error);
      return { status: false, message: "Internal Server Error" };
    }
  };

  return { executeFunction };
}
