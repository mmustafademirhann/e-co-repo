import { useState } from 'react'
import { Grid, List, ChevronDown } from 'lucide-react'

export const FilterBar = () => {
    const [viewMode, setViewMode] = useState('grid')
    
    return (
      <div className="h-[60px] min-h-[60px] flex justify-between items-center bg-white w-full px-4 mt-6" style={{height: '60px'}}>
        <div className="flex items-center">
          <span className="text-sm font-bold text-[#737373]">
            Showing all 12 results
          </span>
        </div>
        
        <div className="flex items-center justify-center">
          <span className="text-sm text-[#737373] mr-2">Views:</span>
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
        
        <div className="flex items-center gap-2">
          <div className="h-9 flex items-center">
            <div className="h-9 flex items-center px-3 bg-white border border-[#DDDDDD] rounded">
              <span className="text-sm text-[#737373]">Popularity</span>
              <ChevronDown size={16} className="text-[#23A6F0] ml-1" strokeWidth={2} />
            </div>
          </div>
          
          <button className="h-9 flex items-center bg-[#23A6F0] text-white px-6 rounded">
            <span className="text-sm font-medium">Filter</span>
          </button>
        </div>
      </div>
    )
}
