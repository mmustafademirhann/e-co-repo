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

  return (
    <>
      {/* Carousel tam ekran */}
      <Carousel images={carouselImages} />

      {/* Diğer içerikler ortalı ve sınırlı */}
      <div className=" px-4">
        {/* Kategoriler */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8">
          {["Kadın", "Erkek", "Çocuk", "Aksesuar"].map((category) => (
            <div
              key={category}
              className="bg-gray-100 hover:bg-blue-100 rounded-lg p-6 text-center shadow cursor-pointer"
            >
              <h3 className="text-lg font-semibold">{category}</h3>
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
