import Bandage from '../components/Bandage';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 px-6 sm:px-10 lg:px-20">
      <div className="flex flex-col border-b border-gray-300 pb-10">

        {/* Bandage Component */}
        <div className="mb-8">
          <Bandage />
        </div>

        {/* Links Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 sm:gap-12 text-sm">
          {/* Company info */}
          <div>
            <h3 className="font-bold mb-3">Company info</h3>
            <ul className="text-gray-600 space-y-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-3">Legal</h3>
            <ul className="text-gray-600 space-y-2">
              <li>About Us</li>
              <li>Carrier</li>
              <li>We are hiring</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-bold mb-3">Features</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Business Marketing</li>
              <li>User Analytic</li>
              <li>Live Chat</li>
              <li>Unlimited Support</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-3">Resources</h3>
            <ul className="text-gray-600 space-y-2">
              <li>IOS & Android</li>
              <li>Watch a Demo</li>
              <li>Customers</li>
              <li>API</li>
            </ul>
          </div>
        </div>

        {/* Subscription */}
        <div className="sm:max-w-xs mt-8">
          <h3 className="font-bold mb-3">Get In Touch</h3>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 py-2 px-3 text-sm"
            />
            <button className="bg-blue-500 text-white px-4 text-sm">Subscribe</button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Lore imp sum dolor Amit</p>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="text-center text-sm text-gray-600 pt-6">
        Made With Love By Finland All Right Reserved
      </div>

    </footer>
  );
};

export default Footer;