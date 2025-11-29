import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function NotFound() {
  const nav = useNavigate();

  return (
    <>
      <TopNav />
      <Container className="text-center mt-5">
        <h1 className="neon-title">404</h1>
        <p className="muted">Page not found</p>

        <img
          src="/assets/issue-card-3.jpg"
          width="280"
          style={{ opacity: 0.8, borderRadius: 12 }}
          alt="not found"
        />

        <div className="mt-3">
          <Button variant="outline-info" onClick={() => nav("/")}>
            Go Home
          </Button>
        </div>
      </Container>
    </>
  );
}
