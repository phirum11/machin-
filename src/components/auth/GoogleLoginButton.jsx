import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginButton = ({ onSuccess, onError, disabled = false }) => {
  return (
    <div
      className={`w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        size="large"
        width="100%"
        theme="outline"
        shape="pill"
        text="continue_with"
        logo_alignment="left"
      />
    </div>
  );
};

export default GoogleLoginButton;
