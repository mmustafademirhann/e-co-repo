import Carousel from '../components/Carousel';
import Catagories from '../components/Catagories';
import {Product} from '../components/Product';
import HeroSection from '../layout/HeroSection';
import { CatagoriesLayout } from '../layout/CatagoriesLayout';
import {carouselImages,categories,productsImages,heroData}from '../data.js'
import FeaturedPosts from '../layout/FeaturedPosts';
import { ProductLayout } from '../layout/ProductLayout';


const HomePage = () => {
  return (
    <>
      {/* Carousel tam ekran */}
      <Carousel images={carouselImages} />
      {/* Diğer içerikler ortalı ve sınırlı */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Kategoriler */}
        <CatagoriesLayout c={categories} />
        {/* Kampanya Banner */}
        
        {/* Ürünler */}
        <ProductLayout p={productsImages} />
        
       
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
