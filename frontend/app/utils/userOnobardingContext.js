"use client";

import { createContext, useContext, useState } from "react";

const UserOnboardingContext = createContext();

export function UserOnboardingProvider({ children }) {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    birthdate: "",
    city: "",
    phone_nr: "",
    looking_for: "",
    is_musician: false,
    business: null,
    created_at: "",
    updated_at: "",
  });

  const updateUser = (updates) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <UserOnboardingContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserOnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(UserOnboardingContext);
}
