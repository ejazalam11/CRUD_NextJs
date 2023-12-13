
"use client"
// components/Create.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Create = () => {
  const [job, setJob] = useState('');
  const [skill, setSkill] = useState('');
  const [criteria, setCriteria] = useState('');
  const [formCount, setFormCount] = useState(1);

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

  const handleAddForm = () => {
    setFormCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      {[...Array(formCount)].map((_, index) => (
        <div key={index} className=" border-gray-400 border-1 p-5 w-[35%] mt-10 ml-[30%] rounded-2xl shadow-[0_35px_60px_-15px_rgba(1,1,1,1.3)]">
          <div className=" font-bold p-3  text-black rounded-lg w-56 text-center text-3xl ml-[27%]">
              <h1>Create Data</h1>
            </div>
          <div className="text-center   " >
            
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
              <Link href="/Read">
                <button className="p-4 w-40 bg-slate-950 text-center text-white rounded-3xl">Close</button>
              </Link>
              <button className="p-4 w-40 bg-slate-950 text-center text-white rounded-3xl ml-5" onClick={handleAddForm}>
                Add New Form
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Create;
