import Image from 'next/image';
import { Truck, Warehouse, Link as LinkIcon, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'House Hold Moving',
    description:
    'Our Household Moving services provide safe, reliable, and stress-free solutions for relocating your home across regions. With a fleet of modern vehicles and experienced movers, we ensure careful handling of your belongings and on-time delivery. Whether it’s a single apartment or a full house, our team is equipped to manage moves of any size with precision, care, and personalized support.',
    image: '/image/img1.jpg',
    icon: <Truck className="w-8 h-8" />,
    features: ['24/7 Tracking', 'Temperature Control', 'Express Delivery']
  },
  {
    title: 'Warehousing',
    description:
      'Our state-of-the-art Warehousing facilities offer secure and scalable storage solutions tailored to your business needs. With climate-controlled environments, real-time inventory tracking, and easy access, we ensure your goods are always in perfect condition and ready for distribution. Let us handle your storage requirements with the utmost efficiency.',
    image: '/image/img2.jpg',
    icon: <Warehouse className="w-8 h-8" />,
    features: ['Climate Control', 'Real-time Inventory', 'Secure Access']
  },
  {
    title: 'Supply Chain Solutions',
    description:
      'Streamline your operations with our comprehensive Supply Chain Solutions. From procurement to distribution, we provide end-to-end services that enhance efficiency and reduce costs. Our experts leverage cutting-edge technology to optimize logistics, ensuring a seamless supply chain for your business growth.',
    image: '/image/img3.jpg',
    icon: <LinkIcon className="w-8 h-8" />,
    features: ['End-to-end Management', 'Cost Optimization', 'Tech Integration']
  },
];

const ServiceSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full translate-x-1/3 translate-y-1/3 opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
            OUR SERVICES
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Comprehensive Logistics <span className="text-blue-600">Solutions</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering excellence through innovative and reliable logistics services tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-14 h-14 bg-white rounded-xl shadow-md flex items-center justify-center text-blue-600">
                  {service.icon}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-5 line-clamp-3">
                  {service.description}
                </p>
                
                {/* Features List */}
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Read More Button */}
                {/* <button className="w-full flex items-center justify-between bg-blue-50 text-blue-700 px-4 py-3 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <span className="font-medium">Read More</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;