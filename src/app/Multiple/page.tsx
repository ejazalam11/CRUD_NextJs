"use client"
// pages/CreateMultipleForms.tsx
import React, { useState } from 'react';
import Create from '../Create/page';

const Multiple = () => {
  const [formCount, setFormCount] = useState(1);

  const handleAddForm = () => {
    setFormCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h1>Create Multiple Forms</h1>
      {[...Array(formCount)].map((_, index) => (
        <Create key={index} />
      ))}
      <button onClick={handleAddForm}>Add New Form</button>
    </div>
  );
};

export default Multiple;
