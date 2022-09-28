import React, { useState } from "react";
import AddTeamsComponent from "./AddTeamsComponent";
import DisplayTeamsComponent from "./DisplayTeamsComponent";

export default function TeamsComponent({ teams, handleTeamDelete, getTeams }) {
  
  return (
    <>
        <AddTeamsComponent getTeams={getTeams}/>
        <DisplayTeamsComponent teams={teams} handleTeamDelete={handleTeamDelete}/>
    </>
  );
}