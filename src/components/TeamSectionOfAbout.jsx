const TeamSectionOfAbout = () => {
    return (
        <section className="py-12 px-15 md:px-12 mx-auto md:mx-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-yellow-400 w-full aspect-square rounded-lg mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl">Sarah Johnson</h3>
              <p className="text-gray-600">CEO & Founder</p>
              <div className="flex space-x-2 mt-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">f</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">in</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">tw</span>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-red-400 w-full aspect-square rounded-lg mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl">Jessica Lee</h3>
              <p className="text-gray-600">Lead Designer</p>
              <div className="flex space-x-2 mt-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">f</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">in</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">tw</span>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-400 w-full aspect-square rounded-lg mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" 
                  alt="Team member" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-xl">Mark Williams</h3>
              <p className="text-gray-600">CTO</p>
              <div className="flex space-x-2 mt-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">f</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">in</span>
                <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">tw</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
}
export default TeamSectionOfAbout;