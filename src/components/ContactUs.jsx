import React from 'react';
import contactImage from '../assets/etekli.png';
import { Twitter, Facebook, Linkedin } from 'lucide-react';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

export const ContactUs = () => {
  return (
    <section className="text-gray-800 py-12 md:py-16 relative bg-white">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center px-4 md:px-8">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in touch today!</h2>
          <p className="text-lg mb-6">
            We know how large objects will act, but things on a small scale.
          </p>
          <p className="text-lg font-medium">Phone: +451 215 215</p>
          <p className="text-lg font-medium">Fax: +451 215 215</p>
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img 
            src={contactImage} 
            alt="Contact Us" 
            className="w-full max-w-md rounded-lg shadow-lg object-cover h-[400px]"
          />
        </div>
      </div>
    </section>
  );
};
