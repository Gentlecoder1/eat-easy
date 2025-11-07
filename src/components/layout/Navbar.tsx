import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Backdrop from './Backdrop'

interface NavbarProps {
  toggle: boolean
  menuOpen: number | null
  setMenuOpen: (id: number | null) => void
  toggleNav: () => void
  closeNav: () => void
}

const Navbar: React.FC<NavbarProps> = ({ toggle, menuOpen, setMenuOpen, toggleNav, closeNav }) => {
  // When a submenu is opened, ensure the sidebar opens on desktop as well.
  const handleSetMenuOpen = (id: number | null) => {
    setMenuOpen(id)
    if (id !== null && !toggle) {
      toggleNav()
    }
  }

  return (
    <header className="w-full bg-white border-b border-black">
      <Header onToggle={toggleNav} toggle={toggle} />
      <Sidebar toggle={toggle} menuOpen={menuOpen} setMenuOpen={handleSetMenuOpen} onClose={closeNav} onToggle={toggleNav} />

      {toggle && (
        <Backdrop onClick={closeNav} />
      )}
    </header>
  )
}

export default Navbar