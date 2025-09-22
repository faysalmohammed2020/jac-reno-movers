import { testimonials } from "@/app/(main)/data/testimonialsData";
import Image from "next/image";
import Link from "next/link";
import { Star, Quote, ChevronRight } from "lucide-react";

const TestimonialsSection = () => {
  const reviews = testimonials.slice(0, 3);
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${i < rating ? "fill-blue-500 text-blue-500" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full translate-x-1/3 -translate-y-1/3 opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200 rounded-full -translate-x-1/3 translate-y-1/3 opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            CLIENT TESTIMONIALS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Clients Say</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover why businesses trust us with their logistics and supply chain needs
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {reviews.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Quote icon */}
              <div className="mb-6">
                <Quote className="w-10 h-10 text-blue-100 transform rotate-180" />
              </div>
              
              {/* Rating stars */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              {/* Testimonial text */}
              <p className="text-gray-700 italic mb-6 leading-relaxed relative">
                "{testimonial.feedback}"
              </p>
              
              {/* Client info */}
              <div className="flex items-center">
                <div className="relative mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    height={64}
                    width={64}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100 group-hover:border-blue-300 transition-colors"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <p className="text-gray-900 font-bold text-lg">{testimonial.name}</p>
                  {testimonial.position && (
                    <p className="text-blue-600 text-sm">{testimonial.position}</p>
                  )}
                  {testimonial.company && (
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/allTestimonials"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors group"
          >
            View All Testimonials
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;