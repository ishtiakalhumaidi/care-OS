/* eslint-disable @typescript-eslint/no-explicit-any */

export const getApiErrorMessage = (error: unknown, fallbackMessage = "An unexpected error occurred."): string => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as any).response;
    const data = response?.data;

    if (data?.errorSources && Array.isArray(data.errorSources) && data.errorSources.length > 0) {
      return data.errorSources[0].message;
    }

    // Check for standard top-level backend message
    if (data?.message && typeof data.message === "string") {
      return data.message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};