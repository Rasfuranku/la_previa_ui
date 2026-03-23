import { describe, it, expect } from "vitest";
import { LoginSchema, RegisterSchema } from "./auth.schema";

describe("Auth Schemas", () => {
  describe("LoginSchema", () => {
    it("should validate a valid email and password", () => {
      const result = LoginSchema.safeParse({
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("should fail on invalid email", () => {
      const result = LoginSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        // ZodError exposes issues
        expect(result.error.issues[0].message).toBe("Invalid email address");
      }
    });

    it("should fail on empty password", () => {
      const result = LoginSchema.safeParse({
        email: "test@example.com",
        password: "",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("RegisterSchema", () => {
    it("should validate a valid registration", () => {
      const result = RegisterSchema.safeParse({
        email: "newuser@example.com",
        password: "securepassword",
      });
      expect(result.success).toBe(true);
    });

    it("should fail on short password", () => {
      const result = RegisterSchema.safeParse({
        email: "newuser@example.com",
        password: "short",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
         expect(result.error.issues[0].message).toBe("Password must be at least 8 characters long");
      }
    });
  });
});