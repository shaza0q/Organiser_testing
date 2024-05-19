import React from 'react'
import "./Module.css"
import Dropdown from 'react-bootstrap/Dropdown';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IoIosArrowDropdown } from "react-icons/io";
import { FaLink } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";



export const Module = ({id, title, onDelete, onEdit, onDeleteLink, onEditLink, isLink}) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

    const style = {
        transition, 
        transform: CSS.Transform.toString(transform),
        zIndex:1
    }

    const handleMouseDown = (e) => {
        e.stopPropagation()
    }

  return (
    <>
    <div className='wmodule'>
        <div ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style} className='module'>
            {isLink ? (
              <a href={isLink} key={id} target="_blank" rel="noopener noreferrer">
                <span style={{backgroundColor:'white'}}><FaLink size={20} style={{color:'#78E7FD'}}/></span>
                <span>{title}</span>
              </a>
            ): (
                <span className="text"><IoIosArrowDropdown size={25}/>
                {title}</span>
            )}
            
        </div>
        <div className='options'>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" onMouseDown={handleMouseDown} style={{backgroundColor: 'rgb(175, 174, 174)', border:'none', size:'20px'}}>
                <BsThreeDotsVertical />
            </Dropdown.Toggle>

            {isLink ? (
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onEditLink(id)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDeleteLink(id)} >Delete</Dropdown.Item>
                </Dropdown.Menu>
            ):(
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => onEdit(id)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDelete(id)} >Delete</Dropdown.Item>
                </Dropdown.Menu>
            )}
            
        </Dropdown>
        </div>

    </div>

    </>
  )
}
