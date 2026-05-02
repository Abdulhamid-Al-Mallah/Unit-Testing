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

   test("Case 1: Valid input returns Success (Equivalence Partitioning)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Success");
   });

   test("Case 2: Missing First Name (Invalid Partition)", () => {
      const result = validateAccount("", testUser.lastName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("All fields are required");
   });
});
