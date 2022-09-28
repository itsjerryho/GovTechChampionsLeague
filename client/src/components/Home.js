import React, { useEffect, useState } from "react";
import AddTeamsComponent from './AddTeamsComponent';
// import { Link } from "react-router-dom";
 
export default function Home() {
 const [teams, setTeams] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getTeams() {
     const response = await fetch(`http://localhost:5000/team/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const teams = await response.json();
     setTeams(teams);
   }
 
   getTeams();
 
   return;
 }, []);
 
 
if (teams.length < 6) {
    return <AddTeamsComponent />;
}
// return <RankingsPage />;