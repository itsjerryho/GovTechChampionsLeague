import React, { useState } from "react";
import { useNavigate } from "react-router";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { capitalize } from "../utils/common";
import '../styles/DisplayDataComponent.css'

export default function DisplayDataComponent({ data, contentName, handleDelete, handleDeleteAll, getTableHeaders }) {
  const headers = getTableHeaders();

  return (
    <>
      {data.length > 0 &&
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand>{`List of ${contentName} Entries`}</Navbar.Brand>
          </Container>
        </Navbar>
      }
      <Table striped hover>
        <thead>
          <tr>
            {headers && headers.map((item) => (
              <th>{capitalize(item)}</th>
            ))}
            {headers && <th className="deleteButton"><Button variant="secondary" onClick={handleDeleteAll}>Delete All</Button></th>}
          </tr>
        </thead>
        <tbody>
          {data && data.map(
            (dataObj) => (
              <tr>
                {dataObj && Object.keys(dataObj).map((key) => (
                  (key != '_id') && <td>{dataObj[key]}</td>
                ))}
                <td className="deleteButton"><Button onClick={() => handleDelete(dataObj["_id"])}>Delete</Button></td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}
