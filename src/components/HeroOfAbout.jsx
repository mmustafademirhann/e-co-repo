const HeroOfAbout = () => {
    return (
        <section className="bg-white py-16 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-items-center md:text-left text-center ">
          <div >
            <p className="text-gray-600 text-sm font-medium uppercase mb-2">ABOUT COMPANY</p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#252B42] mb-6">ABOUT US</h1>
            <p className="text-gray-700 mb-8 max-w-xl">
              We know how large objects will act, 
              <br />but things on a small scale
            </p>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-md font-medium">
              Get Quote Now
            </button>
          </div>
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-pink-100 rounded-full -z-10"></div>
              <img 
                src="/src/assets/cinlikizbalon.png" 
                alt="Chinese girl with balloon" 
                className="relative z-10 w-[632px] h-[612px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    )
}
export default HeroOfAbout;