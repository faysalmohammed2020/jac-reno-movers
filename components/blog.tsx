"use client";
import { useEffect, useState } from "react";
import { postdata } from "@/app/(main)/data/postdata";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, ChevronRight } from "lucide-react";

// Function to extract the first image's src from the post_content
const extractFirstImage = (htmlContent: string): string => {
  const placeholderImage = "/image/blog-placeholder.jpg";
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const imgElement = doc.querySelector("img");
    return imgElement ? imgElement.getAttribute("src") ?? placeholderImage : placeholderImage;
  }
  return placeholderImage;
};

// Function to extract plain text from HTML
const extractTextFromHTML = (htmlContent: string): string => {
  if (typeof window !== "undefined") {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    return doc.body.textContent || "";
  }
  return htmlContent.replace(/<[^>]*>/g, '');
};

// Function to format date
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Function to calculate reading time
const calculateReadingTime = (text: string): number => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

const BlogSection = () => {
  const [blogCards, setBlogCards] = useState<any[]>([]);

  useEffect(() => {
    // Process postdata client-side to extract images and text
    const processedData = postdata.slice(0, 3).map((blog) => {
      const plainText = extractTextFromHTML(blog.post_content);
      return {
        ...blog,
        imageUrl: extractFirstImage(blog.post_content),
        excerpt: plainText.slice(0, 150) + (plainText.length > 150 ? "..." : ""),
        formattedDate: formatDate(blog.post_date || new Date().toISOString()),
        readingTime: calculateReadingTime(plainText)
      };
    });
    setBlogCards(processedData);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 opacity-40"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-200 rounded-full translate-x-1/3 opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogCards.map((blog, index) => (
            <article
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.post_title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium shadow-md">
                  {blog.formattedDate}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {blog.post_title}
                </h3>
                
                {/* Meta Information */}
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
                
                <p className="text-gray-600 mb-5 leading-relaxed">
                  {blog.excerpt}
                </p>
                
                {/* Read More Button */}
                <Link 
                  href={`/blogs/${blog.ID}`}
                  className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Button */}
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