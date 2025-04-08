const PageContent = ({ children }) => {
    return (
      <main className="flex-grow bg-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    )
  }
  
  export default PageContent
  