import React, { useState } from "react";
import { useNavigate } from "react-router";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function DisplayTeamsComponent({ teams, handleTeamDelete }) {
  //   const [form, setForm] = useState({
  //     input: ""
  //   });
  let headers = [];

  const getTableHeaders = () => {
    if (teams.length > 0) {
      const teamObj = teams[0];
      headers = Object.keys(teamObj).filter(item => item != '_id');
    }
    return headers
  }

  async function handleDelete(teamId) {
    // Update Database
    await fetch(`http://localhost:5000/${teamId}`, {
      method: "DELETE"
    }).catch(error => {
      window.alert('Failed to delete the teamRecord');
      return;
    });

    handleTeamDelete(teamId);

    return;
  }

  getTableHeaders();

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            {headers && headers.map((item) => (
              <th>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams && teams.map(
            (team) => (
              <tr>
                <td>{team["name"]}</td>
                <td>{team["groupNum"]}</td>
                <td>{team["registrationDate"]}</td>
                <td><Button onClick={() => handleDelete(team["_id"])}>Delete</Button></td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}