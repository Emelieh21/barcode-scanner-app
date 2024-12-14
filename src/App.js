import React from "react";
import BarcodeScanner from "./BarcodeScanner"; 
import './assets/css/minty-bootstrap.css';
import { useAuth0 } from '@auth0/auth0-react';

const App = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fs-1" href="/">ShelfAware</a>
          <div className="d-flex">
            {!isAuthenticated ? (
              <button className="btn btn-primary" onClick={loginWithRedirect}>Login</button>
            ) : (
              <>
                <span className="navbar-text me-3">Welcome, {user.name}</span>
                <button
                  className="btn btn-danger"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
      <main className="container mt-4">
        {isAuthenticated ? (
          <BarcodeScanner />
        ) : (
          <h2>Please login to start keeping track of your products</h2>
        )}
      </main>
    </>
  );
};

export default App;