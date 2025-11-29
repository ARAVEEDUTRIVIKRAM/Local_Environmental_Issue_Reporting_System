import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { Container, Card, Badge, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getIssuesApi } from "../services/api";
import { toast } from "react-toastify";

export default function ViewIssues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    getIssuesApi()
      .then((res) => setIssues(res.data || []))
      .catch(() => toast.error("Could not load issues"))
      .finally(() => setLoading(false));
  }, []);

  const badge = (status) => {
    if (status === "OPEN") return "danger";
    if (status === "IN_PROGRESS") return "warning";
    if (status === "RESOLVED") return "success";
    return "secondary";
  };

  return (
    <>
      <TopNav />
      <Container className="mt-4">

        <h3 className="neon-title">All Reported Issues</h3>

        {/* LOADING */}
        {loading && (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="info" />
            <p className="muted mt-2">Loading issues...</p>
          </div>
        )}

        {/* EMPTY */}
        {!loading && issues.length === 0 && (
          <div className="text-center mt-5">
            <img src="/assets/issue-card-1.jpg" width="220" alt="empty" />
            <p className="muted mt-3">No issues reported yet.</p>
          </div>
        )}

        {/* DATA */}
        <Row>
          {!loading && issues.map(i => (
            <Col md={4} key={i.id} className="mb-3">
              <Card
                className="neon-card issue-card"
                onClick={() => nav(`/issues/${i.id}`)}
                style={{ cursor:"pointer" }}
              >
                {i.imagePath && (
                  <Card.Img
                    variant="top"
                    src={i.imagePath}
                    style={{ height:180, objectFit:"cover" }}
                  />
                )}

                <Card.Body>
                  <Card.Title>{i.title}</Card.Title>
                  <Badge bg={badge(i.status || "OPEN")}>
                    {i.status || "OPEN"}
                  </Badge>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

      </Container>
    </>
  );
}

