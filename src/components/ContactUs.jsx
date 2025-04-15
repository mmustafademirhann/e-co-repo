import { contactLocations } from '../data'
export const ContactUs = () => {
    return (
        <section 
        className="text-white py-12 md:py-16 relative"
        style={{
          backgroundImage: 'url(https://picsum.photos/seed/sark/1200/800)',
          backgroundSize: 'cover',
          backgroundPosition: 'right center'
        }}
      >
        <div 
          className="absolute inset-0"
        ></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="md:flex md:items-center">
            <div className="px-6 md:w-1/3 md:px-8 mb-10 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">
                Contact Us
              </h2>
              <p className="mb-8">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </p>
              <button className="bg-transparent border-2 border-white py-3 px-8 rounded font-medium">
                CONTACT US
              </button>
            </div>
            
            <div className="md:w-2/3 relative">
              <div className="px-6 md:px-0">
                <div className="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 md:pr-8 md:pl-24 md:py-16">
                  {contactLocations.map((location, index) => (
                    <div key={index} className="mb-10 md:mb-0">
                      <h3 className="font-bold text-xl mb-4">{location.city}</h3>
                      <p className="mb-1">{location.address}</p>
                      <p className="mb-4">{location.zip}</p>
                      <p className="mb-1">Phone: {location.phone}</p>
                      <p>Fax: {location.fax}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
