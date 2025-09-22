"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, User, LogOut } from "lucide-react";
import Image from "next/image";
import { signOut, useSession } from "@/lib/auth-client";

type BlogLite = { id: number; post_title: string };

const API_URL = "/api/blogs";

const HeaderMenu: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const { data: session } = useSession();

  // ✅ শুধু ডাটাবেস থেকে
  const [blogs, setBlogs] = useState<BlogLite[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingBlogs(true);
        const res = await fetch(API_URL, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load blogs");
        const rows = (await res.json()) as BlogLite[];
        if (!mounted) return;
        setBlogs(rows);
      } catch {
        // error swallow; UI তে Total Blogs: … থাকবে
      } finally {
        if (mounted) setLoadingBlogs(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((b) => (b.post_title ?? "").toLowerCase().includes(q));
  }, [blogs, searchQuery]);

  const highlightSearchTerm = (text: string, query: string): string => {
    if (!query) return text;
    const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${safe})`, "gi");
    return text.replace(
      regex,
      (match) => `<span style="color: #2563eb; font-weight: 700;">${match}</span>`
    );
  };

  return (
    <header className="bg-white shadow-lg border-b border-blue-100 text-gray-800 sticky top-0 z-50">
      <nav className="container flex items-center justify-between py-3 px-6">
        {/* Logo Section */}
        <div className="flex items-center">
  <Link href="/" className="flex items-center">
    <Image
      src="/image/l7.jpeg"
      alt="Company Logo"
      width={100}
      height={50}
      className="spin-clockwise"
    />
  </Link>
</div>



        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {/* Home */}
          <li className="relative group">
            <Link 
              href="/home" 
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 flex items-center after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full"
            >
              Home
            </Link>
          </li>

          {/* Services Dropdown */}
          <li className="group relative">
            <div className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 flex items-center cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">
              <span>Services</span>
              <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <div className="absolute z-50 left-0 mt-3 w-64 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out invisible transform group-hover:translate-y-0 translate-y-2">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg font-semibold">
                Our Services
              </div>
              <ul className="py-2">
                <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                  <Link href="/services/long-distance-moving" className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Long Distance Moving
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                  <Link href="/services/auto-transport" className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Auto Transport
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                  <Link href="/services/storage-solutions" className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Storage Solutions
                  </Link>
                </li>
                <li className="group/sub relative px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                      Commercial Moving
                    </div>
                    <ChevronDown className="ml-2 w-4 h-4 text-gray-400 group-hover/sub:text-blue-500 transition-transform duration-300 group-hover/sub:rotate-180" />
                  </div>
                  {/* Nested Dropdown */}
                  <ul className="absolute z-50 left-full top-0 ml-1 w-56 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 opacity-0 group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 ease-in-out invisible transform group-hover/sub:translate-x-0 translate-x-2">
                    <div className="px-4 py-2 bg-blue-50 text-blue-700 font-medium rounded-t-lg border-b border-blue-100">
                      Commercial Options
                    </div>
                    <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                      <Link href="/services/commercial-moving/office-relocation" className="block text-gray-700 hover:text-blue-600">
                        Office Relocation
                      </Link>
                    </li>
                    <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                      <Link href="/services/commercial-moving/retail-relocation" className="block text-gray-700 hover:text-blue-600">
                        Retail Relocation
                      </Link>
                    </li>
                    <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                      <Link href="/services/commercial-moving/corporate-relocation" className="block text-gray-700 hover:text-blue-600">
                        Corporate Relocation
                      </Link>
                    </li>
                  </ul>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                  <Link href="/services/specialized-moving" className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Specialized Moving
                  </Link>
                </li>
                <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                  <Link href="/services/small-moves" className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Small Moves
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* About Us Dropdown */}
          <li className="group relative">
            <div className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 flex items-center cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">
              <span>About Us</span>
              <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </div>
            <div className="absolute z-50 left-0 mt-3 w-48 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out invisible transform group-hover:translate-y-0 translate-y-2">
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg font-semibold">
                About Our Company
              </div>
              <ul className="py-2">
                <li className="px-4 py-2.5 hover:bg-blue-50 transition-colors duration-200">
                  <Link href="/allTestimonials" className="flex items-center text-gray-700 hover:text-blue-600">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Contact */}
          <li className="relative group">
            <Link 
              href="/contact" 
              className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 flex items-center after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full"
            >
              Contact
            </Link>
          </li>

          {/* Blog Dropdown (DB only) */}
          <li 
            className="group relative"
            onMouseEnter={() => setBlogDropdownOpen(true)}
            onMouseLeave={() => setBlogDropdownOpen(false)}
          >
            <div className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 flex items-center cursor-pointer after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full">
              <span>Blog</span>
              <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </div>

            <div className={`absolute z-50 left-0 mt-3 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 transition-all duration-300 ease-in-out w-96 ${isBlogDropdownOpen ? 'opacity-100 visible transform translate-y-0' : 'opacity-0 invisible transform translate-y-2'}`}>
              <div className="px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg flex justify-between items-center">
                <span className="font-semibold">Blog Posts</span>
                <div className="bg-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  Total: {loadingBlogs ? "..." : blogs.length}
                </div>
              </div>

              {/* Search Input */}
              <div className="p-4 border-b border-blue-100">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="text-gray-400 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 pl-10 rounded-md bg-blue-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border border-blue-200 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="max-h-80 overflow-auto py-2">
                {loadingBlogs ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`sk-${i}`}
                      className="h-12 mx-4 my-2 rounded-md bg-blue-100 animate-pulse"
                    />
                  ))
                ) : filteredBlogs.length > 0 ? (
                  filteredBlogs.map((item) => (
                    <div
                      key={item.id}
                      className="group-hover:bg-blue-50 px-4 py-3 transition-colors duration-200 hover:bg-blue-50"
                    >
                      <Link
                        href={`/blogs/${item.id}`}
                        className="block text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                      >
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightSearchTerm(
                              item.post_title,
                              searchQuery
                            ),
                          }}
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    <Search className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p>No blog posts found.</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>

        {/* Auth Button */}
        <div className="flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-1 text-blue-600" />
                <span>Hello, {session.user?.name || session.user?.email}</span>
              </div>
              <button
                onClick={() => signOut()}
                className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Link>
          )}

          {/* Hamburger Menu for Mobile */}
          <div className="lg:hidden ml-2">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-blue-100 lg:hidden">
            <ul className="container py-4 px-6 flex flex-col space-y-3">
              <li>
                <Link 
                  href="/home" 
                  className="block py-2.5 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/services" 
                  className="block py-2.5 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link 
                  href="/about-us/testimonials" 
                  className="block py-2.5 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block py-2.5 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="block py-2.5 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>
              <li className="pt-4 border-t border-blue-100">
                {session ? (
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/sign-in"
                    className="w-full flex items-center justify-center bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default HeaderMenu;