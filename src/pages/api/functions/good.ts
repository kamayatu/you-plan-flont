import apiClient from "@/lib/apiClient";
//１つの投稿のすべてのいいね取得
export const getGoods = async (id: number) => {
  const result = await apiClient.get(`/good/${id}`);
  return result.data;
};
//いいね更新
export const updateGood = async (id: number) => {
  await apiClient.put(`/good/${id}`);
};
//一人のユーザーがいいねした投稿取得
export const getGoodPosts = async (id: number) => {
  const result = await apiClient.get(`good/user/${id}`);
  return result.data;
};
