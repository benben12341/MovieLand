import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

const StyledScrollbar = ({ children }) => {
  const scrollbarStyles = {
    width: '8px',
    borderRadius: '8px',
    backgroundColor: '#f5f5f5'
  };

  const thumbStyles = {
    backgroundColor: '#2196f3',
    borderRadius: '8px'
  };

  return (
    <Scrollbars
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      style={scrollbarStyles}
      renderThumbVertical={({ style, ...props }) => (
        <div style={{ ...style, ...thumbStyles }} {...props} />
      )}>
      {children}
    </Scrollbars>
  );
};

export default StyledScrollbar;
