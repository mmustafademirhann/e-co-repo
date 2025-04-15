export const Lgy = () => {
    return (
        <section className="bg-[#2A7CC7] text-white">
            <div className="h-screen md:h-[80vh] flex flex-col lg:flex-row">
                {/* Sol taraf - metin içeriği */}
                <div className="w-full lg:w-3/5 h-full flex items-center justify-center">
                    <div className="text-center lg:text-left mx-auto lg:mx-0 lg:ml-24 max-w-md">
                        <p className="uppercase mb-3 text-sm font-medium">WORK WITH US</p>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                            Now Let's grow Yours
                        </h2>
                        <p className="mb-10 opacity-80">
                            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th century
                        </p>
                        <div className="flex justify-center lg:justify-start">
                            <button className="border-2 border-white py-3 px-8 rounded font-medium cursor-pointer">
                                Button
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Sağ taraf - fotoğraf bölümü */}
                <div className="hidden lg:block lg:w-2/5 h-full">
                    <img
                        src="https://picsum.photos/seed/mountains/1200/1000"
                        alt="Mountain landscape"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    )
}
