import React from "react";
import { Container, Card } from "react-bootstrap";

export default function RegisterPage() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "75vh" }}
    >
      <Card style={{ width: 420 }} className="p-4 neon-card text-center">
        <h4 className="neon-title mb-3">Registration Disabled</h4>
        <p style={{ fontSize: "0.95rem", color: "#ffc107" }}>
          For demo purposes, new account creation is disabled.
          <br />
          <br />
          Please use the following test accounts to explore:
          <br /> <b>Admin → admin / admin123</b>
          <br /> <b>Official → official / official123</b>
          <br /> <b>Citizen → citizen / citizen123</b>
        </p>
      </Card>
    </Container>
  );
}
