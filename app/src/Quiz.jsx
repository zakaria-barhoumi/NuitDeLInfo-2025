import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Quiz() {
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (choice) => {
    setAnswered(true);
    if (choice === 'Linux') {
      toast.success('Correct! Open source is better for sustainability and long-term durability.');
    } else {
      toast.error('Incorrect. Open source software is generally more durable and sustainable than proprietary, company-based software.');
    }
  };

  const getButtonStyle = (buttonType) => {
    if (!answered) {
      return {}; // Default style before answering
    }
    return {
      backgroundColor: buttonType === 'Linux' ? 'green' : 'red',
      color: 'white',
    };
  };

  return (
    <div>
      <h2>Quiz Time!</h2>
      <p>Do you prefer Linux or Windows?</p>
      <button style={getButtonStyle('Linux')} onClick={() => handleAnswer('Linux')}>
        Linux
      </button>
      <button style={getButtonStyle('Windows')} onClick={() => handleAnswer('Windows')}>
        Windows
      </button>
      <ToastContainer />
    </div>
  );
}

export default Quiz;