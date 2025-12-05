/**
 * API utility functions for making requests to the backend
 * Base URL for the backend API
 */

import { authenticatedFetch } from "./auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3300";

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
  const response = await authenticatedFetch(`${API_BASE_URL}/chat/threads`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch threads");
  }

  return response.json();
};

/**
 * Create a chat thread (1:1 or group)
 */
export const createThread = async (threadData) => {
  const response = await authenticatedFetch(`${API_BASE_URL}/chat/threads`, {
    method: "POST",
    body: JSON.stringify(threadData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create thread");
  }

  return response.json();
};

/**
 * Create group chat thread
 */
export const createGroupThread = async (groupData) => {
  const response = await authenticatedFetch(`${API_BASE_URL}/chat/threads`, {
    method: "POST",
    body: JSON.stringify(groupData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create group thread");
  }

  return response.json();
};

/**
 * Get messages in a conversation
 */
export const fetchMessages = async (threadId) => {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/chat/threads/${threadId}/messages`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch messages");
  }

  return response.json();
};

/**
 * Send a message in a conversation
 */
export const sendMessage = async (threadId, messageData) => {
  const response = await authenticatedFetch(
    `${API_BASE_URL}/chat/threads/${threadId}/messages`,
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

/**
 * Create a new note (requires authentication)
 */
export const createNote = async (noteData) => {
  const response = await authenticatedFetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(noteData),
  });

  if (!response.ok) {
    let error;
    try {
      error = await response.json();
    } catch (e) {
      console.error("Failed to parse error response:", response.statusText);
      throw new Error(`Failed to create note: ${response.statusText}`);
    }
    console.error("Backend error:", error);
    const errorMessage =
      error.message ||
      (error.error ? JSON.stringify(error.error) : "Failed to create note");
    throw new Error(errorMessage);
  }

  return response.json();
};

/**
 * Fetch notes for the authenticated user
 */
export const fetchNotes = async () => {
  const response = await authenticatedFetch(`${API_BASE_URL}/notes`, {
    method: "GET",
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch notes");
  }

  return response.json();
};
