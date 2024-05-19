import React, { useEffect, useState } from 'react'
import Model from 'react-modal' 
import './AddModule.css'


export const EditModule = ({visible, onClose, onSubmit, initialTitle, initialLink, isEditingLink}) => {
    const [input, setInput] = useState('')
    const [link, setLink] = useState('')
    
    useEffect(()=> {
        setInput(initialTitle || '')
        setLink(initialLink || '')
    }, [initialTitle, initialLink])
    
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
          height:"390px",
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
                <h4>Edit</h4>

                <span>Edit title</span>
                <input type="text" className='module-input' placeholder='edit Module' 
                onChange={(e) => setInput(e.target.value)}/>

                {isEditingLink && (
                    <>
                    <span>Edit link</span>
                    <input type="text" className='module-input' placeholder="Edit Link" 
                    onChange={(e) => setLink(e.target.value)}/>
                    </>
                )}
                
                <div className='btn'>
                    <button onClick={onClose} className='module-submit-btn cancel'> Cancel</button>
                    <button type='submit' className='module-submit-btn'>Save Changes</button>
                </div>
            </form>
        </Model>
    </div>
  )
}
