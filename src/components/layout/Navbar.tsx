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
  title: string
  text: string
  image: string
  text1: string
  link: string
}

const Navbar: React.FC<NavbarProps> = ({ toggle, menuOpen, setMenuOpen, toggleNav, closeNav, title, text, image, text1, link }) => {
  const handleSetMenuOpen = (id: number | null) => {
    setMenuOpen(id)
    if (id !== null && !toggle) {
      toggleNav()
    }
  }

  return (
    <header className="w-full bg-white border-b-2 border-[#32324D]">
      <Header onToggle={toggleNav} toggle={toggle} title={title} text={text} image={image} text1={text1} link={link} />
      <Sidebar toggle={toggle} menuOpen={menuOpen} setMenuOpen={handleSetMenuOpen} onClose={closeNav} onToggle={toggleNav} />

      {toggle && (
        <Backdrop onClick={closeNav} />
      )}
    </header>
  )
}

export default Navbar