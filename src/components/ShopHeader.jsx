import { Link } from 'react-router-dom'

export const ShopHeader = ({ categoryName, gender }) => {
    const title = categoryName ? `${gender} ${categoryName}` : 'Shop'
    
    return (
        <div className="bg-white px-4 py-5 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-[#252B42] capitalize">{title}</h1>
            <div className="flex items-center text-sm mt-2 md:mt-0">
                <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</Link>
                <span className="mx-2 text-[#BDBDBD]">{'>'}</span>
                <Link to="/shop" className="text-[#252B42] hover:text-[#23A6F0]">Shop</Link>
                {categoryName && (
                    <>
                        <span className="mx-2 text-[#BDBDBD]">{'>'}</span>
                        <Link 
                            to={`/shop/${gender}`} 
                            className="text-[#252B42] hover:text-[#23A6F0] capitalize"
                        >
                            {gender}
                        </Link>
                        <span className="mx-2 text-[#BDBDBD]">{'>'}</span>
                        <span className="text-[#BDBDBD] capitalize">{categoryName}</span>
                    </>
                )}
            </div>
        </div>
    )
}
