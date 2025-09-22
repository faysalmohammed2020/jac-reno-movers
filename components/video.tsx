import { videos } from "@/app/(main)/data/videoData";
import Link from "next/link";
import { Play, Clock, ChevronRight } from "lucide-react";

const VideoSection = () => {
  const videoData = videos.slice(0, 3);
  
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            VIDEO SHOWCASE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See Our <span className="text-blue-600">Solutions</span> in Action
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how our innovative logistics solutions transform business operations
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {videoData.map((video, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-2">
                {/* Video Container */}
                <div className="relative aspect-video bg-gray-900">
                  <iframe
                    src={video.src}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  
                  {/* Overlay effect */}
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-all duration-300 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center transform scale-100 group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-6 h-6 text-blue-600 fill-blue-600 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="bg-white p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>3 min watch</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {video.description}
                  </p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link 
                      href={video.src}
                      target="_blank"
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors"
                    >
                      Watch Full Video
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/videoReviews"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors group"
          >
            View All Videos
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;