import React, { useState } from "react";
import InputDataComponent from "./InputDataComponent";
import DisplayDataComponent from "./DisplayDataComponent";

export default function ResultsComponent({ results, teams, handleResultDelete, deleteAllResults, getResults }) {
  console.log(results);
  console.log(teams);

  async function handleSubmit(e, input) {
    e.preventDefault();

    const text = input.trim();
    // Given date format: DD/MM
    const matchResults = text.split('\n');
    
    let fetchRequests = []
    
    for (const match of matchResults) {
      const detailsArr = match.split(' ');
      const [firstTeam, secondTeam, firstTeamGoals, secondTeamGoals] = detailsArr;

      const newMatchResult = {
        firstTeam: firstTeam,
        secondTeam: secondTeam,
        firstTeamGoals: firstTeamGoals,
        secondTeamGoals: secondTeamGoals,
        group: teams.find(team => team.name == firstTeam || team.name == secondTeam)["groupNum"],

      }
      
      const req = fetch("http://localhost:5000/result/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMatchResult),
      });
      fetchRequests.push(req);
    }

    await Promise.all(fetchRequests).catch(error => {
      window.alert(error);
      return false;
    });

    // update Frontend
    getResults();

    return true;
  }
  
  async function handleDelete(resultId) {
    // Update Database
    await fetch(`http://localhost:5000/result/${resultId}`, {
      method: "DELETE"
    }).catch(error => {
      window.alert('Failed to delete the resultRecord');
      return;
    });

    handleResultDelete(resultId);

    return;
  }

  async function handleDeleteAll() {
    // Update Database
    await fetch(`http://localhost:5000/result/`, {
      method: "DELETE"
    }).catch(error => {
      window.alert('Failed to delete all resultRecords');
      return;
    });

    deleteAllResults();

    return;
  }  

  const getTableHeaders = () => {
    let headers;
    if (results.length > 0) {
      const resultObj = results[0];
      headers = Object.keys(resultObj).filter(item => item != '_id');
    }
    return headers
  }

  return (
    <>
        <InputDataComponent keyword={"Result"} handleSubmit={handleSubmit}/>
        <DisplayDataComponent data={results} handleDelete={handleDelete} handleDeleteAll={handleDeleteAll} getTableHeaders={getTableHeaders}/>
    </>
  );
}