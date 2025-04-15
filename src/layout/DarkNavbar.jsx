import { Phone, Mail, Instagram, Facebook, Youtube, Twitter } from 'lucide-react';

const DarkNavbar = ({mode = 'default'}) => {
  const baseClasses = 'py-2 px-4 text-white hidden lg:block'
  let modeClasses = ''
  switch (mode) {
    case 'shop':
      modeClasses = 'bg-[#23856D]'
      break
    case 'contact':
      modeClasses = 'bg-blue-900'
      break
    default:
      modeClasses = 'bg-gray-800'
  }
  return (
    <div className={`${baseClasses} ${modeClasses}`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
        
        {/* Sol: Telefon ve E-posta */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Phone size={16} />
            <span>(225) 555-0118</span>
          </div>
          <div className="flex items-center gap-1">
            <Mail size={16} />
            <span>michelle.rivera@example.com</span>
          </div>
        </div>

        {/* Orta: Duyuru Metni */}
        <div className="text-center font-medium">
          Follow Us and get a chance to win <span className="font-bold">80% off</span>
        </div>

        {/* Sağ: Sosyal Medya */}
        <div className="flex items-center gap-2">
          <span className="font-medium">Follow Us :</span>
          <Instagram size={16} className="hover:text-blue-400 cursor-pointer" />
          <Facebook size={16} className="hover:text-blue-400 cursor-pointer" />
          <Youtube size={16} className="hover:text-red-500 cursor-pointer" />
          <Twitter size={16} className="hover:text-blue-400 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default DarkNavbar;
