import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-6 border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-4">
        <p className="text-center">
          © {new Date().getFullYear()} Learning Roadmap Generator • 
          Powered by n8n and Google Gemini AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;