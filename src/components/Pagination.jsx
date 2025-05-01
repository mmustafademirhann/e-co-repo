import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setLimit } from '../redux/actions/productActions';
import { Loader2 } from 'lucide-react';

export const Pagination = () => {
    const dispatch = useDispatch();
    const { total, limit, offset, filter, sort, categoryId, fetchState } = useSelector(state => state.product);
    
    const currentPage = Math.floor(offset / limit) + 1;
    const totalPages = Math.ceil(total / limit);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        const newOffset = (newPage - 1) * limit;
        const params = { 
            limit, 
            offset: newOffset,
            categoryId,
            filter,
            sort
        };
        dispatch(fetchProducts(params));
    };

    const handleLimitChange = (newLimit) => {
        dispatch(setLimit(Number(newLimit)));
        const params = {
            limit: Number(newLimit),
            offset: 0, // Reset to first page when changing page size
            categoryId,
            filter,
            sort
        };
        dispatch(fetchProducts(params));
    };

    if (totalPages <= 0) return null;

    return (
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4 bg-[#FAFAFA] gap-4">
            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Show:</span>
                <select 
                    id="limitSelect"
                    name="limit"
                    value={limit}
                    onChange={(e) => handleLimitChange(e.target.value)}
                    className="h-10 px-3 border border-[#DDDDDD] rounded text-sm text-[#737373]"
                >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span className="text-sm text-gray-600">
                    {`Showing ${offset + 1}-${Math.min(offset + limit, total)} of ${total} products`}
                </span>
            </div>

            <div className="flex text-sm items-center gap-2">
                <button 
                    className={`px-5 py-3 border border-[#E9E9E9] rounded-l ${
                        currentPage === 1 || fetchState === 'FETCHING' 
                            ? 'text-gray-400 cursor-not-allowed' 
                            : 'text-[#23A6F0] hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || fetchState === 'FETCHING'}
                >
                    Previous
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                        pageNum = i + 1;
                    } else if (currentPage <= 3) {
                        pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                    } else {
                        pageNum = currentPage - 2 + i;
                    }

                    return (
                        <button
                            key={pageNum}
                            className={`px-5 py-3 border-y border-r border-[#E9E9E9] ${
                                fetchState === 'FETCHING'
                                    ? 'cursor-not-allowed ' + (currentPage === pageNum ? 'bg-[#23A6F0] text-white' : 'text-gray-400')
                                    : currentPage === pageNum
                                    ? 'bg-[#23A6F0] text-white'
                                    : 'text-[#23A6F0] hover:bg-gray-50'
                            }`}
                            onClick={() => handlePageChange(pageNum)}
                            disabled={fetchState === 'FETCHING'}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button 
                    className={`px-5 py-3 border-y border-r border-[#E9E9E9] rounded-r ${
                        currentPage === totalPages || fetchState === 'FETCHING'
                            ? 'text-gray-400 cursor-not-allowed'
                            : 'text-[#23A6F0] hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || fetchState === 'FETCHING'}
                >
                    {fetchState === 'FETCHING' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        'Next'
                    )}
                </button>
            </div>
        </div>
    );
};
