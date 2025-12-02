/**
 * API utility functions for making requests to the backend
 * Base URL for the backend API
 */

import { authenticatedFetch } from "./auth";

const API_BASE_URL = "http://localhost:3300";

/**
 * Create a new user (no authentication required)
 */
export const createUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create user");
  }

  return response.json();
};

/**
 * Get user profile (requires authentication)
 */
export const getUserProfile = async (userId) => {
  const response = await authenticatedFetch(`${API_BASE_URL}/user/${userId}`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch user profile");
  }

  return response.json();
};

/**
 * Update user profile (requires authentication)
 */
export const updateUserProfile = async (userId, userData) => {
  const response = await authenticatedFetch(`${API_BASE_URL}/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update user profile");
  }

  return response.json();
};

/**
 * Fetch conversations for the authenticated user
 */
export const fetchThreads = async () => {
  const response = await authenticatedFetch(`${API_BASE_URL}/threads`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch threads");
  }

  return response.json();
};

/**
 * Send a message in a conversation
 */
export const sendMessage = async (threadId, messageData) => {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/threads/${threadId}/messages`,
    {
      method: "POST",
      body: JSON.stringify(messageData),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to send message");
  }

  return response.json();
};
