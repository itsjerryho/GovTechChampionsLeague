import React from "react";
import Spinner from 'react-bootstrap/Spinner';
import '../styles/LoadingComponent.css';

export default function LoadingComponent() {
  return (
    <div className="spinnerContainer">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}