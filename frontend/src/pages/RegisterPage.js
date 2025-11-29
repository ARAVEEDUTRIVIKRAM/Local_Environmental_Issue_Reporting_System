// frontend/src/pages/RegisterPage.js
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../services/api";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      // hits /api/auth/register -> proxied to backend at :8080 in dev
      await registerApi({ username, password });
      toast.success("Registered. Please login.");
      nav("/login");
    } catch (err) {
      // display backend message if available
      const message = err?.response?.data || "Could not register";
      toast.error(message);
      console.error("Register error:", err?.response || err);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
      <Card style={{ width: 420 }} className="p-3 neon-card">
        <h4 className="neon-title">Create account</h4>
        <Form onSubmit={submit}>
          <Form.Group className="mb-2">
            <Form.Control placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button type="submit" className="w-100" variant="warning">Register</Button>
        </Form>
      </Card>
    </Container>
  );
}
