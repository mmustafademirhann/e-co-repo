import Carousel from '../components/Carousel';
import Catagories from '../components/Catagories';
import {Products} from '../components/Products';
import HeroSection from '../layout/HeroSection';
import {carouselImages,categories,productsImages,heroData}from '../data.js'
import FeaturedPosts from '../layout/FeaturedPosts';


const HomePage = () => {
  return (
    <>
      {/* Carousel tam ekran */}
      <Carousel images={carouselImages} />
      {/* Diğer içerikler ortalı ve sınırlı */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Kategoriler */}
        <Catagories categories={categories} />
        {/* Kampanya Banner */}
        <div className="relative bg-blue-600 text-white text-center py-10 mb-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold">Yılın En Büyük İndirimi</h2>
          <p className="mt-2 text-lg">Seçili ürünlerde %50'ye varan indirimler seni bekliyor!</p>
        </div>
        {/* Ürünler */}
        <Products products={productsImages} />
        
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
      <Carousel images={carouselImages} />
      <HeroSection
        image={heroData.image}
        season={heroData.season}
        title={heroData.title}
        description={heroData.description}
        primaryBtn={heroData.primaryBtn}
        secondaryBtn={heroData.secondaryBtn}
      />
      <div className="max-w-7xl mx-auto px-4">
      <FeaturedPosts />
      </div>
      {/* Featured Posts */}
      
    </>
  );
};

export default HomePage;
