function validateAccount(firstName, lastName, email, dob, password, confirmPassword) {

   if (!firstName || !lastName || !email || !dob || !password || !confirmPassword) {
      return "All fields are required";
   }
   
   return "Success";
}

export default validateAccount;