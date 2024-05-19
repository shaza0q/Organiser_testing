import React from 'react'
import "./Card.css"
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable"
import { Module } from './Module/Module'

export const Card = ({modules, onDelete, onEdit}) => {

  return (
    <div className='Card'> 
        <SortableContext items={modules} 
        strategy={verticalListSortingStrategy}>
            {modules.map((module) => (
                <Module id={module.id} 
                title={module.title} 
                key={module.id}
                onDelete={onDelete}
                onEdit={onEdit}/>
            ))}
        </SortableContext>
    </div>
  )
}
