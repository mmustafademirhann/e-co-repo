const ProductCard = ({ product, onClick }) => {
    return (
      <div className="border p-4 rounded-lg shadow hover:shadow-lg cursor-pointer" onClick={onClick}>
        <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
        <h3 className="font-semibold">{product.name}</h3>
        <p>${product.price}</p>
      </div>
    )
  }
  
  export default ProductCard
  