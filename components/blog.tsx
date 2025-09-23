"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";

type ApiBlog = {
  id: number;
  post_title: string;
  post_content: string;
  post_status?: string;
  post_date?: string;
  createdAt?: string;
};

const placeholderImage = "/image/blog-placeholder.jpg";

// Extract first <img> src
const extractFirstImage = (htmlContent: string): string => {
  // Client-side DOMParser (nice)
  if (typeof window !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent || "", "text/html");
      const img = doc.querySelector("img");
      return img?.getAttribute("src") || placeholderImage;
    } catch {
      /* fall through to regex */
    }
  }
  // SSR / fallback regex
  const match = (htmlContent || "").match(/<img[^>]+src=['"]([^'"]+)['"]/i);
  return match?.[1] || placeholderImage;
};

// Extract plain text from HTML
const extractTextFromHTML = (htmlContent: string): string => {
  if (typeof window !== "undefined") {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent || "", "text/html");
      return doc.body.textContent || "";
    } catch {
      /* fall through to regex */
    }
  }
  return (htmlContent || "").replace(/<[^>]*>/g, "");
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.ceil(words / wordsPerMinute);
};

const BlogSection = () => {
  const [blogCards, setBlogCards] = useState<
    Array<{
      id: number;
      post_title: string;
      imageUrl: string;
      excerpt: string;
      formattedDate: string;
      readingTime: number;
    }>
  >([]);

  useEffect(() => {
    const load = async () => {
      try {
        // only 3, newest, published
        const res = await fetch("/api/blogs?status=publish&limit=3", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data: ApiBlog[] = await res.json();

        const processed = (data || []).map((blog) => {
          const text = extractTextFromHTML(blog.post_content || "");
          const dateSrc = blog.post_date || blog.createdAt || new Date().toISOString();
          return {
            id: blog.id,
            post_title: blog.post_title,
            imageUrl: extractFirstImage(blog.post_content || ""),
            excerpt: text.slice(0, 150) + (text.length > 150 ? "..." : ""),
            formattedDate: formatDate(dateSrc),
            readingTime: calculateReadingTime(text),
          };
        });

        setBlogCards(processed);
      } catch (e) {
        console.error(e);
        setBlogCards([]); // fail silently to empty
      }
    };
    load();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      <div className="absolute top-10 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 opacity-40"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-200 rounded-full translate-x-1/3 opacity-30"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            LATEST INSIGHTS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Blogs</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the latest trends, tips, and insights in logistics and supply chain management
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogCards.map((blog) => (
            <article
              key={blog.id}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.post_title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 bg-white text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md">
                  {blog.formattedDate}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.post_title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center mr-4">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{blog.readingTime} min read</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{blog.formattedDate}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-5 leading-relaxed">{blog.excerpt}</p>

                {/* ✅ use blog.id here, not blog.ID */}
                <Link
                  href={`/blogs/${blog.id}`}
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/allBlogs"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors group"
          >
            View All Articles
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
