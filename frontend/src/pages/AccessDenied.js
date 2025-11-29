import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function AccessDenied() {
  const nav = useNavigate();

  return (
    <>
      <TopNav />
      <Container className="text-center mt-5">
        <h2 className="neon-title">Access Denied</h2>
        <p className="muted">You do not have permission to view this page.</p>

        <img
          src="/assets/issue-card-4.jpg"
          width="280"
          style={{ opacity: 0.75, borderRadius: 12 }}
          alt="access denied"
        />

        <div className="mt-3">
          <Button variant="outline-warning" onClick={() => nav("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </Container>
    </>
  );
}
