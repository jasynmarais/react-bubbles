import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

import Bubbles from './Bubbles';
import ColorList from './ColorList';

const colorsURL = 'http://localhost:5000/api/colors';

const BubblePage = props => {
  const [colorList, setColorList] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    props.history.push('/');
  };

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
      {/*isFetching ? (
        <p>Loading...</p>
      ) : ()*/}
      <>
        <ColorList
          colors={colorList}
          updateColors={setColorList}
          onLogout={onLogout}
        />
        <Bubbles colors={colorList} />
      </>
    </>
  );
};

export default BubblePage;