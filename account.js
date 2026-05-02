function validateAccount(firstName, lastName, email, dob, password, confirmPassword) {
   if (!firstName || !lastName || !email || !dob || !password || !confirmPassword) {
      return "All fields are required";
   }

   if (firstName.length < 3 || lastName.length < 3) {
      return "First name and last name must be at least 3 characters long";
   }

   const nameRegex = /^[a-zA-Z\s-]+$/;
   if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return "Names should only contain letters";
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
      return "Invalid email format";
   }

   if (password.length < 8) {
      return "Password too short";
   }

   const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])/;
   if (!passwordRegex.test(password)) {
      return "Password must contain at least one number and one special character and one capital letter";
   }

   if (password !== confirmPassword) {
      return "Passwords do not match";
   }

   return "Success";
}

export default validateAccount;
