import React from 'react';

// Firma logolarını import edelim (varsayılan olarak şu isimleri kullanıyorum, sizin assets klasörünüzdeki gerçek dosya adlarına göre değiştirin)
import baoli from '../assets/firm/hooli.png';
import lyft from '../assets/firm/lyft.png';
import plane from '../assets/firm/yaprak.png';
import stripe from '../assets/firm/stripe.png';
import aws from '../assets/firm/aws.png';
import reddit from '../assets/firm/reddit.png';

const Firms = () => {
  // Firma logolarını bir dizide tutalım
  const firmLogos = [
    { id: 1, name: 'Baoli', image: baoli },
    { id: 2, name: 'Lyft', image: lyft },
    { id: 3, name: 'Plane', image: plane },
    { id: 4, name: 'Stripe', image: stripe },
    { id: 5, name: 'AWS', image: aws },
    { id: 6, name: 'Reddit', image: reddit }
  ];

  return (
    <div className="px-4 py-8">
      {/* Mobile View */}
      <div className="md:hidden py-8">
        <h2 className="text-2xl font-bold text-center text-[#252B42] mb-6">
          Big Companies Are Here
        </h2>
        <p className="text-center text-gray-600 text-sm mb-12">
          Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
        </p>
        
        <div className="flex flex-col space-y-20 items-center py-6">
          {firmLogos.map((logo) => (
            <div key={logo.id} className="grayscale py-2">
              <img 
                src={logo.image} 
                alt={`${logo.name} logo`} 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#252B42] mb-4">
          Big Companies Are Here
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
          Problems trying to resolve the conflict between
          <br />the two major realms of Classical physics: Newtonian mechanics
        </p>
        
        <div className="flex justify-between items-center">
          {firmLogos.map((logo) => (
            <div key={logo.id} className="grayscale hover:grayscale-0 transition-all">
              <img 
                src={logo.image} 
                alt={`${logo.name} logo`} 
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Firms;
