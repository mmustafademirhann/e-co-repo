import LightNavbar from './LightNavbar'
import DarkNavbar from './DarkNavbar'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <DarkNavbar />
      <LightNavbar />
      
    </header>
  )
}

export default Header
