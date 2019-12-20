import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const colorsURL = 'http://localhost:5000/api/colors';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  

  useEffect(() => {
    axiosWithAuth()
      .get(colorsURL)
      .then(res => {
        setColorList(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
