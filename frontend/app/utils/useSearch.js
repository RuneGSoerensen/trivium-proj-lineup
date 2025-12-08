'use client';
import { useEffect, useRef, useState } from "react";

export function useSearch({
        endpoint = "/search",
        minLength = 1,
        debounceMs = 300,
        initialQuery = "",
        enabled = true,
        mapResponse,
} = {}) {
    // Current query string
    const [query, setQuery] = useState(initialQuery);
    // Raw or mapped results from API
    const [results, setResults] = useState(null);
    //Loading and error states
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Basic in-memory recent search historu
    const [recentSearches, setRecentSearches] = useState([]);
    // Ref for debounce timer
    const debounceRef = useRef(null);

    useEffect(() => {
        if (!enabled) return;

        const trimmed = query.trim();
        // If query too short, reset results and return (do not call api)
        if (!trimmed || trimmed.length < minLength) {
            setResults(null);
            setIsLoading(false);
            setError(null);
            return;
        }

        setIsLoading(true);
        setError(null);

        // Clear previous debounce timer (if any)
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        // Debounce API call
        debounceRef.current = setTimeout(async () => {
            try {
                const response = await fetch(
                    `${endpoint}?query=${encodeURIComponent(trimmed)}`
                )

                if (!response.ok) {
                    throw new Error(`Search failed with status ${response.status}`);
                }

                const data = await response.json();
                
                // Allow the caller to remap into a custom shape
                const mapped = mapResponse ? mapResponse(data, trimmed) : data;
                setResults(mapped);

                // Update recent searches (max 5 unique entries)
                setRecentSearches((prev) => {
                    const next = [trimmed, ...prev.filter((item) => item !== trimmed)];
                    return next.slice(0, 5);
                });
            } catch (error) {
                console.error("Error during search:", error);
                setError(error.message || "An error occurred during search");
            } finally {
                setIsLoading(false);
            }
        }, debounceMs);

        // Cleanup debounce on unmount or query change
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        }
    },[query, enabled, endpoint, minLength, debounceMs, mapResponse]);

    // Helper functions
    const clearResults = () => setResults(null);
    const clearHistory = () => setRecentSearches([]);
    
    return {
        query,
        setQuery,
        results,
        isLoading,
        error,
        recentSearches,
        clearResults,
        clearHistory,
    }

}