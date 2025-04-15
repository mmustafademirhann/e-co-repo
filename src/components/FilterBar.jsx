import { useState } from 'react'
import { Grid, List, ChevronDown } from 'lucide-react'
export const FilterBar = () => {
    
    const [viewMode, setViewMode] = useState('grid')
    return (
        <div className="py-8 px-4 flex flex-col md:flex-row justify-between items-center bg-white border-t border-b mt-6">
        <div className="text-sm text-[#737373] mb-4 md:mb-0">
          Showing all 12 results
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <span className="text-sm text-[#737373] mr-2">Views:</span>
            <button 
              className={`p-2 border border-[#E8E8E8] text-[#252B42] ${viewMode === 'grid' ? 'bg-[#23A6F0] text-white' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid size={18} />
            </button>
            <button 
              className={`p-2 border border-[#E8E8E8] text-[#252B42] ${viewMode === 'list' ? 'bg-[#23A6F0] text-white' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
            </button>
          </div>
          <div className="relative">
            <div className="flex items-center bg-[#F9F9F9] border border-[#DDDDDD] rounded-md px-4 py-2 gap-2 text-sm">
              <span>Popularity</span>
              <ChevronDown size={16} className="text-[#23A6F0]" />
            </div>
          </div>
          <button className="bg-[#23A6F0] text-white px-5 py-2 rounded-md text-sm font-medium">
            Filter
          </button>
        </div>
      </div>

    )
}
