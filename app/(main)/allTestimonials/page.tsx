import { testimonials } from "@/app/(main)/data/testimonialsData";
import Image from "next/image";

const TestimonialsAll = () => {
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-amber-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Trusted by <span className="text-blue-600">Industry Leaders</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover why businesses choose our solutions and how we've helped them achieve their goals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
            >
              {/* Decorative element */}
              <div className="absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-blue-100 group-hover:text-blue-200 transition-colors duration-300">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              <div className="flex flex-col h-full">
                {/* Rating */}
                <div className="mb-6">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-slate-700 mb-8 text-lg leading-relaxed flex-grow italic">
                  "{testimonial.feedback}"
                </blockquote>

                {/* Author info */}
                <div className="flex items-center mt-auto pt-6 border-t border-slate-100">
                  <div className="relative mr-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      height={60}
                      width={60}
                      className="w-14 h-14 rounded-full object-cover relative z-10 border-2 border-white shadow-sm"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{testimonial.name}</p>
                    {testimonial.position && (
                      <p className="text-sm text-slate-500">{testimonial.position}</p>
                    )}
                    {testimonial.company && (
                      <p className="text-sm text-blue-600 font-medium">{testimonial.company}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats/Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">Join Our Growing Community of Satisfied Clients</h3>
            <div className="flex flex-wrap justify-center gap-10 mb-8">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold mb-2">98%</span>
                <span className="text-blue-100">Client Satisfaction</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold mb-2">4.9/5</span>
                <span className="text-blue-100">Average Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold mb-2">250+</span>
                <span className="text-blue-100">Clients Served</span>
              </div>
            </div>
            <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors duration-300">
              Share Your Experience
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsAll;