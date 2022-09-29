import React, { useState } from "react";
import InputDataComponent from "./InputDataComponent";
import DisplayDataComponent from "./DisplayDataComponent";

export default function TeamsComponent({ teams, handleTeamDelete, deleteAllTeams, getTeams }) {
  async function handleSubmit(e, input) {
    e.preventDefault();

    const text = input.trim();
    // Given date format: DD/MM
    const teamsInfo = text.split('\n');
    
    let fetchRequests = []
    
    for (const team of teamsInfo) {
      const detailsArr = team.split(' ');
      const [teamName, teamRegDate, teamGroupNum] = detailsArr;

      const [date, month] = teamRegDate.split('/');
      const formattedDate = '2022-' + month + '-' + date;
      const newTeam = {
        name: teamName,
        registrationDate: formattedDate,
        groupNum: teamGroupNum,
      }
      
      const req = fetch("http://localhost:5000/team/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      });
      fetchRequests.push(req);
    }

    await Promise.all(fetchRequests).catch(error => {
      window.alert(error);
      return false;
    });

    // update Frontend
    getTeams();

    return true;
  }
  
  async function handleDelete(teamId) {
    // Update Database
    await fetch(`http://localhost:5000/team/${teamId}`, {
      method: "DELETE"
    }).catch(error => {
      window.alert('Failed to delete the teamRecord');
      return;
    });

    handleTeamDelete(teamId);

    return;
  }

  async function handleDeleteAll() {
    // Update Database
    await fetch(`http://localhost:5000/team/`, {
      method: "DELETE"
    }).catch(error => {
      window.alert('Failed to delete all teamRecords');
      return;
    });

    deleteAllTeams();

    return;
  }  

  const getTableHeaders = () => {
    let headers;
    if (teams.length > 0) {
      const teamObj = teams[0];
      headers = Object.keys(teamObj).filter(item => item != '_id');
    }
    return headers
  }

  return (
    <>
        <InputDataComponent keyword="Team" handleSubmit={handleSubmit}/>
        <DisplayDataComponent data={teams} handleDelete={handleDelete} handleDeleteAll={handleDeleteAll} getTableHeaders={getTableHeaders}/>
    </>
  );
}