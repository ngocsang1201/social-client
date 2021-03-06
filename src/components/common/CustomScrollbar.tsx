import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

export interface ICustomScrollbarProps {
  children?: React.ReactNode;
}

export function CustomScrollbar({ children }: ICustomScrollbarProps) {
  const location = useLocation();

  const ref = useRef<any>(null);

  useEffect(() => {
    ref.current.scrollTop = 0;
  }, [location.pathname]);

  return (
    <SimpleBar scrollableNodeProps={{ ref }} style={{ height: '100vh' }}>
      {children}
    </SimpleBar>
  );
}
