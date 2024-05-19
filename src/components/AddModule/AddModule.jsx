import React, { useState } from 'react'
import Model from 'react-modal' 
import './AddModule.css'


export const AddModule = ({visible, onClose, onSubmit}) => {
    const [input, setInput] = useState('')
    
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!input)return
        onSubmit(input)
        setInput('')
    }

    const customStyles = {
        content: {
          width:"400px",
          height:"300px",
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
                <h4>Create new module</h4>
                <span>Module name</span>
                <input type="text" className='module-input' placeholder='add Module' 
                onChange={(e) => setInput(e.target.value)}/>
                <div className='btn'>
                  <button onClick={onClose} className='module-submit-btn cancel'> Cancel</button>
                  <button type='submit' className='module-submit-btn'>Add Module</button>
                </div>
            
            </form>
        </Model>
    </div>
  )
}
