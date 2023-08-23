import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [previousPasswords, setPreviousPasswords] = useState([]);

  useEffect(() => {
    const storedPasswords = JSON.parse(localStorage.getItem('previousPasswords')) || [];
    setPreviousPasswords(storedPasswords);
  }, []);

  const generatePassword = () => {
    const length = 12; // You can adjust the length of the password
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    setGeneratedPassword(password);
    addToPreviousPasswords(password);
  };

  const addToPreviousPasswords = (password) => {
    const updatedPasswords = [...previousPasswords];

    if (updatedPasswords.length >= 5) {
      updatedPasswords.shift();
    }

    updatedPasswords.push(password);
    setPreviousPasswords(updatedPasswords);
    localStorage.setItem('previousPasswords', JSON.stringify(updatedPasswords));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert("Password copied to clipboard!");
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div className="password-container">
        <input type="text" value={generatedPassword} readOnly />
        <button onClick={generatePassword}>Generate Password</button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
      </div>
      <div className="previous-passwords">
        <h2>Last 5 Passwords</h2>
        <ul>
          {previousPasswords.map((password, index) => (
            <li key={index}>{password}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
