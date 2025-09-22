"use client";
import { postdata } from "@/app/(main)/data/postdata";
import Link from 'next/link';
import { useState, useEffect } from 'react';

// Function to extract the first image's src from the post_content
const extractFirstImage = (htmlContent: string): string => {
  const placeholderImage = "/api/placeholder/400/200";
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.getAttribute("src") ?? placeholderImage : placeholderImage;
  }
  return placeholderImage;
};

// Function to extract plain text from HTML for preview
const extractTextPreview = (htmlContent: string): string => {
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    return doc.body.textContent?.substring(0, 150) + '...' || 'No content available';
  }
  return 'Loading content...';
};

const BlogAll = () => {
  const [blogData, setBlogData] = useState<any[]>([]);

  useEffect(() => {
    const processedData = postdata.map((blog) => {
      const imageUrl = extractFirstImage(blog.post_content);
      const previewText = extractTextPreview(blog.post_content);
      return {
        ...blog,
        imageUrl, 
        previewText,
      };
    });
    setBlogData(processedData); 
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Our <span className="text-blue-600">Blogs</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Explore our collection of articles, insights, and thought leadership on logistics and supply chain innovation.
          </p>
          <div className="inline-flex items-center bg-white py-2 px-4 rounded-full shadow-sm">
            <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span className="text-slate-700 font-medium">{postdata.length} Articles</span>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={blog.imageUrl}
                  alt={blog.post_title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Article
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                  {blog.post_title}
                </h3>
                
                <p className="text-slate-600 mb-4 text-sm line-clamp-3">
                  {blog.previewText}
                </p>
                
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center text-sm text-slate-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {new Date(blog.post_date || blog.createdAt || new Date()).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  
                  <Link 
                    href={`/blogs/${blog.ID}`}
                    className="flex items-center text-blue-600 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button (optional) */}
        <div className="text-center mt-12">
          <button className="bg-white text-slate-700 border border-slate-200 rounded-full px-8 py-3 font-medium hover:bg-slate-50 hover:shadow-md transition-all duration-300">
            Load More Articles
          </button>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with Our Insights</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss our latest articles, industry insights, and expert tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogAll;