import React, { useEffect, useState } from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Home from "./components/Home";

import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    getTeams();
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

  const deleteTeamById = (id) => {
    const filteredTeams = teams.filter((team) => team._id != id);
    setTeams(filteredTeams);
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
          />} />
        {/* <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> */}
      </Routes>
    </div>
  );
};

export default App;