import Header from './Header'
import Footer from './Footer'
import PageContent from './PageContent'

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageContent>
        {children}
      </PageContent>
      <Footer />
    </div>
  )
}

export default Layout
