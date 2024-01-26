"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button/page';
import EditModel from './EditModel/page';
import Createe from './Createe/page';
// import Aside from './Aside/page';
import Dashbord from './Dashbord/page';
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import {faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface IData {
  id: number;
  e_job: string;
  e_skill: number;
  e_criteria: string;
}

const Read: React.FC = () => {
  const [api, setApi] = useState<IData[]>([]);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState<IData | null>(null);
  const [deleteButtonClick, setDeleteButtonClick] = useState(false);

  function getData() {
    axios.get('https://6537c4e9a543859d1bb0cc81.mockapi.io/crud').then((response) => {
      setApi(response.data);
    });
  }

  const handleDelete = async (id: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  
    try {
      await axios.delete(`https://6537c4e9a543859d1bb0cc81.mockapi.io/crud/${id}`);
      getData();
      if (!isEditModalOpen) {
        openEditModal(id);
      }
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const openEditModal = async (id: number) => {
    try {
      const response = await axios.get(`https://6537c4e9a543859d1bb0cc81.mockapi.io/crud/${id}`);
      const data = response.data;

      setEditModalOpen(true);
      setEditData(data);
    } catch (error) {
      console.error('Error fetching data for EditModel:', error);
    }
  };

  const handleUpdate = (updatedData: IData) => {
    const updatedApi = api.map((item) => (item.id === updatedData.id ? updatedData : item));
    setApi(updatedApi);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreateModalClose = async () => {
    setCreateModalOpen(false);
    const response = await axios.get('https://6537c4e9a543859d1bb0cc81.mockapi.io/crud');
    setApi(response.data);
  };

  return (
    <div>
      <Dashbord/>
    
          <div className="table-container ">
            <table className="w-[80%] ml-[20%] ">
              <thead>
                <tr className='bg-blue-50'>
                  <th className="p-3 text-lg   text-black ">ID</th>
                  <th className="p-3 text-lg   text-black  -">Job Title</th>
                  <th className="p-3 text-lg   text-black  ">Skill</th>
                  <th className="p-3 text-lg   text-black  ">Criteria</th>
                </tr>
              </thead>
              <tbody>
                {api.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => openEditModal(item.id)}
                    style={{ cursor: 'pointer' }}
                    className='hover:bg-gray-50'
                  >
                    <td className=" text-sm border-b-2 border-gray-100 border-r-0 border-l-0 border-t-0  text-center text-black">{item.id}</td>
                    <td className="text-sm border-b-2  border-gray-100 border-r-0 border-l-0 border-t-0    text-center text-black">{item.e_job}</td>
                    <td className="text-sm border-b-2  border-gray-100 border-r-0 border-l-0 border-t-0  text-center text-black">{item.e_skill}</td>
                    <td className=" text-sm border-b-2  border-gray-100 border-r-0 border-l-0 border-t-0 text-center text-black">{item.e_criteria}</td>
                    <td>
                      <div className="text-center">
                        {/* <Button
                          className="p-3 bg-blue-600 text-white rounded-3xl"
                          onClick={(e) => handleDelete(item.id, e)}
                          label="DELETE"
                        /> */}
                        <button className="p-3  rounded-3xl" onClick={(e) => handleDelete(item.id, e)} > <FontAwesomeIcon icon={faTrash} className='p-2 text-xl text-red-500' /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Button
            className="btn btn-primary bg-blue-500 text-white p-4 ml-[50%] mt-5 m-2 rounded-xl"
            onClick={() => setCreateModalOpen(true)}
            label="Add New"
          /> */}
          <button className='bg-blue-500 text-white p-4 ml-[50%] mt-5 m-2 rounded-xl' onClick={() => setCreateModalOpen(true)}  ><FontAwesomeIcon icon={faPlus} className='m-1 mb-0'/>Add New</button>
          </div>
 
          {isCreateModalOpen && <Createe onClose={handleCreateModalClose} />}
          {isEditModalOpen && (
            <EditModel
              data={editData}
              onUpdate={(updatedData) => handleUpdate(updatedData)}
              onClose={() => {
                setEditModalOpen(false);
                setEditData(null);
              }}
              isOpen={isEditModalOpen}
            />
          )}
        </div>
  //     </div>
  //   </div>
  );
};

export default Read;
