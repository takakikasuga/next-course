import { useRef, useState } from 'react';

function HomePage() {
  const emailInputref = useRef();
  const feedbackInputref = useRef();
  const [feedbackItems, setFeedbackItems] = useState([]);

  function submitFormHandler(event) {
    event.preventDefault();

    const enterdEmail = emailInputref.current.value;
    const enterdFeedback = feedbackInputref.current.value;

    const reqBody = { email: enterdEmail, text: enterdFeedback };

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log('data', data);
      });
  }

  function loadFeedbackHandler() {
    fetch('/api/feedback')
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItems(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputref} />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea id='feedback' rows='5' ref={feedbackInputref}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      {feedbackItems.map((feedbackItem) => {
        return <li key={feedbackItem.id}>{feedbackItem.text}</li>;
      })}
    </div>
  );
}

export default HomePage;
