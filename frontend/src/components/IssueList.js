import React from "react";
import { Row, Col } from "react-bootstrap";
import IssueCard from "./IssueCard";

export default function IssueList({ issues }) {
  if (!issues || issues.length === 0) return <p>No issues found.</p>;
  return (
    <Row xs={1} md={3} className="g-4">
      {issues.map(i => (
        <Col key={i.id}>
          <IssueCard issue={i} />
        </Col>
      ))}
    </Row>
  );
}
