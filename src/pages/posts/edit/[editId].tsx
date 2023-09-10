import { selectPost, editPost } from "@/pages/api/functions/post";
import { postType } from "@/types";
import { GetServerSidePropsContext, PreviewData } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useState } from "react";

interface Props {
  post: postType;
}

export const getServerSideProps = async (context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
  const editIdQueryParam = Array.isArray(context.query.editId) ? context.query.editId[0] : context.query.editId || "";
  const editId = parseInt(editIdQueryParam);
  try {
    const targetPost = await selectPost(editId);
    return {
      props: {
        post: targetPost,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

const EditPost = ({ post }: Props) => {
  const [title, setTitle] = useState<string>(post.title);
  const [five, setFive] = useState<string>(post.five);
  const [six, setSix] = useState<string>(post.six);
  const [seven, setSeven] = useState<string>(post.seven);
  const [eight, setEight] = useState<string>(post.eight);
  const [nine, setNine] = useState<string>(post.nine);
  const [ten, setTen] = useState<string>(post.ten);
  const [eleven, setEleven] = useState<string>(post.eleven);
  const [twelve, setTwelve] = useState<string>(post.twelve);
  const [content, setContent] = useState<string>(post.content);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await editPost(post.id, title, five, six, seven, eight, nine, ten, eleven, twelve, content);
      alert("変更しました。");
      router.push(`/profile/${post.authorId}`);
    } catch (err) {
      console.log(err);
      return alert("権限がありません");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 m-16 bg-slate-50 p-10 rounded-md">
        <h2 className="text-2xl">編集ページ</h2>
        <label className="block">
          <span className="text-gray-700">タイトル</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">17:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={five} onChange={(e) => setFive(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">18:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={six} onChange={(e) => setSix(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">19:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={seven} onChange={(e) => setSeven(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">20:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={eight} onChange={(e) => setEight(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">21:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={nine} onChange={(e) => setNine(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">22:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={ten} onChange={(e) => setTen(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">23:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={eleven} onChange={(e) => setEleven(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">24:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={twelve} onChange={(e) => setTwelve(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">内容説明</span>
          <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows={3} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>
        <div className="block mx-auto">
          <div className="mt-2">
            <button type="submit" className="bg-blue-300 rounded-md h-10 w-20  my-4 mx-auto">
              編集
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
