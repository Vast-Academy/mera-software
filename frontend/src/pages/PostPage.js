// src/pages/PostPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../data/posts";

export default function PostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-2 text-slate-600">
          We couldn’t find that article. <Link to="/blog" className="text-teal-700">Back to blog</Link>.
        </p>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50">
      <header className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-teal-100 text-sm">{post.category}</p>
          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">{post.title}</h1>
          <p className="mt-2 text-teal-100 text-sm">
            {new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" })} • {post.readingTime} min read
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <img src={post.image} alt="" className="mb-6 w-full rounded-2xl object-cover" />

        {/* Simple content renderer (paragraphs) */}
        <div className="prose prose-slate max-w-none">
          {post.content
            .trim()
            .split("\n")
            .map((line, i) =>
              line.trim().startsWith("###") ? (
                <h3 key={i}>{line.replace(/^###\s*/, "")}</h3>
              ) : line.trim().startsWith("####") ? (
                <h4 key={i}>{line.replace(/^####\s*/, "")}</h4>
              ) : line.trim().length === 0 ? (
                <br key={i} />
              ) : (
                <p key={i}>{line}</p>
              )
            )}
        </div>

        <div className="mt-10 flex justify-between">
          <Link to="/blog" className="text-teal-700 font-semibold">← Back to Blog</Link>
          <Link to="/contact-us" className="text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg font-semibold">
            Talk to Mera Software
          </Link>
        </div>
      </div>
    </article>
  );
}
