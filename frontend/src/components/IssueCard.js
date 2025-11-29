import React from "react";
import { Card } from "react-bootstrap";
import { motion } from "framer-motion";

export default function IssueCard({ issue }) {
  const img = issue.imagePath || "/assets/issue-card-1.jpg";
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="mb-3">
      <Card className="shadow-sm neon-card">
        <div style={{ height: 170, overflow: "hidden" }}>
          <Card.Img variant="top" src={img} style={{ objectFit: "cover", height: "100%" }} />
        </div>
        <Card.Body>
          <Card.Title className="neon-title">{issue.title}</Card.Title>
          <Card.Text className="muted">{issue.description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <small className="muted">{issue.createdAt ? new Date(issue.createdAt).toLocaleString() : ''}</small>
            <span className={`badge status-badge ${issue.status?.toLowerCase() || 'open'}`}>{issue.status || "OPEN"}</span>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
