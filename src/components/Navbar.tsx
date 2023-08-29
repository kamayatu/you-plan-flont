import { useAuth } from "../context/Auth";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { logout, user } = useAuth();
  return (
    <header className="bg-orange-300 text-white px-4">
      <div className="container flex justify-between items-center py-3 mx-auto">
        <h1 className="font-bold text-2xl">
          <Link href="/">ユウプラン</Link>
        </h1>
        <nav>
          {user ? (
            <ul className="flex justify-between space-x-4">
              <li className="bg-sky-500 rounded-xl p-2">
                <Link href="/post">新規作成</Link>
              </li>
              <li className="bg-sky-500 rounded-xl p-2">
                <Link href={`/profile/${user.id}`}>プロフィール</Link>
              </li>
              <li className="bg-sky-500 rounded-xl p-2">
                <button onClick={logout}>ログアウト</button>
              </li>
            </ul>
          ) : (
            <ul className="flex justify-between space-x-4">
              <li className="bg-sky-500 rounded-xl p-2">
                <Link href="/login">ログイン</Link>
              </li>
              <li className="bg-sky-500 rounded-xl p-2">
                <Link href="/signup">サインアップ</Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
