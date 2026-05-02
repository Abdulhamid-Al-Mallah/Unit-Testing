function validateAccount(firstName, lastName, email, dob, password, confirmPassword) {

   if (!firstName || !lastName || !email || !dob || !password || !confirmPassword) {
      return "All fields are required";
   }

   if (firstName.length < 3 || lastName.length < 3) {
      return "First name and last name must be at least 3 characters long";
   }
   return "Success";
}

export default validateAccount;