import LightNavbar from './LightNavbar'
import DarkNavbar from './DarkNavbar'
import { useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()

  let mode = 'default'
  if (location.pathname === '/shop') {
    mode = 'shop'
  } else if (location.pathname === '/contact') {
    mode = 'contact'
  }
  return (
    <header className="sticky top-0 z-50 bg-white shadow">
      <DarkNavbar mode ={mode}/>
      <LightNavbar />
      
    </header>
  )
}

export default Header
