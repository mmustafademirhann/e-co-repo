import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid, List, Search } from 'lucide-react'
import { fetchProducts, setFilter, setSort } from '../redux/actions/productActions'

export const FilterBar = () => {
    const dispatch = useDispatch()
    const [viewMode, setViewMode] = useState('grid')
    
    const { total, categoryId, filter, sort } = useSelector(state => state.product)
    
    const handleFilterChange = (value) => {
        dispatch(setFilter(value))
        const params = { categoryId }
        if (value) params.filter = value
        if (sort) params.sort = sort
        dispatch(fetchProducts(params))
    }
    
    const handleSortChange = (value) => {
        dispatch(setSort(value))
        const params = { categoryId }
        if (filter) params.filter = filter
        if (value) params.sort = value
        dispatch(fetchProducts(params))
    }
    
    return (
        <div className="h-auto min-h-[60px] flex flex-col md:flex-row justify-between items-start md:items-center bg-white w-full px-4 py-4 gap-4">
            <div className="flex items-center">
                <span className="text-sm font-bold text-[#737373]">
                    {total ? `Showing all ${total} results` : 'Loading...'}
                </span>
            </div>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-4">
                    {/* Sort Select */}
                    <select
                        id="sortSelect"
                        name="sort"
                        value={sort || ''}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="h-10 px-3 border border-[#DDDDDD] rounded text-sm text-[#737373] min-w-[160px]"
                    >
                        <option value="">Sort by</option>
                        <option value="price:asc">Price: Low to High</option>
                        <option value="price:desc">Price: High to Low</option>
                        <option value="rating:asc">Rating: Low to High</option>
                        <option value="rating:desc">Rating: High to Low</option>
                    </select>

                    {/* Filter Input */}
                    <div className="relative flex-1 min-w-[200px]">
                        <input
                            id="filterInput"
                            name="filter"
                            type="text"
                            value={filter || ''}
                            onChange={(e) => handleFilterChange(e.target.value)}
                            placeholder="Search products..."
                            className="h-10 pl-3 pr-10 w-full border border-[#DDDDDD] rounded text-sm"
                        />
                        <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 ml-auto md:ml-4">
                    <span className="text-sm text-[#737373]">Views:</span>
                    <div className="flex h-8">
                        <button 
                            className={`w-10 h-8 flex items-center justify-center border border-[#E8E8E8] ${viewMode === 'grid' ? 'bg-[#23A6F0] text-white' : 'text-[#252B42]'}`}
                            onClick={() => setViewMode('grid')}
                            style={{borderRight: 'none'}}
                        >
                            <Grid size={16} strokeWidth={1.5} />
                        </button>
                        <button 
                            className={`w-10 h-8 flex items-center justify-center border border-[#E8E8E8] ${viewMode === 'list' ? 'bg-[#23A6F0] text-white' : 'text-[#252B42]'}`}
                            onClick={() => setViewMode('list')}
                        >
                            <List size={16} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
