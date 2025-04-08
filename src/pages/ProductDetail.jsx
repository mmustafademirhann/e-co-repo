const ProductDetail = ({ selectedProduct }) => {
    if (!selectedProduct) {
      return <p className="p-4">No product selected.</p>
    }
  
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{selectedProduct.name}</h1>
        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-48 h-48 object-cover mb-4" />
        <p className="text-lg">Price: ${selectedProduct.price}</p>
      </div>
    )
  }
  
  export default ProductDetail
  