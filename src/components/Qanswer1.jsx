import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react'
export const Qanswer1 = () => {
    return (
        <section className="bg-white py-16 md:py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#252B42] mb-6">
            Get answers to all your questions.
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto mb-10">
            Problems trying to resolve the conflict between the two major realms of Classical physics.
          </p>
          <button className="bg-[#23A6F0] text-white py-3 px-8 rounded font-medium mb-10">
            CONTACT OUR COMPANY
          </button>
          
          <div className="flex justify-center gap-5">
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-600">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </section>
    )
}
