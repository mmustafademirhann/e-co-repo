import Carousel from '../components/Carousel';

const HomePage = () => {
  const carouselImages = [
    {
      src: "https://picsum.photos/id/1012/1600/753",
      alt: "Yeni Ürünler",
      caption: "Yeni Koleksiyon",
      description: "2025 için en yeni teknoloji ürünlerimiz"
    },
    {
      src: "https://picsum.photos/id/18/1600/753",
      alt: "İndirimli Ürünler",
      caption: "Büyük İndirim",
      description: "Seçili ürünlerde %50'ye varan indirimler"
    },
    {
      src: "https://picsum.photos/id/118/1600/753",
      alt: "Premium Ürünler",
      caption: "Premium Serisi",
      description: "En kaliteli ve lüks ürünlerimiz"
    }
  ];
  const categories = [
    {
      id: 1,
      title: "Kadın",
      src: "https://picsum.photos/id/1012/400/400"
    },
    {
      id: 2,
      title: "Erkek",
      src: "https://picsum.photos/id/1015/400/400"
    },
    {
      id: 3,
      title: "Çocuk",
      src: "https://picsum.photos/id/1020/400/400"
    },
    {
      id: 4,
      title: "Aksesuar",
      src: "https://picsum.photos/id/1035/400/400"
    }
  ];


  return (
    <>
      {/* Carousel tam ekran */}
      <Carousel images={carouselImages} />

      {/* Diğer içerikler ortalı ve sınırlı */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Kategoriler */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 mt-8">
          {categories.map((category) => (
            <div key={category.id} className="relative cursor-pointer overflow-hidden group">
              <img
                src={category.src}
                alt={category.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-6 py-2 shadow text-black text-sm font-semibold tracking-wider uppercase">
                {category.title}
              </div>
            </div>
          ))}
        </div>


        {/* Kampanya Banner */}
        <div className="relative bg-blue-600 text-white text-center py-10 mb-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">Yılın En Büyük İndirimi</h2>
          <p className="mt-2 text-lg">Seçili ürünlerde %50'ye varan indirimler seni bekliyor!</p>
        </div>

        {/* Ürünler */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4"
            >
              <img
                src="https://picsum.photos/seed/headphones/300/200"
                alt={`Ürün ${item}`}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h4 className="text-md font-semibold mb-2">Ürün Adı {item}</h4>
              <p className="text-gray-600 mb-1">Kısa açıklama</p>
              <p className="text-blue-600 font-bold">₺199.99</p>
            </div>
          ))}
        </div>

        {/* Blog / Bilgi kutuları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-lg font-bold mb-2">Blog Yazısı</h4>
            <p className="text-gray-500">Yenilikler, trendler ve daha fazlası burada.</p>
          </div>
          <div className="bg-white p-6 rounded shadow text-center">
            <h4 className="text-lg font-bold mb-2">Kampanyalar</h4>
            <p className="text-gray-500">Güncel kampanyaları kaçırmayın!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
