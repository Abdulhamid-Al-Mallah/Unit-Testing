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

   test("Case 1: Valid input returns Success (EP)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Success");
   });

   test("Case 2: Password Mismatch (EP)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, testUser.dob, "SecurePass1!", "SecurePass2!");
      expect(result).toBe("Passwords do not match");
   });

   test("Case 3: Invalid Email format - No @ (EP)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, "invalidemail", testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Invalid email format");
   });

   test("Case 4: Invalid Email format - Only @ (EP)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, "@", testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Invalid email format");
   });

   test("Case 5: Numbers in Name (EP)", () => {
      const result = validateAccount("John123", testUser.lastName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Names should only contain letters");
   });

   test("Case 6: Password missing complexity (EP)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, testUser.dob, "OnlyLetters", "OnlyLetters");
      expect(result).toBe("Password must contain at least one number and one special character and one capital letter");
   });

   test("Case 7: Empty Email (EP)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, "", testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("All fields are required");
   });

   test("Case 8: Password 7 chars (BVA)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, testUser.dob, "1234567", "1234567");
      expect(result).toBe("Password too short");
   });

   test("Case 9: Password 8 chars (BVA)", () => {
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, testUser.dob, "SecurePass1!", "SecurePass1!");
      expect(result).toBe("Success");
   });

   test("Case 10: First Name 2 chars (BVA)", () => {
      const result = validateAccount("Ab", testUser.lastName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("First name and last name must be at least 3 characters long");
   });

   test("Case 11: Last Name 2 chars (BVA)", () => {
      const result = validateAccount(testUser.firstName, "Sy", testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("First name and last name must be at least 3 characters long");
   });

   test("Case 12: Name 3 chars (BVA)", () => {
      const result = validateAccount("Joe", "Doe", testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Success");
   });

   test("Case 13: Missing First Name (Invalid Partition)", () => {
      const result = validateAccount("", testUser.lastName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("All fields are required");
   });

   test("Case 14: SQL Injection Attempt (Hacker)", () => {
      const result = validateAccount("' OR '1'='1", testUser.lastName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Names should only contain letters");
   });

   test("Case 15: Extremely long Last Name (Stress)", () => {
      const longName = "a".repeat(1000);
      const result = validateAccount(testUser.firstName, longName, testUser.email, testUser.dob, testUser.pass, testUser.confirm);
      expect(result).toBe("Success");
   });
});
 test("Case 11: Future Date of Birth (BVA - Boundary)", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dobStr = tomorrow.toISOString().split("T")[0];
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, dobStr, testUser.pass, testUser.confirm);
      expect(result).toBe("Date of birth cannot be in the future");
   });

   test("Case 12: Today as Date of Birth (BVA - Invalid)", () => {
      const today = new Date().toISOString().split("T")[0];
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, today, testUser.pass, testUser.confirm);
      expect(result).toBe("User must be at least 18 years old");
   });
   test("Case 19: Age 17 (BVA - Below Boundary)", () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 17);
      const dobStr = date.toISOString().split("T")[0];
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, dobStr, testUser.pass, testUser.confirm);
      expect(result).toBe("User must be at least 18 years old");
   });
    test("Case 20: Age 18 Exactly (BVA - On Boundary)", () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 18);
      const dobStr = date.toISOString().split("T")[0];
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, dobStr, testUser.pass, testUser.confirm);
      expect(result).toBe("Success");
   });

   test("Case 21: Age 19 (BVA - Above Boundary)", () => {
      const date = new Date();
      date.setFullYear(date.getFullYear() - 19);
      const dobStr = date.toISOString().split("T")[0];
      const result = validateAccount(testUser.firstName, testUser.lastName, testUser.email, dobStr, testUser.pass, testUser.confirm);
      expect(result).toBe("Success");
   });
    