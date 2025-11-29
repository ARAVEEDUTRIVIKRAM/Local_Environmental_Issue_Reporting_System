import React from "react";
import TopNav from "../components/TopNav";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <>
      <TopNav />
      <Container className="mt-4">
        <h3 className="neon-title">Citizen Dashboard</h3>
        <p className="muted">Welcome! You can report and track environmental issues.</p>

        <Button variant="warning" className="me-2" onClick={() => nav("/report")}>
          + Report Issue
        </Button>

        <Button variant="outline-light" onClick={() => nav("/issues")}>
          View All Issues
        </Button>
      </Container>
    </>
  );
}

