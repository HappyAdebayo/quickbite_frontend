import { useState } from "react";
import api from "../api";

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = async (method, url, data = null, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Accept: "application/json", // ✅ REQUIRED for Sanctum
        ...options.headers,
      };

      const token = localStorage.getItem("token");
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      // ❌ DO NOT set Content-Type for FormData
      if (!(data instanceof FormData)) {
        headers["Content-Type"] = "application/json";
      }

      const response = await api({
        method,
        url,
        data,
        headers,
      });

      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, error };
};
