import React, { useState } from 'react';

function ResumeInterviewApp() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setQuestions([]);
    setFeedback('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a resume file.');
      return;
    }

    setLoading(true);
    setError('');
    setQuestions([]);
    setFeedback('');

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await fetch('https://your-backend-api.com/process-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process resume.');
      }

      const data = await response.json();
      setQuestions(data.questions || []);
      setFeedback(data.feedback || 'No feedback received.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Resume Mock Interview App</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        <button type="submit" disabled={loading} style={{ marginLeft: 10 }}>
          {loading ? 'Processing...' : 'Upload & Analyze'}
        </button>
      </form>
      {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      {questions.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <h3>Mock Interview Questions</h3>
          <ul>
            {questions.map((q, i) => <li key={i}>{q}</li>)}
          </ul>
        </div>
      )}
      {feedback && (
        <div style={{ marginTop: 20 }}>
          <h3>Resume Feedback</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
}

export default ResumeInterviewApp;
