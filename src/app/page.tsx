"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "./Button/page";

interface IData {
  id: number;
  e_job: string ;
  e_skill: number;
  e_criteria: string;
}

const Read = () => {
  const [api, setApi] = useState<IData[]>([]);

  function getData() {
    axios
      .get("https://6537c4e9a543859d1bb0cc81.mockapi.io/crud")
      .then((response) => {
        setApi(response.data);
      });
  }

  function handleDelete(id: number) {
    axios
      .delete(`https://6537c4e9a543859d1bb0cc81.mockapi.io/crud/${id}`)
      .then(() => {
        getData();
      });
  }

  function setDataToStorage(id: number, job: string | number, skill: number | string, criteria: string | number) {
    localStorage.setItem("id", id.toString());
    localStorage.setItem("job", job.toString());
    localStorage.setItem("skill", skill.toString());
    localStorage.setItem("criteria", criteria.toString());
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <div className="mb-2 mt-2">
          
          </div>
          <table className=" w-full bg-black text-white">
            <thead>
              <tr>
                <th className="p-3 text-2xl">ID</th>
                <th className="p-3 text-2xl" >Job Title</th>
                <th className=" p-3 text-2xl">Skill</th>
                <th className="p-3 text-2xl">Criteria</th>
                <th className= "p-3 text-2xl">EDIT</th>
                <th className=" p-3 text-2xl">DELETE</th>
                {/* <th>View</th> */}
              </tr>
            </thead>
            <tbody className="">
              {api.map((item) => (
                <tr key={item.id}>
                  <td className="border-1 border-gray-400 border text-center ">{item.id}</td>
                  <td className="border-1 border border-gray-400 text-center ">{item.e_job}</td>
                  <td className="border-1 border border-gray-400 text-center ">{item.e_skill}</td>
                  <td className="border-1 border border-gray-400 text-center ">{item.e_criteria}</td>
                  <td>
                    <Link href="/Edit">
                      
                        <Button
                          className="btn btn-primary bg-blue-400 text-black p-4   rounded-3xl w-32"
                          onClick={() => {
                            setDataToStorage(item.id, item.e_job, item.e_skill, item.e_criteria);
                          }}
                          label="Edit"
                        />
                          </Link>

                    
                  </td>
                  <td>
                    <Button
                      className="btn btn-danger p-3 bg-red-600 text-white rounded-3xl"
                      onClick={() => {
                        if (window.confirm("Are you Sure to delete data??")) {
                          handleDelete(item.id);
                        }
                      }}
                      label="DELETE"
                    />
                
                  </td>
          
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/Create">
              
              <Button className="btn btn-primary bg-blue-500 text-white p-4 ml-[40%] mt-5 m-2 rounded-xl" label="Create New Data" />
           

          </Link>
        </div>
      </div> 
    </div>
  );
};

export default Read;

