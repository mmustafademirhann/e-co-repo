import { CalendarDays, BarChart2 } from 'lucide-react';


const FeaturedPostCard = ({ image, category, title, description, date, comments }) => {
  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-56 object-cover" />
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded font-bold">NEW</span>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {/* Etiketler */}
        <div className="text-sm text-gray-400 flex gap-3">
          {category.map((cat, index) => (
            <span key={index}>{cat}</span>
          ))}
        </div>

        {/* Başlık */}
        <h3 className="text-lg font-semibold leading-snug">{title}</h3>

        {/* Açıklama */}
        <p className="text-sm text-gray-600">{description}</p>

        {/* Alt Bilgi */}
        <div className="flex justify-between text-xs text-gray-500 mt-4">
          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart2 size={14} />
            <span>{comments} comments</span>
          </div>
        </div>

        {/* Link */}
        <div className="mt-4">
          <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">Learn More →</a>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostCard;
