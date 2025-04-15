export const Qanswers2 = () => {
    return (
        <section 
        className="py-16 md:py-28 px-6 relative"
        style={{
          backgroundImage: 'url(https://picsum.photos/seed/chair/1200/700)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center'
        }}
      >
        <div 
          className="absolute inset-0"
         
        ></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="md:flex md:items-center">
            <div className="md:w-1/2 pr-0 md:pr-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-6">
                Questions & Answers
              </h2>
              <p className="text-gray-500 mb-8">
                Problems trying to resolve the conflict between the two major realms of Classical physics.
              </p>
              <a href="#" className="text-[#23A6F0] font-medium">
                CONTACT US
              </a>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
              {/* Bos div - arkaplan zaten mevcut */}
            </div>
          </div>
        </div>
      </section>
    )
}