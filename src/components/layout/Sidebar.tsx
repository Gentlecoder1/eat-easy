import React from 'react'
import Backdrop from './Backdrop'

const Sidebar = ({ handleClose }) => {
  return (
    <Backdrop onClick={handleClose}>

    </Backdrop>
  )
}

export default Sidebar