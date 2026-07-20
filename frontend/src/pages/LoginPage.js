import React, { useState, useContext } from "react";
import { Container, Form, Button, Card, Spinner } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import TopNav from "../components/TopNav";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    // Prevent duplicate login requests
    if (loading) return;

    setLoading(true);

    try {
      await login(username, password);

      toast.success("Logged in");
      nav("/dashboard");
    } catch (err) {
      console.error("Login error", err.response || err);
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
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

          {/* Demo credentials */}
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
            <br />
            Admin → <b>admin / admin123</b>
            <br />
            Official → <b>official / official123</b>
            <br />
            Citizen → <b>citizen / citizen123</b>
          </div>

          <Form onSubmit={submit}>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              variant="warning"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Starting server...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {loading && (
              <div
                className="text-center mt-2"
                style={{ fontSize: "0.8rem", color: "#aaa" }}
              >
                The demo server may take up to a minute to start after
                inactivity.
              </div>
            )}
          </Form>
        </Card>
      </Container>
    </>
  );
}
