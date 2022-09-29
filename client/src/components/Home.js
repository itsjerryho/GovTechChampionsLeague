import React, { useEffect, useState } from "react";
import RankingsComponent from "./RankingsComponent";
import TeamsComponent from './TeamsComponent';

export default function Home({ teams, results, handleTeamDelete, deleteAllTeams, getTeams }) {


  if (teams.length <= 12) {
    return <TeamsComponent teams={teams} handleTeamDelete={handleTeamDelete} deleteAllTeams = {deleteAllTeams} getTeams={getTeams}/>;
  }
  return <RankingsComponent teams={teams} results={results}/>;
}