"use client";

import { createContext, useContext, useState, useEffect } from "react";

const UserOnboardingContext = createContext();

// Helper functions for localStorage
const STORAGE_KEY_USER_DATA = "onboarding_user_data";
const STORAGE_KEY_MAX_STEP = "onboarding_max_step";

const loadFromStorage = (key, defaultValue) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

// Implement current step tracking and user data management
export function UserOnboardingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(() =>
    loadFromStorage(STORAGE_KEY_MAX_STEP, 1)
  );
  const [userData, setUserData] = useState(() => {
    const defaultData = {
      id: "",
      name: "",
      email: "",
      birthdate: "",
      city: "",
      phone_number: "",
      looking_for: null,
      is_musician: false,
      business: null,
      created_at: "",
      updated_at: "",
    };
    return loadFromStorage(STORAGE_KEY_USER_DATA, defaultData);
  });

  // Save userData to localStorage whenever it changes (skip initial render)
  // Exclude password and confirmPassword for security
  useEffect(() => {
    const { password, confirmPassword, ...dataToStore } = userData;
    saveToStorage(STORAGE_KEY_USER_DATA, dataToStore);
  }, [userData]);

  // Save maxStepReached to localStorage whenever it changes (skip initial render)
  useEffect(() => {
    saveToStorage(STORAGE_KEY_MAX_STEP, maxStepReached);
  }, [maxStepReached]);

  const updateUser = (updates) => {
    setUserData((prev) => {
      const newData = { ...prev, ...updates };
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
      return newData;
    });
  };

  // Will probably be used further in development.
  // const goToStep = (step) => {
  //   if (step <= maxStepReached) {
  //     setCurrentStep(step);
  //     return true;
  //   }
  //   return false;
  // };

  const advanceStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setMaxStepReached(Math.max(maxStepReached, nextStep));
  };

  const canAccessStep = (step) => {
    return step <= maxStepReached;
  };

  const clearOnboardingData = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY_USER_DATA);
      window.localStorage.removeItem(STORAGE_KEY_MAX_STEP);
    }
    setUserData({
      id: "",
      name: "",
      email: "",
      birthdate: "",
      city: "",
      phone_number: "",
      looking_for: null,
      is_musician: false,
      business: null,
      created_at: "",
      updated_at: "",
    });
    setMaxStepReached(1);
    setCurrentStep(1);
  };

  return (
    <UserOnboardingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        userData,
        updateUser,
        selectLookingFor,
        // goToStep,
        advanceStep,
        canAccessStep,
        maxStepReached,
        clearOnboardingData,
      }}
    >
      {children}
    </UserOnboardingContext.Provider>
  );
}

export function useOnboarding() {
  return useContext(UserOnboardingContext);
}
