import React from 'react';

export default ({ color, size = 20 }) => (
  <div
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderColor: color,
      borderRadius: size / 2,
      margin: 8,
      display: 'inline-block',
      verticalAlign: 'middle',
    }}
  />
);
