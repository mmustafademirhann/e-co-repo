import { useState } from 'react'
export const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1)
    return (
        <div className="flex justify-center py-10">
            <div className="inline-flex border border-[#E9E9E9] rounded-md overflow-hidden">
                <button className="px-5 py-3 text-[#BDBDBD] border-r border-[#E9E9E9]">
                    First
                </button>
                <button
                    className={`px-5 py-3 ${currentPage === 1 ? 'bg-[#23A6F0] text-white' : 'text-[#23A6F0]'}`}
                    onClick={() => setCurrentPage(1)}
                >
                    1
                </button>
                <button
                    className={`px-5 py-3 ${currentPage === 2 ? 'bg-[#23A6F0] text-white' : 'text-[#23A6F0]'}`}
                    onClick={() => setCurrentPage(2)}
                >
                    2
                </button>
                <button className="px-5 py-3 text-[#23A6F0] border-l border-[#E9E9E9]">
                    Next
                </button>
            </div>
        </div>
    )
}
