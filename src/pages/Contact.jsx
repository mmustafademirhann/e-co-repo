import { useState } from 'react'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ContactUs } from '../components/ContactUs'

const Contact = () => {
    return (
    <div className="flex flex-col bg-white">
      <ContactUs />
      
      {/* Office visit section */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {/* Phone support */}
            <div className="bg-white p-8 flex flex-col items-center text-center rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#23A6F0] rounded-full flex items-center justify-center mb-4">
                <Phone className="text-white" size={24} />
              </div>
              <p className="text-sm text-gray-600 mb-2">georgia.young@example.com</p>
              <p className="text-sm text-gray-600">georgia.young@ple.com</p>
              <h3 className="text-base font-bold text-[#252B42] mt-4 mb-2">Get Support</h3>
              <button className="mt-2 border border-[#23A6F0] text-[#23A6F0] py-2 px-5 rounded-full text-sm font-medium hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>
            
            {/* Location */}
            <div className="bg-[#252B42] p-8 flex flex-col items-center text-center rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#23A6F0] rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-white" size={24} />
              </div>
              <p className="text-sm text-gray-300 mb-2">georgia.young@example.com</p>
              <p className="text-sm text-gray-300">georgia.young@ple.com</p>
              <h3 className="text-base font-bold text-white mt-4 mb-2">Get Support</h3>
              <button className="mt-2 border border-[#23A6F0] text-[#23A6F0] py-2 px-5 rounded-full text-sm font-medium hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>
            
            {/* Email */}
            <div className="bg-white p-8 flex flex-col items-center text-center rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-[#23A6F0] rounded-full flex items-center justify-center mb-4">
                <Mail className="text-white" size={24} />
              </div>
              <p className="text-sm text-gray-600 mb-2">georgia.young@example.com</p>
              <p className="text-sm text-gray-600">georgia.young@ple.com</p>
              <h3 className="text-base font-bold text-[#252B42] mt-4 mb-2">Get Support</h3>
              <button className="mt-2 border border-[#23A6F0] text-[#23A6F0] py-2 px-5 rounded-full text-sm font-medium hover:bg-[#23A6F0] hover:text-white transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Let's Talk section */}
      <div className="py-16 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <h4 className="text-sm text-gray-600 uppercase mb-2">WE CAN'T WAIT TO MEET YOU</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-[#252B42] mb-6">Let's Talk</h2>
          <button className="bg-[#23A6F0] text-white py-3 px-8 rounded-md hover:bg-[#1a87c7] transition-colors">
            Try it free now
          </button>
        </div>
      </div>
      </div>
    )
  }
  
  export default Contact
  