const PageContent = ({ children }) => {
    return (
      <main className="flex-grow bg-white">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    )
  }
  
  export default PageContent
  