// components/Read.tsx
"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './Button/page';
import EditModel from './EditModel/page';
import Createe from './Createe/page';

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
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [editData, setEditData] = useState<IData | null>(null);
  const [deleteButtonClick, setDeleteButtonClick] = useState(false);

  function getData() {
    axios.get('https://6537c4e9a543859d1bb0cc81.mockapi.io/crud').then((response) => {
      setApi(response.data);
    });
  }

  function handleDelete(id: number) {
    setDeleteButtonClick(true);
    axios.delete(`https://6537c4e9a543859d1bb0cc81.mockapi.io/crud/${id}`).then(() => {
      getData();
      setDeleteButtonClick(false);
    });
    // Open EditModel for the given id
    openEditModal(id);
  }

  const openEditModal = async (id: number) => {
    if (!deleteButtonClick) {
      try {
        const response = await axios.get(`https://6537c4e9a543859d1bb0cc81.mockapi.io/crud/${id}`);
        const data = response.data;

        setSelectedItemId(id);
        setEditModalOpen(true);
        setEditData(data);
      } catch (error) {
        console.error('Error fetching data for EditModel:', error);
      }
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
    // Fetch the latest data from the API and update the state
    const response = await axios.get('https://6537c4e9a543859d1bb0cc81.mockapi.io/crud');
    setApi(response.data);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="table-container">
          <table className="w-full bg-black text-white">
              <thead>
                <tr>
                  <th className="p-3 text-2xl">ID</th>
                  <th className="p-3 text-2xl">Job Title</th>
                  <th className="p-3 text-2xl">Skill</th>
                  <th className="p-3 text-2xl">Criteria</th>
                  <th className="p-3 text-2xl">DELETE</th>
                </tr>
              </thead>
              <tbody>
                {api.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => openEditModal(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="border-1 border-gray-400 border text-center">{item.id}</td>
                    <td className="border-1 border border-gray-400 text-center">{item.e_job}</td>
                    <td className="border-1 border border-gray-400 text-center">{item.e_skill}</td>
                    <td className="border-1 border border-gray-400 text-center">{item.e_criteria}</td>
                    <td>
                      <div className="text-center">
                        <Button
                          className="btn btn-danger p-4 bg-red-600 text-white rounded-3xl"
                          onClick={() => handleDelete(item.id)}
                          label="DELETE"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button
            className="btn btn-primary bg-blue-500 text-white p-4 ml-[40%] mt-5 m-2 rounded-xl"
            onClick={() => setCreateModalOpen(true)}
            label="Create New Data"
          />
          {isCreateModalOpen && <Createe onClose={handleCreateModalClose} />}
          {isEditModalOpen && (
            <EditModel
              data={editData}
              onUpdate={(updatedData) => handleUpdate(updatedData)}
              onClose={() => {
                setEditModalOpen(false);
                setEditData(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Read;
