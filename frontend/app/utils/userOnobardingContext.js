"use client";

import { createContext, useContext, useState } from "react";

const UserOnboardingContext = createContext();

export function UserOnboardingProvider({ children }) {
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
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
    setUserData((prev) => {
      const newData = { ...prev, ...updates };
      console.log("Updated userData:", newData);
      console.log("Updated userData:", JSON.stringify(newData));
      return newData;
    });
  };

  // Set a single "looking_for" value; clicking the same value again clears it
  const selectLookingFor = (value) => {
    setUserData((prev) => {
      const newData = {
        ...prev,
        looking_for: prev.looking_for === value ? "" : value,
      };
      console.log("selectLookingFor - updated userData:", newData);
      console.log("selectLookingFor - looking_for:", newData.looking_for);
      return newData;
    });
  };

  return (
    <UserOnboardingContext.Provider
      value={{ userData, updateUser, selectLookingFor }}
    >
      {children}
    </UserOnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(UserOnboardingContext);
}
