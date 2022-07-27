import React from 'react'
import './style.css'
import CopyrightOutlined from '@material-ui/icons/CopyrightOutlined'

const Footer = () => {
  return (
    <footer>
        <div className='copyright-div'>
        <CopyrightOutlined  className='copy-icon'/>
        <h1> PlayDate</h1>
        </div>
       

        <p>Thank you for visiting!</p>
    </footer>
  )
}

export default Footer