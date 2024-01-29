import './Buttons.css';

export default function Buttons({ setPortalShow }) {
  return (
    <div className='btnCloseWrapper'>
      <button type='button' onClick={() => setPortalShow(prev => !prev)}>
        ❌
      </button>
    </div>
  );
}
