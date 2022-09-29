import React, { useEffect, useState } from "react";
import TeamsComponent from './TeamsComponent';

export default function Home({ teams, handleTeamDelete, deleteAllTeams, getTeams }) {


  if (teams.length <= 12) {
    return <TeamsComponent teams={teams} handleTeamDelete={handleTeamDelete} deleteAllTeams = {deleteAllTeams} getTeams={getTeams}/>;
  }
  // return <RankingsPage />;
}