import React from 'react'
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import { Module } from '../Module/Module'


export const Link = ({links, onDeleteLink, onEditLink}) => {
  return (
    <div className='Link'>
        <SortableContext items={links} 
        strategy={verticalListSortingStrategy}>
            {links.map((link) => (
                <Module 
                key={link.id}
                id={link.id}
                title={link.title}
                onDeleteLink={onDeleteLink}
                onEditLink={onEditLink}
                isLink={link.link}/>
                
            ))}
        </SortableContext>
    </div>
  )
}
