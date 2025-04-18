import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { Product } from '../components/Product'
import { productsForShopPage } from '../data'
import { ShopHeader } from '../components/ShopHeader'
import { CategoryBanners } from '../components/CategoryBanners'
import { FilterBar } from '../components/FilterBar'
import { Pagination } from '../components/Pagination'
import { Partners } from '../components/Partners'

const ShopPage = () => {
  const history = useHistory()
  const [currentPage, setCurrentPage] = useState(1)


  const handleClick = (product) => {
    history.push({
      pathname: '/product',
      state: { product }
    })
  }

  return (
    <div className="min-h-screen bg-white max-w-7xl mx-auto">
      {/* Shop Header with Breadcrumb */}
      <ShopHeader />
      {/* Category Banners */}
      <CategoryBanners />
      {/* Filter Bar */}
      <FilterBar />
      {/* Products Section */}
      <div className="px-4 py-8">
        <Product products={productsForShopPage} />
      </div>
      {/* Pagination */}
      <Pagination />

      {/* Partners Section */}
      <Partners />
    </div>
  )
}

export default ShopPage