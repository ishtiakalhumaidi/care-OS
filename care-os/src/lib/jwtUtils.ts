export const jwtUtils = {
  decodeEdgeSafe: (token: string) => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) return null;
      
      const payload = parts[1];
      // Convert base64url to standard base64
      const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
      
      // Decode base64 using atob (natively supported in Edge)
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Token decoding failed:", error);
      return null;
    }
  },
};