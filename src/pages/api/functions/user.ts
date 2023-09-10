import apiClient from "@/lib/apiClient";
//プロフィール取得
export const SelectProfile = async (id: number) => {
  const result = await apiClient.get(`users/profile/${id}`);
  return result.data;
};
//プロフィール編集
export const updateBio = async (id: number, bio: string) => {
  const result = await apiClient.put(`/users/profile/${id}`, {
    bio,
  });
  return result.data;
};

export const findUser = async () => {
  const result = await apiClient.get("/users/find");
  return result.data;
};
