import validateAccount from "./account";

describe("Create New Account Page Tests", () => {
   let testUser;

   beforeEach(() => {
      testUser = {
         firstName: "John",
         lastName: "Doe",
         email: "john@example.com",
         dob: "01/01/1990",
         pass: "SecurePass123!",
         confirm: "SecurePass123!",
      };
   });

   afterEach(() => {
      testUser = null;
   });


});
