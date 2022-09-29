import React from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { capitalize } from "../utils/common";

export default function ScoreboardComponent({ teams }) {
  let headers = [];
  let groupNum;

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
      groupNum = teams[0]["groupNum"];
    }
  }

  getRowHeaders();
  getGroupNum();

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand>{(groupNum && `Group ${groupNum}`) || "Error getting group number"}</Navbar.Brand>
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
