import React, { useState, useContext } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TopNav from "../components/TopNav";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      toast.success("Logged in");
      nav("/dashboard");
    } catch (err) {
      console.error("Login error", err.response || err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <>
      <TopNav />
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "75vh" }}
      >
        <Card style={{ width: 420 }} className="p-3 neon-card">
          <h4 className="neon-title">Sign in</h4>

          {/* --- DEMO CREDENTIALS BOX --- */}
          <div
            style={{
              background: "#222",
              padding: "10px",
              borderRadius: "6px",
              color: "#ffc107",
              marginBottom: "15px",
              fontSize: "0.9rem",
            }}
          >
            <strong>Demo Accounts:</strong>
            <br /> Admin → <b>admin / admin123</b>
            <br /> Official → <b>official / official123</b>
            <br /> Citizen → <b>citizen / citizen123</b>
          </div>

          <Form onSubmit={submit}>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="w-100" variant="warning">
              Sign In
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

