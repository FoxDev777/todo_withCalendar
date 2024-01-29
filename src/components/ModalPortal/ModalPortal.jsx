import React, { useContext } from 'react';
import { createPortal } from 'react-dom';

import './ModalPortal.css';
import Buttons from '../Buttons/Buttons';
import ProjectContext from '../Context/Context';

export default function ModalPortal({ children }) {
  const portalRoot = document.getElementById('portal-root');
  const valueContext = useContext(ProjectContext);

  const deleteHandleTask = e => {
    fetch(`http://localhost:3001/tasks/${e.target.id}`, { method: 'DELETE' });
    valueContext.setRefresh(prev => !prev);
  };

  const setIdItem = e => {
    valueContext.setCurrentId(e.target.id);
  };

  return createPortal(
    <div className='portalWrapper' id='portalWrapper'>
      <div className='todoAddWrapper'>
        <button
          type='button'
          onClick={() => {
            valueContext.setShowPopUp(prev => !prev);
            valueContext.setCurrentId(null);
          }}
        >
          Добавити справу
        </button>
      </div>
      <h1>Список справ станом на {valueContext.currentDate}</h1>
      {valueContext.taskObject.map((elem, id) => {
        return valueContext.currentDate === elem.currentDayId ? (
          <div key={elem.id} className='currentTaskWrapper'>
            <p id={elem.id} className={elem.done}>
              {elem.currentTask}
            </p>
            <button
              type='button'
              id={elem.id}
              onClick={e => {
                setIdItem(e);
                valueContext.setShowPopUp(prev => !prev);
              }}
            >
              Редагувати ♻
            </button>
            <button
              type='button'
              id={elem.id}
              onClick={e => deleteHandleTask(e)}
            >
              Видалити 💥
            </button>
          </div>
        ) : null;
      })}
      <Buttons setPortalShow={valueContext.setPortalShow} />
      {valueContext.showPopUp && children}
    </div>,
    portalRoot
  );
}
