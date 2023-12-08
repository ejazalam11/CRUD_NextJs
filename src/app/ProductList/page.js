"use client"
import React, { useEffect, useState }  from 'react'


export default function page() {

const [Product , setProduct] = useState( [] )
    useEffect( async ()=>{
        let data = await fetch("https://jsonplaceholder.typicode.com/posts");
        data= await data.json();
        console.log(data);
       data=setProduct


    },[])
  return (
    <div>
      <h4>product list</h4>
      {
        Product.map((items) => (
            <h3>{itmes.id}</h3>

        ))
      }
    </div>
  )
}
