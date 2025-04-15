import React from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Jacob Jones',
    position: 'Designer',
    image: 'https://picsum.photos/seed/jacob/200'
  },
  {
    id: 2,
    name: 'Kathryn Murphy',
    position: 'Manager',
    image: 'https://picsum.photos/seed/kathryn/200'
  },
  {
    id: 3,
    name: 'Esther Howard',
    position: 'Designer',
    image: 'https://picsum.photos/seed/esther/200'
  },
  {
    id: 4,
    name: 'Marvin McKinney',
    position: 'Developer',
    image: 'https://picsum.photos/seed/marvin/200'
  },
  {
    id: 5,
    name: 'Floyd Miles',
    position: 'Developer',
    image: 'https://picsum.photos/seed/floyd/200'
  },
  {
    id: 6,
    name: 'Jenny Wilson',
    position: 'Developer',
    image: 'https://picsum.photos/seed/jenny/200'
  },
  {
    id: 7,
    name: 'Ronald Richards',
    position: 'Designer',
    image: 'https://picsum.photos/seed/ronald/200'
  },
  {
    id: 8,
    name: 'Bessie Russell',
    position: 'Developer',
    image: 'https://picsum.photos/seed/bessie/200'
  },
  {
    id: 9,
    name: 'Darrell Lane',
    position: 'Designer',
    image: 'https://picsum.photos/seed/darrell/200'
  }
];

const TeamPage = () => {
  return (
    <div className="bg-white">
     

      {/* Mobile View */}
      <div className="lg:hidden py-10 px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center text-[#252B42] mb-4">
            Meet Our Team
          </h1>
          <p className="text-sm text-gray-500 text-center mb-8">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>

          <div className="space-y-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-[#252B42]">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block py-16 px-8">
        <div className="max-w-4xl mx-auto bg-white p-12 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-[#252B42] mb-4">
            Meet Our Team
          </h1>
          <p className="text-base text-gray-500 text-center max-w-md mx-auto mb-12">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>

          <div className="grid grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mb-3"
                />
                <h3 className="font-medium text-[#252B42] text-center">{member.name}</h3>
                <p className="text-sm text-gray-500 text-center">{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;