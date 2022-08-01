import React, { useState } from 'react'
import './styles.css'
import giveTreat from '../../assets/images/giveTreat.svg'

const AddTreatModel = ({show, close, handleTreat}) => {


if(!show){
    return null
}


  return (
    <div className='model-container-father' >
        <div className='model-container'>
            <div className='model-header-div'>
            <h1>Buy a </h1> <h1 className='treat'>Treat</h1>
            </div>
          

            <img src={giveTreat} alt='person giving dog treat' />

         
            <div className='buttonContainer'>
            <button className='purchase-button' onClick={handleTreat}>Purchase</button>
           <button className='cancel-button' onClick={close}>Cancel</button>
            </div>
         
        </div>
    </div>
  )
}

export default AddTreatModel