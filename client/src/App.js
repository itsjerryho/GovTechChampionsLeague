import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import ResultsComponent from "./components/ResultsComponent";
import NavbarComponent from "./components/NavbarComponent";
import TeamsComponent from "./components/TeamsComponent";
import LoadingComponent from "./components/LoadingComponent";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [results, setResults] = useState([]);


  useEffect(() => {
    getTeams();
    getResults();
    setTimeout(() => setIsLoading(false), 500);
    return;
  }, []);

  const getTeams = async () => {
    const response = await fetch(`http://localhost:5000/team/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const teams = await response.json();
    setTeams(teams);
  }

  const getResults = async () => {
    const response = await fetch(`http://localhost:5000/result/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const results = await response.json();
    setResults(results);
  }

  const deleteTeamById = (id) => {
    const filteredTeams = teams.filter((team) => team._id !== id);
    setTeams(filteredTeams);
  }

  const deleteResultById = (id) => {
    const filteredResults = results.filter((res) => res._id !== id);
    setResults(filteredResults);
  }

  const deleteAllResults = () => {
    setResults([]);
  }

  const deleteAllTeams = () => {
    setTeams([]);
  }

  const renderContent = (
    <Routes>
      <Route exact path="/" element={
        <Home
          teams={teams}
          handleTeamDelete={deleteTeamById}
          getTeams={getTeams}
          deleteAllTeams={deleteAllTeams}
          results={results}
        />} />
      <Route path="/results" element={
        <ResultsComponent
          results={results}
          teams={teams}
          getResults={getResults}
          handleResultDelete={deleteResultById}
          deleteAllResults={deleteAllResults}
        />} />
      <Route path="/teams" element={
        <TeamsComponent
          teams={teams}
          handleTeamDelete={deleteTeamById}
          deleteAllTeams={deleteAllTeams}
          getTeams={getTeams} />
      } />
    </Routes>
  )

  return (
    <div>
      <NavbarComponent />
      {isLoading ?
        <LoadingComponent/> : renderContent
      }
    </div>
  );
};

export default App;