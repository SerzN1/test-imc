import React from 'react';
import './Typography.css';

interface TypographyProps {
  children: React.ReactNode;
}

export const H2: React.FC<TypographyProps> = ({ children }) => (
  <h2 className="h2">{children}</h2>
);
