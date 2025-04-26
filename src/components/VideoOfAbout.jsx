const VideoOfAbout = () => {
    return (
        <section className="py-12 px-4 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Mountain landscape" 
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}
export default VideoOfAbout;