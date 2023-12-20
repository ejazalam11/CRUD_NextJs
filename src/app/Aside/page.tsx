import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser , faCheckCircle, faUsers, faBookOpenReader } from '@fortawesome/free-solid-svg-icons'

export default function aside() {

 
  return (
    <div>
       <div className="fixed flex flex-col  left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-gray-600 transition-all duration-300 border-none z-10 sidebar">
    <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow bg-gray-50">
      <ul className="flex flex-col py-4 space-y-1">
        <li>
          <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent">
          
            <span className="inline-flex justify-center items-center ml-4">
            <FontAwesomeIcon icon={faUser} className='p-2 text-xl text-blue-400' />
            </span>
            <span className="ml-2 tracking-wide truncate text-2xl" >Jobs</span>
          </a>
        </li>
        <li>
          <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent">
         
            <span className="inline-flex justify-center items-center ml-4">
            <FontAwesomeIcon icon={faCheckCircle} className='p-2 text-xl text-blue-400' />
            </span>
            <span className="ml-1 tracking-wide truncate text-2xl">Skill</span>
          </a>
        </li>
        <li>
          <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent">
         
            <span className="inline-flex justify-center items-center ml-4">
            <FontAwesomeIcon icon={faBookOpenReader} className='p-1 ml-1 text-xl text-blue-400' />
            </span>
            <span className="ml-1  tracking-wide truncate text-2xl">Critaria</span>
          </a>
        </li>
        <li>
          <a href="#" className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-cyan-100 text-gray-600 hover:text-gray-800 border-l-4 border-transparent">
           
            <span className="inline-flex justify-center items-center ml-4">
            <FontAwesomeIcon icon={faUsers} className='p- text-xl text-blue-400 ml-2' />
            </span>
            <span className="ml-1 t tracking-wide truncate text-center text-2xl">Users</span>
          </a>
        </li>
        <li>
        
        </li>
      </ul>
      <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2021</p>
    </div>
  </div>

<body/>

</div>
  )
}
