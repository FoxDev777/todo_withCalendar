import React, { useContext, useEffect, useRef, useState } from 'react';

import './PopUpInput.css';
import ProjectContext from '../Context/Context';

export default function PopUpInput() {
  const valueContext = useContext(ProjectContext);
  const [inputValue, setInputValue] = useState('');
  const ref = useRef();

  useEffect(() => {
    if (valueContext.currentId !== null) {
      setInputValue(
        valueContext.taskObject[valueContext.currentId - 1]?.currentTask
      );
    } else setInputValue('');
  }, [valueContext.currentId, valueContext.taskObject]);

  const inputTaskHandler = e => {
    setInputValue(prev => e.target.value);
  };

  const setNewTask = () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        id: `${valueContext.taskObject.length + 1}`,
        currentTask: inputValue,
        done: '',
        currentDayId: valueContext.currentDate,
      }),
    };
    fetch('http://localhost:3001/tasks/', options);
  };

  const setChangedTask = () => {
    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        currentTask: inputValue,
      }),
    };
    fetch(`http://localhost:3001/tasks/${valueContext.currentId}`, options);
  };

  return (
    <div className='popUpContainer'>
      <div className='popUpWrapper'>
        <input
          type='text'
          ref={ref}
          placeholder={'Занотуйте Вашу справу'}
          onChange={e => inputTaskHandler(e)}
          value={inputValue}
        />
        <div className='btnPopUpWrapper'>
          <button
            type='button'
            onClick={() => {
              valueContext.currentId === null ? setNewTask() : setChangedTask();
              valueContext.setRefresh(prev => !prev);
              valueContext.setShowPopUp(prev => !prev);
            }}
          >
            Підтвердити введення ✔
          </button>
          <button
            type='button'
            onClick={() => valueContext.setShowPopUp(prev => !prev)}
          >
            Відмінити введення ❌
          </button>
        </div>
      </div>
    </div>
  );
}
