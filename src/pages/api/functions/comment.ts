import apiClient from "@/lib/apiClient";

export const getComments = async (id: number) => {
  const result = await apiClient.get(`/comment/${id}`);
  return result.data;
};

export const createComment = async (id: number, content: string) => {
  const newComment = await apiClient.post(`/comment/${id}`, {
    comment: content,
  });
  return newComment.data;
};

export const deleteComment = async (id: number) => {
  await apiClient.delete(`/comment/${id}`);
};
