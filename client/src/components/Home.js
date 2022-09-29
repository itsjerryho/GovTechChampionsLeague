import React from "react";
import Alert from 'react-bootstrap/Alert';
import RankingsComponent from "./RankingsComponent";
import TeamsComponent from './TeamsComponent';

export default function Home({ teams, results, handleTeamDelete, deleteAllTeams, getTeams }) {
  let alertMissingTeamsMessage = "";
  let alertMissingResultsMessage = "";

  const createMissingTeamsAlertMessage = () => {
    if (teams.length < 12) {
      alertMissingTeamsMessage = `Sorry! We are unable to show you the current rankings as you have yet to enter 12 teams. You have only entered ${teams.length} teams so far.`
    } else if (teams.length > 12) {
      alertMissingTeamsMessage = `Sorry! We are unable to show you the current rankings as you have entered more than 12 teams. Please delete ${teams.length - 12} teams.`
    }
  }

  const createMissingResultsAlertMessage = () => {
    if (!results.length) {
      alertMissingResultsMessage = "Enter team results in results page to view the updated ranking board."
    }
  }

  createMissingTeamsAlertMessage();
  createMissingResultsAlertMessage();

  if (teams.length !== 12) {
    return (
      <>
        <Alert dismissible key={'info'} variant={'info'}>
          {alertMissingTeamsMessage}
        </Alert>
        <TeamsComponent teams={teams} handleTeamDelete={handleTeamDelete} deleteAllTeams={deleteAllTeams} getTeams={getTeams} />
      </>)
  }
  return (
    <>
      {alertMissingResultsMessage
        &&
        <Alert dismissible key={'info'} variant={'info'}>
          {alertMissingResultsMessage}
        </Alert>
      }
      <RankingsComponent teams={teams} results={results} />
    </>
  )
}