import { partnersForShopPage } from '../data'
export const Partners = () => {
    return (
        <div className="py-12 px-4 bg-[#FAFAFA]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center max-w-6xl mx-auto">
          {partnersForShopPage.map(partner => (
            <img
              key={partner.id}
              src={partner.image}
              alt={partner.alt}
              className="h-10 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          ))}
        </div>
      </div>
    )
}
