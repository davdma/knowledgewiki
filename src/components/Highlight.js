import React from 'react';

export function Highlight({children, color}) {
  return (
    <span
      style={{
        backgroundColor: color,
        borderRadius: '2px',
        color: '#fff',
        padding: '0.2rem',
      }}>
      {children}
    </span>
  );
}

// BlueHighlight preset
export function BlueHighlight({ children }) {
  return <Highlight color="#0076df">{children}</Highlight>;
}

// GreenHighlight preset
export function GreenHighlight({ children }) {
  return <Highlight color="#25c2a0">{children}</Highlight>;
}
