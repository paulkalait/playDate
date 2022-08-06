import React from 'react'

const editProfileModal = ({show, close}) => {

    if(!show){
        return null
    }
  return (
    <div className='model-container-father' >
    <div className='model-container'>
        <div className='model-header-div'>
        <h1>Edit Profile</h1>
        </div>
      
        <div className='buttonContainer'>
        <button className='purchase-button' onClick={handleTreat}>Save</button>
       <button className='cancel-button' onClick={close}>Cancel</button>
        </div>
     
    </div>
</div>
  )
}

export default editProfileModal