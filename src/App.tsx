import './assets/CSS/App.css';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function App() {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  function insertName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = (formData.get('query') || '').toString().trim().toLowerCase();

    if (query === 'aaron batungbakal' || query === 'aaron'|| query === 'batungbakal') {
      alert('Ah, a man of culture');
    } else {
      alert('WRONG, you are supposed to be Aaaron Batungbakal from Hit Series Aswang');
    }

    navigate('/Game'); 
  }

  return (
    <div className='parent'>
      <div className='start'>
        <div className='body'>
          <h1>ASWANG!</h1>
          <hr />
          <h2>Aswang Hunter: Text Adventure RPG</h2>

          <form onSubmit={insertName}>
            <Form.Control
              size='lg'
              type='text'
              name='query'
              placeholder='Enter Your Name'
              className='my-form-control'
              ref={inputRef}
            />
            <button type='submit'>Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
