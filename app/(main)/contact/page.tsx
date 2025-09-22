import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Page Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We're here to help you succeed. Reach out to our team for questions, support, or collaboration opportunities.
          </p>
        </div>
      </header>

      {/* Contact Section */}
      <div className="container mx-auto py-16 px-4 md:px-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">Contact Information</h2>
              <p className="text-slate-600 mb-8">
                Our team is ready to assist you. Choose the most convenient way to reach out.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">Email</p>
                    <p className="text-slate-600">info@example.com</p>
                    <p className="text-sm text-slate-500 mt-1">Typically replies within 2 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">Phone</p>
                    <p className="text-slate-600">+1 (123) 456-7890</p>
                    <p className="text-sm text-slate-500 mt-1">Mon-Fri, 9:00 AM - 5:00 PM EST</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">Office</p>
                    <p className="text-slate-600">66 Beck Drive Markham Ontario</p>
                    <p className="text-slate-600"> Canada L3P 5J9</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">Business Hours</p>
                    <p className="text-slate-600">Monday - Friday: 9am - 6pm</p>
                    <p className="text-slate-600">Saturday: 10am - 4pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <div className="flex items-center mb-8 pb-4 border-b border-slate-100">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Send Us a Message</h2>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block mb-2 text-slate-700 font-medium">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your full name"
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                  
                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block mb-2 text-slate-700 font-medium">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block mb-2 text-slate-700 font-medium">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    placeholder="What is this regarding?"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
                
                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="block mb-2 text-slate-700 font-medium">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                    required
                  ></textarea>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </button>
                
                <p className="text-sm text-slate-500 text-center mt-4">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>    
    </div>
  );
};

export default ContactPage;