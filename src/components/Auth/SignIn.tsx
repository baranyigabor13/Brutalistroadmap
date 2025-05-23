import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setError('Bejelentkezési hiba történt');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0)]">
        <h2 className="text-2xl font-bold mb-4">Bejelentkezés</h2>
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Jelszó
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border-2 border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 border-4 border-black px-6 py-2 font-bold 
                     shadow-[4px_4px_0px_0px_rgba(0,0,0)]
                     hover:translate-y-1 hover:translate-x-1 hover:shadow-none
                     transition-all duration-200"
          >
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;