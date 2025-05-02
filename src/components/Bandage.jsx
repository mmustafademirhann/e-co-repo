import { Facebook, Instagram, Twitter } from 'lucide-react'; // veya başka ikon kütüphanesi kullanıyorsan ona göre değiştir
// Eğer heroicons, fontawesome vs. kullanıyorsan onu belirtebilirsin.

const Bandage = () => {
  return (
    <div >
      <div className="flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 pt-4 pb-10">
        
        {/* Logo + Çizgi + Iconlar */}
        <div className="flex flex-col sm:flex-row sm:items-center w-full">
          {/* Logo */}
          <span className="text-lg font-bold text-gray-800 mb-2 sm:mb-0 sm:mr-4">
            E_commerce
          </span>
          

          {/* Iconlar */}
          <div className="flex gap-4 sm:ml-4">
            <a href="#"><Facebook size={20} className="text-blue-500" /></a>
            <a href="#"><Instagram size={20} className="text-blue-500" /></a>
            <a href="#"><Twitter size={20} className="text-blue-500" /></a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Bandage;
