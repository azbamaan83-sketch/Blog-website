import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Safe JSON Parse
  const safeParse = (data, fallback) => {
    try {
      return JSON.parse(data) || fallback;
    } catch {
      return fallback;
    }
  };

  // Load User from LocalStorage
  useEffect(() => {
    const storedUser = safeParse(
      localStorage.getItem("user"),
      null
    );

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // SIGNUP
  const signup = (name, email, password) => {
    // Validation
    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Get Users
    const users = safeParse(
      localStorage.getItem("users"),
      []
    );

    // Check Existing User
    const exists = users.find(
      (u) =>
        u.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    // New User
    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      password,
    };

    // Save Users
    const updatedUsers = [...users, newUser];

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    // Update State
    setUser(newUser);

    return {
      success: true,
      message: "Signup successful",
    };
  };

  // LOGIN
  const login = (email, password) => {
    // Validation
    if (!email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Get Users
    const users = safeParse(
      localStorage.getItem("users"),
      []
    );

    // Find User
    const validUser = users.find(
      (u) =>
        u.email.toLowerCase() ===
        email.toLowerCase() &&
        u.password === password
    );

    if (!validUser) {
      return {
        success: false,
        message: "Invalid email or password",
      };
    }

    // Save Logged User
    localStorage.setItem(
      "user",
      JSON.stringify(validUser)
    );

    setUser(validUser);

    return {
      success: true,
      message: "Login successful",
    };
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};