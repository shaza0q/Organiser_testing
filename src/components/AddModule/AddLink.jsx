import React, { useEffect, useState } from 'react'
import Model from 'react-modal' 
import './AddModule.css'


export const AddLink = ({visible, onClose, onSubmit}) => {
    const [input, setInput] = useState('')
    const [link, setLink] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!input)return
        onSubmit(input, link)
        setInput('')
        setLink('')
    }

    const customStyles = {
        content: {
          width:"400px",
          height:"400px",
          top: '20%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -10%)',
          zIndex: 10000,
          position: 'relative'
        },
        overlay: {
            zIndex: 9999,
            position: 'fixed',
            
        },
      };

  return (
    <div>
        <Model isOpen={visible} onRequestClose={onClose} style={customStyles}>
            <form className="addModule" onSubmit={handleSubmit}>
                <h4>Add new link</h4>
                <span>Display name</span>
                <input type="text" className='module-input' placeholder='add Title' 
                onChange={(e) => setInput(e.target.value)}/>
                <span>URL</span>
                <input type="text" className='module-input' placeholder='add Link' 
                onChange={(e) => setLink(e.target.value)}/>
                <div className='btn'>
                  <button onClick={onClose} className='module-submit-btn cancel'> Cancel</button>
                  <button type='submit' className='module-submit-btn'>Save Changes</button>
                </div>
            </form>
        </Model>
    </div>
  )
}
