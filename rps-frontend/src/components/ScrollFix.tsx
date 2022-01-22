import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

export default function ScrollFix() {
  const location = useLocation();
  const type = useNavigationType();
  
  useEffect(() => {
    if (type.valueOf() !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [location, type]);
  
  return null;
}
