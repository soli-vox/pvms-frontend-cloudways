// tests/authService.test.js
import authService from "../services/authService";
import apiService from "../services/apiService";

// Mock apiService
jest.mock("../services/apiService");

describe("Auth Service", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("login success", async () => {
    const mockResponse = {
      data: {
        status: "success",
        message: "Login successful",
        data: {
          token: "mock-token",
          user: { id: 1, name: "Test User" },
        },
      },
    };
    apiService.post.mockResolvedValue(mockResponse);

    const result = await authService.login("test@example.com", "password");

    expect(result.success).toBe(true);
    expect(localStorage.getItem("token")).toBe("mock-token");
    expect(apiService.post).toHaveBeenCalledWith("/login", {
      email: "test@example.com",
      password: "password",
    });
  });

  test("login failure", async () => {
    const mockError = {
      response: {
        data: {
          message: "Invalid credentials",
        },
      },
    };
    apiService.post.mockRejectedValue(mockError);

    const result = await authService.login("wrong@example.com", "wrongpass");

    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid credentials");
  });

  // Add similar tests for other methods
});

if (import.meta.env.MODE === "development") {
  (async () => {
    console.log("Running auth service tests...");

    try {
      // Test login
      const loginResult = await authService.login(
        "admin@example.com",
        "password"
      );
      console.log("Login test:", loginResult);

      if (loginResult.success) {
        // Test current user
        const userResult = await authService.getCurrentAuthUser();
        console.log("Current user test:", userResult);

        // Test logout
        await authService.logout();
        console.log("Logout test completed");
      }
    } catch (error) {
      console.error("Test failed:", error);
    }
  })();
}
