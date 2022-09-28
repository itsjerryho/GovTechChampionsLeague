import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AddTeamsComponent() {
  const [form, setForm] = useState({
    input: ""
  });

  const navigate = useNavigate();

  // This function will handle the submission.
  async function handleSubmit(e) {
    e.preventDefault();

    const text = form.input.trim();
    // Given date format: DD/MM
    const teamsInfo = text.split('\n');
    for (const team of teamsInfo) {
      const detailsArr = team.split(' ');
      const [teamName, teamRegDate, teamGroupNum] = detailsArr;

      const [date, month] = teamRegDate.split('/');
      const formattedDate = '2022-' + month + '-' + date;
      const newTeam = {
        name: teamName,
        registrationDate: formattedDate,
        groupNum: teamGroupNum,
      }
      
      // TODO: Change to Promises.All()
      await fetch("http://localhost:5000/team/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeam),
      })
        .catch(error => {
          window.alert(error);
          return;
        });
    }

    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <Form>
      <Form.Group>
        <Form.Label>Enter Team Details</Form.Label>
        <Form.Control as="textarea"
          rows={3}
          value={form.input}
          onChange={(e) => setForm({ input: e.target.value })}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}