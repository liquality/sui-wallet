import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/screens/App';

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Popup root element");
  const root = createRoot(rootContainer);
  root.render(<App />);
}

init();
