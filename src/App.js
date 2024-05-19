import './App.css';
import React, {useState} from 'react'
import {DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensors, closestCorners, useSensor} from "@dnd-kit/core"
import Dropdown from 'react-bootstrap/Dropdown';
import { Card } from './components/card/Card';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { AddModule } from './components/AddModule/AddModule';
import { EditModule } from './components/AddModule/EditModule';
import { AddLink } from './components/AddModule/AddLink';
import { Link } from './components/card/Link/Link';
import { FaPlus } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { MdOutlineFileUpload } from "react-icons/md";
import emptyStateImage from './assets/emptyBox.png'
import { MdDragIndicator } from "react-icons/md";


export default function App() {

  const [visibleModule, setVisibleModule] = useState(false)
  const [visibleEditModule, setVisibleEditModule] = useState(false)
  const [currentEditModule, setCurrentEditModule] = useState(null)
  const [visibleEditLink ,setVisibleEditLink] = useState(false)
  const [currentEditLink, setCurrentEditLink] = useState(null)
  const [visibleLink, setVisibleLink] = useState(false)
  const [visibleFile, setVisibleFile] = useState(false)

  const [modules, setModules] = useState([
    {id: 1, title: "Adding task1"},
    {id: 2, title: "Adding task 2"},
  ])

  const [links, setLinks] = useState([
    {id: 1, title: "Game link", link: "www.google.com"},
    {id: 2, title: "Video link", link: "www.youtube.com"}
  ])

  const [files, setFiles] = useState([
    {id: 1, title: "toc unit 3"},
  ])

  const getModulePos = id => modules.findIndex(module => module.id === id)
  const getLinkPos = id => links.findIndex(link => link.id === id)

  const handleDragEnd = e => {
    const {active, over} = e

    if(active.id === over.id)return

    setModules((modules) => {
      const originalPos = getModulePos(active.id)
      const newPos = getModulePos(over.id)

      return arrayMove(modules, originalPos, newPos)
    })
  }

  const handleDragEndL = e => {
    const {active, over} = e

    if(active.id === over.id)return

    setLinks((links) => {
      const originalPos = getLinkPos(active.id)
      const newPos = getLinkPos(over.id)

      return arrayMove(links, originalPos, newPos)
    })
  }


  const addModule = (title) => {
    setModules(m => [...m, {id: modules.length+1 , title}])
    setVisibleModule(false)
  }

  const deleteModule = (id) => {
    setModules(modules.filter(module => module.id !== id))
  }

  const deleteLink = (id) => {
    setLinks(links.filter(link => link.id !== id))
  }

  const editModule = (id, newTitle) => {
    setModules(modules.map(module =>
      module.id === id ? {...module, title: newTitle} : module
    ))
    setVisibleEditModule(false)
  }

  const editLink = (id, newTitle, newLink) => {
    setLinks(links.map(link => 
      link.id === id ? {...link, title: newTitle, link: newLink} : link
    ))
    setVisibleEditLink(false)
  }

  const addLink = (title, link) => {
    setLinks(l => [...l, {id: l.length+1, title, link}])
    setVisibleLink(false)
  }

  const addFile = (title) => {

  }


  const openEditModule = (id) => {
    setCurrentEditModule(id)
    setVisibleEditModule(true)
  }

  const openEditLink = (id) => {
    setCurrentEditLink(id)
    setVisibleEditLink(true)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )


  return (
    <div className="App">
      <div className='headTab'>
        <h3 id="heading3">Course Builder</h3>
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic hd"
            style={{backgroundColor: 'red', border: 'none'}}>
                <FaPlus size={20}/>Add
            </Dropdown.Toggle>

            <Dropdown.Menu className="custom-dropdown-menu">
                <Dropdown.Item onClick={() => setVisibleModule(true)} className="custom-dropdown-item"><IoReorderThreeOutline size={20}/>Create Module</Dropdown.Item>
                <Dropdown.Item onClick={() => setVisibleLink(true)} className="custom-dropdown-item"><CiLink size={20}/>Add a link</Dropdown.Item>
                <Dropdown.Item onClick={() => setVisibleFile(true)} className="custom-dropdown-item"><MdOutlineFileUpload size={20}/>Upload</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      </div>

      <AddModule
        visible={visibleModule}
        onClose={()=>setVisibleModule(false)}
        onSubmit={addModule}
      />

      <AddLink
        visible={visibleLink}
        onClose={() => setVisibleLink(false)}
        onSubmit={addLink}
      />

      {/* <AddFile
        visible={visibleFile}
        onClose={() => setVisibleFile(false)}
        onSubmit={addFile}
      /> */}

      <EditModule 
        visible={visibleEditModule || visibleEditLink}
        onClose={()=> {setVisibleEditModule(false); setVisibleEditLink(false)}}
        onSubmit={(newTitle, newLink) => {
          if(visibleEditModule){
            editModule(currentEditModule, newTitle)
          }else if(visibleEditLink){
            editLink(currentEditLink, newTitle, newLink)
          }
        }}
        initialTitle={visibleEditModule ? modules.find(module => module.id === currentEditModule)?.title : links.find(link => link.id === currentEditLink)?.title}
        initialLink = {visibleEditLink ? links.find(link=>link.id === currentEditLink)?.link: ''}
        isEditingLink={visibleEditLink}
      />

      {modules.length === 0 && links.length === 0 ? (
        <div className='empty-state'>
          <img id="emptyImage"src={emptyStateImage}/>
          <h5>Nothing added here yet</h5>
          <span>click on the [+] Add button to add items to this course</span>
        </div>
      ): (
        <div className='content'>
          <DndContext 
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
            className='dnd-context'>
              <Card modules={modules} onDelete={deleteModule} onEdit={openEditModule}/>
              <MdDragIndicator className="drag-indicator" />
            </DndContext>

            <DndContext 
            sensors={sensors}
            onDragEnd={handleDragEndL}
            collisionDetection={closestCorners}>
              <Link links={links} onDeleteLink={deleteLink} onEditLink={openEditLink}/>
              <MdDragIndicator className="drag-indicator" />
            </DndContext>
        </div>
      )}

    </div>
  );
}

