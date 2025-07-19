"use client";

import { useEffect } from "react";

export function ErrorHandler() {
  useEffect(() => {
    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      
      // Prevent the default browser behavior
      event.preventDefault();
      
      // You can add additional error reporting here
      // For example, send to an error tracking service
    };

    // Handle unhandled errors
    const handleError = (event: ErrorEvent) => {
      console.error("Unhandled error:", event.error);
      
      // Prevent the default browser behavior
      event.preventDefault();
    };

    // Add event listeners
    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    // Cleanup
    return () => {
      window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      window.removeEventListener("error", handleError);
    };
  }, []);

  return null;
} 