export const ShopHeader = () => {
    return (
        <div className="bg-white px-4 py-5 flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-2xl font-bold text-[#252B42]">Shop</h1>
            <div className="flex items-center text-sm mt-2 md:mt-0">
                <a href="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</a>
                <span className="mx-2 text-[#BDBDBD]">{'>'}</span>
                <span className="text-[#BDBDBD]">Shop</span>
            </div>
        </div>
    )
}
