import apiClient from "@/lib/apiClient";
//5つの投稿取得
export const fivePosts = async () => {
  const result = await apiClient.get("/posts/five/5");
  return result.data;
};
//すべての投稿取得
export const allPosts = async () => {
  const result = await apiClient.get("/posts");
  return result.data;
};
//１つの投稿取得
export const SelectPost = async (id: number) => {
  const result = await apiClient.get(`/posts/${id}`);
  return result.data;
};
//特定ユーザーのすべてのpost取得
export const userPosts = async (id: number) => {
  const result = await apiClient.get(`posts/user/${id}`);
  return result.data;
};
//投稿削除
export const deletePost = async (id: number) => {
  await apiClient.delete(`/posts/edit/${id}`);
};
//投稿作成
export const createPost = async (title: string, five: string, six: string, seven: string, eight: string, nine: string, ten: string, eleven: string, twelve: string, content: string) => {
  await apiClient.post("/posts", {
    title,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    content,
  });
};

//投稿修正
export const editPost = async (id: number, title: string, five: string, six: string, seven: string, eight: string, nine: string, ten: string, eleven: string, twelve: string, content: string) => {
  await apiClient.put(`/posts/edit/${id}`, {
    title,
    five,
    six,
    seven,
    eight,
    nine,
    ten,
    eleven,
    twelve,
    content,
  });
};
