import React, { useState } from "react";
import { createPost } from "./api/functions/post";

const post = () => {
  const [completeState, setCompleteState] = useState(true);
  const [title, setTitle] = useState<string>("");
  const [five, setFive] = useState<string>("");
  const [six, setSix] = useState<string>("");
  const [seven, setSeven] = useState<string>("");
  const [eight, setEight] = useState<string>("");
  const [nine, setNine] = useState<string>("");
  const [ten, setTen] = useState<string>("");
  const [eleven, setEleven] = useState<string>("");
  const [twelve, setTwelve] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createPost(title, five, six, seven, eight, nine, ten, eleven, twelve, content);
      alert("新規プランを追加しました。");
    } catch (err) {
      alert("ログインしてください");
    }
  };

  return (
    <div>
      <form
        className="grid grid-cols-1 gap-6 m-16 bg-slate-50 p-10 rounded-md"
        onSubmit={
          completeState
            ? handleSubmit
            : (e) => {
                e.preventDefault();
              }
        }
      >
        <h2 className="text-2xl">新規投稿</h2>
        <label className="block">
          <span className="text-gray-700">タイトル</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label className="block">
          <span className="text-gray-700">17:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={five} onChange={(e) => setFive(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>
        <label className="block">
          <span className="text-gray-700">18:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={six} onChange={(e) => setSix(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>
        <label className="block">
          <span className="text-gray-700">19:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={seven} onChange={(e) => setSeven(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>
        <label className="block">
          <span className="text-gray-700">20:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={eight} onChange={(e) => setEight(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>
        <label className="block">
          <span className="text-gray-700">21:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={nine} onChange={(e) => setNine(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>
        <label className="block">
          <span className="text-gray-700">22:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={ten} onChange={(e) => setTen(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>
        <label className="block">
          <span className="text-gray-700">23:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={eleven} onChange={(e) => setEleven(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>
        <label className="block">
          <span className="text-gray-700">24:00</span>
          <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" value={twelve} onChange={(e) => setTwelve(e.target.value)} onBlur={() => setCompleteState(true)} onFocus={() => setCompleteState(false)} />
        </label>

        <label className="block">
          <span className="text-gray-700">内容説明</span>
          <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" rows={3} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </label>

        <div className="block mx-auto">
          <div className="mt-2">
            <button type="submit" className="bg-blue-300 rounded-md h-10 w-20  my-4 mx-auto">
              作成
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default post;
