import React from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { capitalize } from "../utils/common";

export default function ScoreboardComponent({ teams }) {
  let headers = [];
  let groupNumber;

  const getRowHeaders = () => {
    headers.push("name");
    if (teams.length) {
      let team = teams[0]
      for (const key of Object.keys(team["matchStats"])) {
        headers.push(key);
      }
    }
  }

  const getGroupNum = () => {
    if (teams.length) {
      groupNumber = teams[0]["groupNumber"];
    }
  }

  getRowHeaders();
  getGroupNum();

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>{(groupNumber && `Group ${groupNumber}`) || "Error getting group number"}</Navbar.Brand>
        </Container>
      </Navbar>
      <Table striped>
        <thead>
          <tr>
            <th>Ranking</th>
            {headers.map((header) => (
              <>
                <th>{capitalize(header)}</th>
              </>
            ))}
          </tr>
        </thead>
        <tbody>
          {teams && teams.map(
            (team, index) => (
              <tr>
                <td>{index + 1}</td>
                {headers.map((header) => (
                  <td>
                    {team[header] ? team[header] : team["matchStats"][header]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
