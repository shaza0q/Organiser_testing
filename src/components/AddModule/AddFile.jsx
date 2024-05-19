import React, {useState} from 'react'
import Model from 'react-modal'

export const AddFile = ({visible, onClose, onFileUpload}) => {
        
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')

    const handleSubmit = (e) => {
        const formData = new FormData()
        formData.append('file', file)
        fetch(
            'url',
            {
                method: "POST",
                body: formData
            }
        ).then((res) => res.json())
        .then((result) => {console.log('success', result)})
        .catch(err => {console.log(err)})
    }

    const handleFile = (e) => {
        setFile(e.target.files[0])
        console.log(e.target.files[0])
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
        },
      };

  return (
    <div>
        <Model isOpen={visible} onRequestClose={onClose} style={customStyles}>
            <form className="addModule" onSubmit={handleSubmit}>
                <input type="file" onChange={handleFile}/>
                <button type='submit' className='module-submit-btn'>Save Changes</button>
            
            </form>
            <button onClick={onClose}> Cancel</button>
        </Model>
    </div>
  )
}
