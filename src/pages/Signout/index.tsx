import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import SuspenseLoader from 'src/components/SuspenseLoader';
import { express_path } from 'src/config';

function index() {
  const navaigate = useNavigate();

  useEffect(() => {
    fetch(`${express_path}/sign_out`, {
      method: 'POST',
      credentials: 'include'
    }).finally(() => navaigate('/'));
  }, []);

  return <SuspenseLoader />;
}

export default index;
