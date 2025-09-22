"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { postdata } from "@/app/(main)/data/postdata";
import Link from "next/link";

const API_URL = "/api/blogs";

// Normalize possible JSON/string content to HTML string
function contentToHtml(v: any): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  // If your editor saves JSON, adapt here (e.g., v.html or convert JSON->HTML)
  try {
    // last resort: show serialized JSON
    return `<pre style="white-space:pre-wrap">${escapeHtml(JSON.stringify(v, null, 2))}</pre>`;
  } catch {
    return "";
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}

type DbPost = {
  id: number;
  post_title: string;
  post_content: any;
  category?: string | null;
  tags?: string | null;
  post_status?: string | null;
  createdAt?: string | null;
  post_date?: string | null;
};

export default function BlogCategory() {
  const params = useParams() as { id?: string };
  const numericId = useMemo(() => Number(params?.id), [params?.id]);

  const [post, setPost] = useState<DbPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Load from API by id; fallback to postdata if not found
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!numericId || Number.isNaN(numericId)) {
        if (mounted) setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_URL}?id=${numericId}`, { cache: "no-store" });
        if (res.ok) {
          const data: DbPost = await res.json();
          if (mounted) setPost(data);
        } else {
          // fallback to local postdata
          const local = (postdata as any[]).find((b) => Number(b.ID) === numericId);
          if (mounted) setPost(local ?? null);
        }
      } catch {
        const local = (postdata as any[]).find((b) => Number(b.ID) === numericId);
        if (mounted) setPost(local ?? null);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [numericId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header Skeleton */}
        <div className="mb-10">
          <div className="h-10 w-3/4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg mb-6 animate-pulse"></div>
          <div className="h-4 w-40 bg-gray-200 rounded-md mb-8 animate-pulse"></div>
          <div className="h-2 w-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        
        {/* Content Skeleton */}
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-md animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
              <div className="h-4 w-11/12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md animate-pulse" style={{animationDelay: `${i * 0.1 + 0.05}s`}}></div>
              <div className="h-4 w-10/12 bg-gradient-to-r from-gray-200 to-gray-300 rounded-md animate-pulse" style={{animationDelay: `${i * 0.1 + 0.1}s`}}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or may have been moved.</p>
          <a href="/" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300">
            Return Home
          </a>
        </div>
      </div>
    );
  }

  // The API returns `id`; local postdata uses `ID`. Normalize accessors:
  const title = (post as any).post_title ?? (post as any).title ?? "";
  const dateStr =
    (post as any).createdAt ||
    (post as any).post_date ||
    (post as any).postDate ||
    new Date().toISOString();

  const html = contentToHtml((post as any).post_content ?? (post as any).content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <article className="max-w-4xl mx-auto px-4">
        {/* Header Section */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full text-sm text-blue-700 font-medium mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
            </svg>
            Published on {new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
            {title}
          </h1>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto rounded-full mb-8"></div>
          
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-5 h-5 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
              {Math.ceil(html.split(' ').length / 200)} min read
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div 
              className="prose prose-lg max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900
                prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:marker:text-blue-400
                prose-code:px-2 prose-code:py-1 prose-code:bg-gray-100 prose-code:rounded prose-code:text-sm
                prose-pre:bg-gray-900 prose-pre:rounded-xl
                prose-img:rounded-xl prose-img:shadow-md
                prose-hr:border-gray-200"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
          
          {/* Footer Section */}
          <div className="px-8 md:px-12 py-6 bg-gray-50 border-t border-gray-100 rounded-b-2xl">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-sm">Share this post:</span>
                <div className="flex space-x-2">
                  <a href="#" className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.033 10.033 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
              <Link
                href="/allBlogs" 
                className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors mt-4 md:mt-0"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}