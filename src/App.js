import React from 'react'
import Dashboard from './components/dashboard_folder/Dashboard'

function App() {
  return (
    // if not logged in , show log in page, else show dashboard page
    <Dashboard />
  );
}

export default App;
