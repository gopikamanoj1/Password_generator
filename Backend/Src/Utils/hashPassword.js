import bcrypt from 'bcryptjs';

 export const hashPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Error hashing password');
    }
  };

  
  export const verifyHashPassword = async (password, hashedPassword) => {
    try {
      console.log(password, hashedPassword, "comparing");
      const match = await bcrypt.compare(password, hashedPassword);
      return match;
    } catch (error) {
      throw new Error('Error verifying password');
    }
  };
  
