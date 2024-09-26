import { useState } from 'react';

const Alogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: any) => {
      event.preventDefault(); 
      fetch('http://localhost:3005/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            window.location.href = data.redirect;
          } else {
            window.location.href = data.redirect;
          }
        })
        .catch((error) => console.error(error));
    };
    console.log('enter')

  return (
    <div className="border border-black p-44 text-center">
      <span className="text-xl font-bold">Admin Login</span>
      <form className="grid" onSubmit={handleSubmit}>
        <input
          className="w-44 mx-auto border border-black rounded-xl mt-5"
          type="text"
          name="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Enter username"
        />
        <br />
        <input
          className="w-44 mx-auto border border-black rounded-xl mt-5"
          type="password"
          name="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter password"
        />
        <br />
        <input
          className="bg-red-700 w-44 mx-auto rounded-lg border border-black text-white"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default Alogin;