import { postType } from "@/types";
import Link from "next/link";
import React, { useState } from "react";

interface Props {
  pageCount: number;
}

const Pagenation = (props: Props) => {
  let pages: number[] = [];
  for (let i = 1; i <= props.pageCount; i++) {
    pages.push(i);
  }
  return (
    // <div>
    //   <div className="min-h-screen py-8">
    //     <main className="lg:grid grid-cols-2 mx-4">
    //       {currentPosts.map((post: any) => (
    //         <PagenationPosts key={post.id} post={post} />
    //       ))}
    //     </main>
    //   </div>
    // </div>

    <section className="mb-8 lg:w-1/2 mx-auto rounded-md p-5">
      <ul className="flex items-center justify-center gap-4">
        {pages.map((page) => (
          <li className="bg-sky-900 rounded-lg w-6 h-8 relative" key={page}>
            <Link href={`/posts/Page/${page}`} className="text-xs absolute top-2/4 -translate-x-2/4 -translate-y-2/4 left-2/4 text-gray-100">
              {page}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Pagenation;
