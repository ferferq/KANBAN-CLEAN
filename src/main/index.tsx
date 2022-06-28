import React from 'react';
import ReactDom from 'react-dom/client';
import { App } from '@/presentation/pages/app';

const root = ReactDom.createRoot(document.getElementById('main'));
root.render(<App />);
