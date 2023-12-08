"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { link } from "fs";
// import Button from "./Button";
// import Input from "./Input";

const Edit = () => {
  const [id, setid] = useState<string | null>(null);
  const [job, setjob] = useState< string>("");
  const [skill, setskill] = useState<number | string>("");
  const [criteria, setcriteria] = useState("");
  // const router = useRouter();

  useEffect(() => {
    setid(localStorage.getItem("id"));
    setjob(localStorage.getItem("job") || ""); 
    setskill(localStorage.getItem("skill") || "");
    setcriteria(localStorage.getItem("criteria") || "");
  }, []);
  

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`https://6537c4e9a543859d1bb0cc81.mockapi.io/crud/${id}`, {
        e_job: job,
        e_skill: skill,
        e_criteria: criteria,
      })
      .then(() => {
        // router.push("/Read");
        <link href="/Read">
        update
        </link>  
        
      });
  };

  return (
    <>
      <div className="row text-center">
        <div className="col-md-4 border-gray-400  border-1 p-5 w-[35%] mt-10 ml-[30%] rounded-2xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
          <div className="mb-2 mt-2 ">
          
          </div>
          <div className="font-bold p-3 mt-10 text-black rounded-lg w-56 text-center text-3xl ml-[27%] mb-8">
            <h1>Update Data</h1>
          </div>
          <form onSubmit={handleUpdate}>
            <div className="form-group m-2">
              {/* <Input
                type="text"
                placeholder="name"
                className="form-control"
                value={name}
                onChange={(e) => setname(e.target.value)}
              /> */}
              <input type="text"
              placeholder="Job"
              className="from-control  p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100"
              value={job}
              onChange={(e) => setjob(e.target.value)}
              />
            </div>
            <div className="form-group m-2">
              {/* <Input
                type="number"
                placeholder="age"
                className="form-control"
                value={age}
                onChange={(e) => setage(e.target.value)}
              /> */}

<input type="text"
              placeholder="skill"
              className="from-control  p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100"
              value={skill}
              onChange={(e) => setskill(e.target.value)}
              />

            </div>
            <div className="form-group m-2">
              {/* <Input
                type="email"
                placeholder="email"
                className="form-control"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              /> */}
     <input type="text"
              placeholder="Criteria"
              className="from-control  p-3 border-gray-200 border-2 inline-block rounded-3xl bg-gray-100 "
              value={criteria}
              onChange={(e) => setcriteria(e.target.value)}
              />

            </div>
            <br />
            <input type="submit" value="Update" className="btn btn-primary p-3 cursor-pointer  bg-green-500 text-white  rounded-3xl w-40" />
            <Link href="/Read">
              {/* <a> */}
                {/* <Button className="btn btn-primary " label="Read Data" /> */}
                <button className="bg-black text-white p-3 ml-10 rounded-3xl ">Back</button>
              {/* </a> */}
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
