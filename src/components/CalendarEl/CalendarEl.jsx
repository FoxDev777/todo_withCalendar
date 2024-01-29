import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import ModalPortal from '../ModalPortal/ModalPortal';

import './CalendarEl.css';
import PopUpInput from '../PopUpInput/PopUpInput';
import ProjectContext from '../Context/Context';

export default function CalendarEl() {
  const [value, onChange] = useState(new Date());
  const [portalShow, setPortalShow] = useState(false);
  const [currentDate, setCurrentDate] = useState();
  const [showPopUp, setShowPopUp] = useState(false);
  const [taskObject, setTaskObject] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [currentId, setCurrentId] = useState();

  const valueContext = {
    currentDate,
    taskObject,
    showPopUp,
    setShowPopUp,
    setPortalShow,
    setRefresh,
    currentId,
    setCurrentId,
  };

  const handleDay = value => {
    setPortalShow(prev => !prev);
    setCurrentDate(
      value.toLocaleDateString('uk-Ua', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    );
  };

  const getData = async () => {
    const data = await fetch('http://localhost:3001/tasks/', { method: 'GET' });
    const result = await data.json();
    setTaskObject(prev => result);
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <ProjectContext.Provider value={valueContext}>
      <div className='container'>
        {portalShow && (
          <ModalPortal>
            <PopUpInput />
          </ModalPortal>
        )}
        <Calendar onClickDay={handleDay} onChange={onChange} value={value} />
      </div>
    </ProjectContext.Provider>
  );
}
