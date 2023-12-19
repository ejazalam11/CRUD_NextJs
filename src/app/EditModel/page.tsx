// EditModel.tsx
"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

interface IData {
  id: number;
  e_job: string;
  e_skill: number;
  e_criteria: string;
}

interface EditModelProps {
  data: IData | null;
  onUpdate: (updatedData: IData) => void;
  onClose: () => void;
}

const EditModel: React.FC<EditModelProps> = ({ data, onUpdate, onClose }) => {
  const [job, setJob] = useState<string | number>("");
  const [skill, setSkill] = useState<number | string>("");
  const [criteria, setCriteria] = useState("");

  useEffect(() => {
    if (data) {
      setJob(data.e_job);
      setSkill(data.e_skill);
      setCriteria(data.e_criteria);
    }
  }, [data]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
      try {
        const updatedData = {
          ...data,
          e_job: job,
          e_skill: skill,
          e_criteria: criteria,
        };
        await axios.put(`https://6537c4e9a543859d1bb0cc81.mockapi.io/crud/${data.id}`, updatedData);
        onUpdate(updatedData); // Pass the updated data to the parent component
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  return (
    <>
      <div className="row text-center fixed top-40 left-40 w-[40%] h-[70%] rounded-2xl ml-[20%] bg-gray-800 bg-opacity-20 backdrop-blur-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
        <div className="col-md-4 border-gray-400 border-1 p-5 w-[50%] mt-0 ml-[25%] rounded-2xl ">
          <div className="mb-2 mt-2"></div>
          <div className="font-bold p-3 mt-10 text-white rounded-lg w-56 text-center text-3xl ml-[1%] mb-8">
            <h1>Update Data</h1>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="form-group m-2">
              <input
                type="text"
                placeholder="Job"
                className="from-control  p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="text"
                placeholder="Skill"
                className="from-control  p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
              />
            </div>
            <div className="form-group m-2">
              <input
                type="text"
                placeholder="Criteria"
                className="from-control  p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100 "
                value={criteria}
                onChange={(e) => setCriteria(e.target.value)}
              />
            </div>

            <br />
            <input
              type="submit"
              value="Update"
              className="btn btn-primary p-3 cursor-pointer bg-green-500 text-white rounded-3xl w-20"
            />
            <button className="bg-black text-white p-3 ml-7 rounded-3xl" onClick={onClose}>
              Close
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditModel;
