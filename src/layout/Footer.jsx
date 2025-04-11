import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#FAFAFA] mt-10 pt-10 text-sm text-[#737373]">
      <div className="">
        {/* Üst kısım */}
        <div className="flex flex-col gap-8 border-b pb-10 md:flex-row md:justify-between">
          {/* Sol logo ve sosyal */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-[#252B42]">Bandage</h2>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-[#335BF5] cursor-pointer" />
              <Instagram className="w-5 h-5 text-[#E1306C] cursor-pointer" />
              <Twitter className="w-5 h-5 text-[#1DA1F2] cursor-pointer" />
            </div>
          </div>

          {/* Grid yapısı */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 flex-1">
            {/* Column 1 */}
            <div>
              <h3 className="font-bold text-[#252B42] mb-3">Company Info</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Carrier</li>
                <li>We are hiring</li>
                <li>Blog</li>
              </ul>
            </div>
            {/* Column 2 */}
            <div>
              <h3 className="font-bold text-[#252B42] mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Carrier</li>
                <li>We are hiring</li>
                <li>Blog</li>
              </ul>
            </div>
            {/* Column 3 */}
            <div>
              <h3 className="font-bold text-[#252B42] mb-3">Features</h3>
              <ul className="space-y-2">
                <li>Business Marketing</li>
                <li>User Analytic</li>
                <li>Live Chat</li>
                <li>Unlimited Support</li>
              </ul>
            </div>
            {/* Column 4 */}
            <div>
              <h3 className="font-bold text-[#252B42] mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>IOS & Android</li>
                <li>Watch a Demo</li>
                <li>Customers</li>
                <li>API</li>
              </ul>
            </div>
            {/* Column 5 - Email */}
            <div>
              <h3 className="font-bold text-[#252B42] mb-3">Get In Touch</h3>
              <div className="flex w-full max-w-xs">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="px-3 py-2 border border-gray-300 rounded-l-md w-full"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
                  Subscribe
                </button>
              </div>
              <p className="text-xs mt-2">Lore imp sum dolor Amit</p>
            </div>
          </div>
        </div>

        {/* Alt kısım */}
        <div className="text-center text-xs text-[#737373] py-6">
          Made With Love By Finland All Right Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;