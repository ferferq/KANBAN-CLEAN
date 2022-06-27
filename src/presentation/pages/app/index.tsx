import React from 'react';
import { GlobalStyle } from '@/presentation/styles/global';
import { makeHome as MakeHome } from '@/main/factories/pages';
import { Toaster } from 'react-hot-toast';

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <MakeHome />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};
