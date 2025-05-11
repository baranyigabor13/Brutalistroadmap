import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { signUp } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setIsButtonDisabled(false);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
    } catch (err: any) {
      if (err?.message?.includes('rate_limit')) {
        const seconds = parseInt(err.message.match(/\d+/)?.[0] || '60');
        setCountdown(seconds);
        setIsButtonDisabled(true);
        setError(`Biztonsági okokból kérjük várjon ${seconds} másodpercet a következő próbálkozás előtt.`);
      } else {
        setError('Regisztrációs hiba történt');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0)]">
        <h2 className="text-2xl font-bold mb-4">Regisztráció</h2>
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
            {countdown > 0 && (
              <div className="mt-2 font-bold">
                Következő próbálkozás: {countdown} másodperc múlva
              </div>
            )}
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
            disabled={isButtonDisabled}
            className={`w-full border-4 border-black px-6 py-2 font-bold 
                     transition-all duration-200
                     ${isButtonDisabled 
                       ? 'bg-gray-300 cursor-not-allowed' 
                       : 'bg-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0)] hover:translate-y-1 hover:translate-x-1 hover:shadow-none'
                     }`}
          >
            {isButtonDisabled ? `Várjon (${countdown}s)` : 'Regisztráció'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;