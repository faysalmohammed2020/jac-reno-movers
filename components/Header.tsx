"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X, Search, User, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

type BlogLite = { id: number; post_title: string };

const API_URL = "/api/blogs";

const HeaderMenu: React.FC = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isBlogDropdownOpen, setBlogDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const [blogs, setBlogs] = useState<BlogLite[]>([]);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  // compact header on scroll
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch blogs data
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
        // error handling
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
      (match) =>
        `<span style="color: #2563eb; font-weight: 700;">${match}</span>`
    );
  };

  const handleNavigation = () => setMobileMenuOpen(false);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-blue-100 text-gray-800 transition-[box-shadow,backdrop-filter] duration-200 ${
        isScrolled ? "shadow-md/30 backdrop-blur-sm" : "shadow-sm"
      }`}
    >
      <nav
        className={`mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 ${
          isScrolled ? "py-2" : "py-2.5"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center" onClick={handleNavigation}>
            <Image
              src="/image/l7.jpeg"
              alt="Company Logo"
              width={300}
              height={200}
              priority
              className="h-14 md:h-32 w-auto object-contain spin-clockwise"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center justify-center space-x-6 xl:space-x-8">
          {/* Home */}
          <li className="relative">
            <Link
              href="/home"
              onClick={handleNavigation}
              className="inline-flex items-center py-2 text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
            </Link>
          </li>

          {/* Services */}
          <li className="group relative">
            <button
              type="button"
              className="inline-flex items-center py-2 text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <span>Services</span>
              <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out invisible">
              <div className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg text-lg font-bold">
                Our Services
              </div>
              <ul className="py-1.5 text-sm">
                <li>
                  <Link
                    href="/services/long-distance-moving"
                    className="flex items-center px-4 py-2 hover:bg-blue-50"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                    Long Distance Moving
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/auto-transport"
                    className="flex items-center px-4 py-2 hover:bg-blue-50"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                    Auto Transport
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/storage-solutions"
                    className="flex items-center px-4 py-2 hover:bg-blue-50"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                    Storage Solutions
                  </Link>
                </li>

                <li className="group/sub relative">
                  <div className="flex items-center justify-between px-4 py-2 hover:bg-blue-50 cursor-default">
                    <div className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                      Commercial Moving
                    </div>
                    <ChevronDown className="ml-2 w-4 h-4 text-gray-400 group-hover/sub:text-blue-500 transition-transform duration-300 group-hover/sub:rotate-180" />
                  </div>
                  <ul className="absolute left-full top-0 ml-1 w-56 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 opacity-0 group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 ease-out invisible">
                    <div className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-medium rounded-t-lg border-b border-blue-100">
                      Commercial Options
                    </div>
                    <li>
                      <Link
                        href="/services/commercial-moving/office-relocation"
                        className="block px-4 py-2 hover:bg-blue-50"
                      >
                        Office Relocation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/commercial-moving/retail-relocation"
                        className="block px-4 py-2 hover:bg-blue-50"
                      >
                        Retail Relocation
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services/commercial-moving/corporate-relocation"
                        className="block px-4 py-2 hover:bg-blue-50"
                      >
                        Corporate Relocation
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <Link
                    href="/services/specialized-moving"
                    className="flex items-center px-4 py-2 hover:bg-blue-50"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                    Specialized Moving
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services/small-moves"
                    className="flex items-center px-4 py-2 hover:bg-blue-50"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                    Small Moves
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* About Us */}
          <li className="group relative">
            <button
              type="button"
              className="inline-flex items-center py-2 text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <span>About Us</span>
              <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 opacity-0 group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out invisible">
              <div className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg text-sm font-semibold">
                About Our Company
              </div>
              <ul className="py-1.5 text-sm">
                <li>
                  <Link
                    href="/allTestimonials"
                    className="flex items-center px-4 py-2 hover:bg-blue-50"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3" />
                    Testimonials
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          {/* Contact */}
          <li className="relative">
            <Link
              href="/contact"
              onClick={handleNavigation}
              className="inline-flex items-center py-2 text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>
          </li>

          {/* Blog */}
          <li
            className="group relative"
            onMouseEnter={() => setBlogDropdownOpen(true)}
            onMouseLeave={() => setBlogDropdownOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center py-2 text-lg font-bold text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <span>Blog</span>
              <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            <div
              className={`absolute left-1/2 -translate-x-1/2 mt-2 bg-white text-gray-800 shadow-xl rounded-lg border border-blue-100 transition-all duration-200 ease-out w-[20rem] md:w-[24rem] ${
                isBlogDropdownOpen
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible translate-y-1.5"
              }`}
            >
              <div className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg flex justify-between items-center">
                <span className="text-sm font-semibold">Blog Posts</span>
                <div className="bg-blue-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                  Total: {loadingBlogs ? "..." : blogs.length}
                </div>
              </div>

              {/* Search Input */}
              <div className="p-3 border-b border-blue-100">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <Search className="text-gray-400 w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-9 pl-9 pr-3 rounded-md bg-blue-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white border border-blue-200 text-sm"
                  />
                </div>
              </div>

              <div className="max-h-72 overflow-auto py-1">
                {loadingBlogs ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={`sk-${i}`}
                      className="h-9 mx-4 my-2 rounded-md bg-blue-100 animate-pulse"
                    />
                  ))
                ) : filteredBlogs.length > 0 ? (
                  filteredBlogs.map((item) => (
                    <div
                      key={item.id}
                      className="px-4 py-2 hover:bg-blue-50 transition-colors"
                    >
                      <Link
                        href={`/blogs/${item.id}`}
                        className="block text-[13px] font-medium text-gray-700 hover:text-blue-600"
                        onClick={handleNavigation}
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
                    <Search className="w-7 h-7 mx-auto mb-1.5 text-gray-400" />
                    <p className="text-sm">No blog posts found.</p>
                  </div>
                )}
              </div>
            </div>
          </li>
        </ul>

        {/* Auth + Burger */}
        <div className="flex items-center space-x-3">
          {session ? (
            <div className="hidden sm:flex items-center space-x-2">
              <div className="hidden md:flex items-center text-sm text-gray-600">
                <User className="w-4 h-4 mr-1 text-blue-600" />
                <span className="truncate max-w-[180px]">
                  Hello, {session.user?.name || session.user?.email}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center h-9 px-3 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors shadow-sm"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="inline-flex items-center h-9 px-3 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors shadow-sm"
              onClick={handleNavigation}
            >
              <User className="w-4 h-4 mr-2" />
              Login
            </Link>
          )}

          {/* Hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-blue-50 text-gray-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-100 bg-white shadow-sm">
          <ul className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col space-y-1.5 text-center">
            <li>
              <Link
                href="/home"
                className="block py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="block py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/allTestimonials"
                className="block py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="block py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
            </li>
            <li className="pt-2.5 border-t border-blue-100">
              {session ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full inline-flex items-center justify-center h-10 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  href="/sign-in"
                  className="w-full inline-flex items-center justify-center h-10 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
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
    </header>
  );
};

export default HeaderMenu;
