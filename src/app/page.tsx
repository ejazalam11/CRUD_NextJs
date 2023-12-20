"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button/page';
import EditModel from './EditModel/page';
import Createe from './Createe/page';
import Aside from './Aside/page';

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
      <Aside/>
    
          <div className="table-container">
            <table className="w-[80%] ml-[20%] text-white">
              <thead>
                <tr>
                  <th className="p-3 text-2xl bg-blue-100 border text-black px-8 py-4">ID</th>
                  <th className="p-3 text-2xl bg-blue-100 border text-black px-8 py-4">Job Title</th>
                  <th className="p-3 text-2xl bg-blue-100 border text-black px-8 py-4">Skill</th>
                  <th className="p-3 text-2xl bg-blue-100 border text-black px-8 py-4">Criteria</th>
                </tr>
              </thead>
              <tbody>
                {api.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => openEditModal(item.id)}
                    style={{ cursor: 'pointer' }}
                    className='hover:bg-cyan-100'
                  >
                    <td className="border-1 border text-center text-black">{item.id}</td>
                    <td className="border-1 border text-center text-black">{item.e_job}</td>
                    <td className="border-1 border text-center text-black">{item.e_skill}</td>
                    <td className="border-1 border text-center text-black">{item.e_criteria}</td>
                    <td>
                      <div className="text-center">
                        <Button
                          className="p-4 bg-blue-600 text-white rounded-3xl"
                          onClick={(e) => handleDelete(item.id, e)}
                          label="DELETE"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
            className="btn btn-primary bg-blue-500 text-white p-4 ml-[40%] mt-5 m-2 rounded-xl"
            onClick={() => setCreateModalOpen(true)}
            label="Create New Data"
          />
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
