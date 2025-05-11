import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Kijelentkezési hiba:', error);
    }
  };

  return (
    <header className="py-6 mb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Lightbulb className="text-yellow-400 mr-2" size={32} />
            <h1 className="text-3xl md:text-4xl font-bold">Learning Roadmap Generator</h1>
          </Link>
          
          <div className="flex gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white border-4 border-black px-4 py-2 font-bold 
                           shadow-[4px_4px_0px_0px_rgba(0,0,0)]
                           hover:translate-y-1 hover:translate-x-1 hover:shadow-none
                           transition-all duration-200"
                >
                  Kijelentkezés
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/signin"
                  className="bg-yellow-400 border-4 border-black px-4 py-2 font-bold 
                           shadow-[4px_4px_0px_0px_rgba(0,0,0)]
                           hover:translate-y-1 hover:translate-x-1 hover:shadow-none
                           transition-all duration-200"
                >
                  Bejelentkezés
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-400 border-4 border-black px-4 py-2 font-bold 
                           shadow-[4px_4px_0px_0px_rgba(0,0,0)]
                           hover:translate-y-1 hover:translate-x-1 hover:shadow-none
                           transition-all duration-200"
                >
                  Regisztráció
                </Link>
              </>
            )}
          </div>
        </div>
        <p className="text-center mt-4 max-w-2xl mx-auto">
          Adj meg egy témát, amit szeretnél megtanulni, és mi generálunk egy 10 modulból álló útitervet a tanulásodhoz.
        </p>
      </div>
    </header>
  );
};

export default Header;