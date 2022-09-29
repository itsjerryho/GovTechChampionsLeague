import React, { useState } from "react";
import { useNavigate } from "react-router";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function DisplayDataComponent({ data, handleDelete, handleDeleteAll, getTableHeaders }) {
  const headers = getTableHeaders();

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            {headers && headers.map((item) => (
              <th>{item}</th>
            ))}
            {headers && <th><Button variant="secondary" onClick={handleDeleteAll}>Delete All</Button></th>}
          </tr>
        </thead>
        <tbody>
          {data && data.map(
            (dataObj) => (
              <tr>
                {dataObj && Object.keys(dataObj).map((key) => (
                  (key != '_id') && <td>{dataObj[key]}</td>
                ))}
                <td><Button onClick={() => handleDelete(dataObj["_id"])}>Delete</Button></td>
              </tr>
            )
          )}
        </tbody>
      </Table>
    </>
  );
}
