import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Backdrop from './Backdrop'

const Navbar: React.FC = () => {
  const [toggle, setToggle] = useState(false)
  const [menuOpen, setMenuOpen] = useState<number | null>(null)

  const toggleNav = () => {
    setToggle(prev => {
      if (prev) {
        setMenuOpen(null)
      }
      return !prev
    })
  }

  const closeNav = () => {
    setToggle(false)
    setMenuOpen(null)
  }

  // When a submenu is opened, ensure the sidebar opens on desktop as well.
  const handleSetMenuOpen = (id: number | null) => {
    setMenuOpen(prev => (prev === id ? null : id))
    if (id !== null && !toggle) {
      setToggle(true)
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