import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function InputDataComponent({ keyword, handleSubmit }) {
  const [form, setForm] = useState({
    input: ""
  });
  
  const navigate = useNavigate();
  
  const submitHelper = async (e, input) => {
    const isSuccessful = await handleSubmit(e, input)
    if (isSuccessful) {
      clearInput();
    }
  }
  const clearInput = () => {
    setForm({input: ""});
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label>Enter {keyword} Details</Form.Label>
          <Form.Control as="textarea"
            rows={3}
            value={form.input}
            onChange={(e) => setForm({ input: e.target.value })}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => submitHelper(e, form.input)}>
          Add
        </Button>
      </Form>
    </>
  );
}