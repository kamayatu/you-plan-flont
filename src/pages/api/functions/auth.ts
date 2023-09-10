import apiClient from "@/lib/apiClient";

export const createAccount = async (username: string, email: string, password: string) => {
  await apiClient.post("/api/auth/register", {
    username,
    email,
    password,
  });
};

export const loginApi = async (email: string, password: string) => {
  const result = await apiClient.post("/api/auth/login", {
    email,
    password,
  });
  return result.data;
};
