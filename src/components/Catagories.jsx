import CategoryCard from "./CategoryCard";

const Categories = ({ categories }) => {
  const menCategory = categories.find(cat => cat.layoutSlot === 'men');
  const womenCategory = categories.find(cat => cat.layoutSlot === 'women');
  const accessoriesCategory = categories.find(cat => cat.layoutSlot === 'accessories');
  const kidsCategory = categories.find(cat => cat.layoutSlot === 'kids');

  const requiredCategoriesFound = menCategory && womenCategory && accessoriesCategory && kidsCategory;

  if (!requiredCategoriesFound) {
    console.warn("İstenen layout için gerekli layoutSlot'lara sahip kategoriler (men, women, accessories, kids) bulunamadı. Varsayılan grid gösteriliyor.");
    return (
      <div className="grid grid-cols-1 gap-4 mb-8 mt-8 p-4">
        <p className="text-center text-gray-500 col-span-full">Kategoriler yüklenemedi veya beklenen formatta değil.</p>
      </div>
    );
  }

  return (
    <div className="mb-8 mt-10">
      {/* Mobil görünüm için ayrı konteyner - küçük ekranlarda görünür */}
      <div className="flex flex-col gap-6 md:hidden">
        {/* MEN - tam genişlik, dikey kartlı görünüm */}
        <div className="aspect-[3/4] w-full">
          <CategoryCard
            category={menCategory}
            className="h-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
        
        {/* WOMEN - tam genişlik, dikey kartlı görünüm */}
        <div className="aspect-[3/4] w-full">
          <CategoryCard
            category={womenCategory}
            className="h-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
        
        {/* ACCESSORIES - tam genişlik, dikey kartlı görünüm */}
        <div className="aspect-[3/2] w-full">
          <CategoryCard
            category={accessoriesCategory}
            className="h-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
        
        {/* KIDS - tam genişlik, dikey kartlı görünüm */}
        <div className="aspect-[3/2] w-full">
          <CategoryCard
            category={kidsCategory}
            className="h-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>
      </div>
      
      {/* Masaüstü görünüm için grid yapısı - mobilde gizli */}
      <div className="hidden md:grid md:grid-cols-12 gap-4">
        {/* ERKEK - Sol taraf (5/12 genişlik) */}
        <div className="md:col-span-5 md:h-[450px]">
          <CategoryCard
            category={menCategory}
            className="h-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>

        {/* KADIN - Orta (3/12 genişlik) */}
        <div className="md:col-span-3 md:h-[450px]">
          <CategoryCard
            category={womenCategory}
            className="h-full"
            imgClassName="h-full w-full object-cover"
          />
        </div>

        {/* Sağ taraf - Aksesuar ve Çocuk için konteyner */}
        <div className="md:col-span-4 flex flex-col gap-4 md:h-[450px]">
          {/* AKSESUAR - Sağ üst */}
          <div className="md:h-[220px]">
            <CategoryCard
              category={accessoriesCategory}
              className="h-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>

          {/* ÇOCUK - Sağ alt */}
          <div className="md:h-[216px]">
            <CategoryCard
              category={kidsCategory}
              className="h-full"
              imgClassName="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;