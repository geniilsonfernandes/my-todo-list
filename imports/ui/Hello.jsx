import { Button } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Hello = () => {
  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={increment}>Click Me</Button>
      <p>You've pressed the button {counter} times.</p>
      <Link to="/info">Go to Info Page</Link>
    </div>
  );
};
