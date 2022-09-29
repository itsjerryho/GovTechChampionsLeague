import React from "react";
import Alert from 'react-bootstrap/Alert';
import RankingsComponent from "./RankingsComponent";
import TeamsComponent from './TeamsComponent';

export default function Home({ teams, results, handleTeamDelete, deleteAllTeams, getTeams }) {
  let alertMessage = "";

  const createAlertMessage = () => {
    if (teams.length < 12) {
      alertMessage = `Sorry! We are unable to show you the current rankings as you have yet to enter 12 teams. You have only entered ${teams.length} teams so far.`
    } else if (teams.length > 12) {
      alertMessage = `Sorry! We are unable to show you the current rankings as you have entered more than 12 teams. Please delete ${teams.length - 12} teams.`
    }
  }

  createAlertMessage();

  if (teams.length !== 12) {
    return (
      <>
        <Alert key={'info'} variant={'info'}>
          {alertMessage}
        </Alert>
        <TeamsComponent teams={teams} handleTeamDelete={handleTeamDelete} deleteAllTeams={deleteAllTeams} getTeams={getTeams} />
      </>)
  }
  return <RankingsComponent teams={teams} results={results} />;
}