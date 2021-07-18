import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => (
  <footer className="footer">
    <div className="container">Copyright {new Date().getFullYear()} by sn1</div>
  </footer>
);
