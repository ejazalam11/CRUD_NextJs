// components/Createe.tsx

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Multiple from '../Multiple/page';

interface CreateModalProps {
  onClose: () => void;
}

const Createe: React.FC<CreateModalProps> = ({ onClose }) => {
  const [job, setJob] = useState('');
  const [skill, setSkill] = useState('');
  const [criteria, setCriteria] = useState('');
  const [formCount, setFormCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const saveData = async () => {
      try {
        await axios.post('https://6537c4e9a543859d1bb0cc81.mockapi.io/crud', {
          e_job: job,
          e_skill: skill,
          e_criteria: criteria,
        });
        alert('Auto-saved!');
      } catch (error) {
        console.error('Auto-save failed:', error);
      }
    };

    const timeoutId = setTimeout(() => {
      saveData();
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [job, skill, criteria]);

  // const handleAddForm = () => {
  //   setFormCount((prevCount) => prevCount + 1);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose(); // Call onClose callback when the modal is closed
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed top-20 left-40 w-[44%] h-[70%] rounded-2xl ml-[20%] bg-gray-800 bg-opacity-20 backdrop-blur-2xl">
          <div key={0} className="border-gray-400 border-1 p-5 w-[55%] mt-0 ml-[25%] rounded-2xl ">
            <div className="font-bold p-3 text-white rounded-lg w-56 text-center text-3xl ml-[7%]">
              <h1>Create Data</h1>
            </div>
            <div className="text-center ">
              <div className="form-group m-2 p-2">
                <input
                  type="text"
                  placeholder="Job Title"
                  className="from-control p-3 border-gray-200 border-2 inline-block rounded-3xl mt-2 bg-gray-100"
                  onChange={(e) => setJob(e.target.value)}
                />
              </div>
              <div className="form-group m-2 p-1">
                <input
                  type="text"
                  placeholder="Skill"
                  className="from-control p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100"
                  onChange={(e) => setSkill(e.target.value)}
                />
              </div>
              <div className="form-group m-2 p-1">
                <input
                  type="text"
                  placeholder="Criteria"
                  className="from-control p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100"
                  onChange={(e) => setCriteria(e.target.value)}
                />
              </div>
              <br />
              <div className="">
                <button
                  className="p-4 w-20 bg-gray-500  text-white rounded-3xl"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                {/* <button
                  className="p-4 w-30  bg-gray-500  text-white rounded-3xl ml-5"
                  onClick={handleAddForm}
                >
                  Add New Form
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Createe;
