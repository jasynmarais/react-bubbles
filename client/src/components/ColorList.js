import React, { useState } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth';

const initialColor = {
  color: '',
  code: { hex: '' }
};

const colorsURL = 'http://localhost:5000/api/colors';

const ColorList = ({ colors, updateColors, onLogout }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`${colorsURL}/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        updateColors(
          colors.map(color => (color.id === res.data.id ? res.data : color))
        );
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = (e, color) => {
    e.stopPropagation();
    axiosWithAuth()
      .delete(`${colorsURL}/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data));
      })
      .catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();

    if (colorToAdd.color && colorToAdd.code.hex) {
      axiosWithAuth()
        .post(colorsURL, colorToAdd)
        .then(res => {
          updateColors(res.data);
          setColorToAdd(initialColor);
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className='delete' onClick={e => deleteColor(e, color)}>
                x
              </span>{' '}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing ? (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      ) : (
        <form onSubmit={addColor}>
          <legend>Add Color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className='button-row'>
            <button type='submit'>save</button>
          </div>
        </form>
      )}
      <button className='button logout' onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default ColorList;