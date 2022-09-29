import React, { useState } from "react";
import { useNavigate } from "react-router";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import '../styles/InputDataComponent.css';

export default function InputDataComponent({ keyword, textPlaceHolder, handleSubmit }) {
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
    setForm({ input: "" });
  }

  return (
    <>
      <Container>
        <Form>
          <Container className="formGroupContainer">
            <Form.Group>
              <Form.Label>Enter {keyword} Details</Form.Label>
              <Form.Control as="textarea"
                placeholder={textPlaceHolder}
                rows={3}
                value={form.input}
                onChange={(e) => setForm({ input: e.target.value })}
              />
            </Form.Group>
          </Container>
          <Container className="submitButtonContainer">
            <Button
              variant="outline-primary"
              type="submit"
              onClick={(e) => submitHelper(e, form.input)}>
              Add
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
}