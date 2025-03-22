
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the new Dashboard page
    navigate('/', { replace: true });
  }, [navigate]);

  // This component will never render as it immediately redirects
  return null;
};

export default Index;
