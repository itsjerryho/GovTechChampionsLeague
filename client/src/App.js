import React, { useEffect, useState } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Home from "./components/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import ResultsComponent from "./components/ResultsComponent";


const App = () => {
  const [teams, setTeams] = useState([]);
  const [results, setResults] = useState([]);


  useEffect(() => {
    getTeams();
    getResults();
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
    const filteredTeams = teams.filter((team) => team._id != id);
    setTeams(filteredTeams);
  }

  const deleteResultById = (id) => {
    const filteredResults = results.filter((res) => res._id != id);
    setResults(filteredResults);
  }

  const deleteAllResults = () => {
    setResults([]);
  }

  const deleteAllTeams = () => {
    setTeams([]);
  }

  return (
    <div>
      {/* <Navbar /> */}
      <Routes>
        <Route exact path="/" element={
          <Home
            teams={teams}
            handleTeamDelete={deleteTeamById}
            getTeams={getTeams}
            deleteAllTeams={deleteAllTeams}
          />} />
        {/* <Route path="/edit/:id" element={<Edit />} /> */}
        <Route path="/results" element={
          <ResultsComponent
            results={results} 
            teams={teams}
            getResults={getResults}
            handleResultDelete={deleteResultById}
            deleteAllResults={deleteAllResults}
            />} />
      </Routes>
    </div>
  );
};

export default App;