"use client";

import { createContext, useContext, useState } from "react";

const UserOnboardingContext = createContext();
// Implement current step tracking and user data management
export function UserOnboardingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    birthdate: "",
    city: "",
    phone_number: "",
    looking_for: null,
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
        looking_for: prev.looking_for === value ? null : value,
      };
      console.log("selectLookingFor - updated userData:", newData);
      console.log("selectLookingFor - looking_for:", newData.looking_for);
      return newData;
    });
  };

  const goToStep = (step) => {
    if (step <= maxStepReached) {
      setCurrentStep(step);
      return true;
    }
    return false;
  };

  const advanceStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxStepReached(Math.max(maxStepReached, nextStep));
  };

  const canAccessStep = (step) => {
    return step <= maxStepReached;
  };

  return (
    <UserOnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        userData,
        updateUser,
        selectLookingFor,
        goToStep,
        advanceStep,
        canAccessStep,
        maxStepReached,
      }}
    >
      {children}
    </UserOnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(UserOnboardingContext);
}
