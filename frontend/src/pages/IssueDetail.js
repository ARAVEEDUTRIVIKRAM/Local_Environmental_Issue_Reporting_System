import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosClient";
import TopNav from "../components/TopNav";
import { Container, Card, Spinner } from "react-bootstrap";
import StatusBadge from "../components/StatusBadge";
import { toast } from "react-toastify";

export default function IssueDetail() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/issues/${id}`)   // ✅ FIXED API PATH
      .then((r) => setIssue(r.data))
      .catch(() => {
        toast.error("Failed to load issue");
        setIssue(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <>
        <TopNav />
        <Container className="text-center mt-5">
          <Spinner animation="border" variant="info" />
        </Container>
      </>
    );
    if (!issue) {
      return (
        <>
          <TopNav />
          <Container className="mt-4 text-center">
            <div className="mt-5">
              <div className="spinner-border text-info"></div>
              <p className="muted mt-2">Loading issue details...</p>
            </div>
          </Container>
        </>
      );
    }




  return (
    <>
      <TopNav />
      <Container className="mt-4">
        <Card className="neon-card p-3">
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            
            <img
              src={issue.imagePath || "/assets/issue-card-1.jpg"}
              style={{ width: 360, borderRadius: 10, objectFit: "cover" }}
              alt="issue"
            />

            <div>
              <h3 className="neon-title">{issue.title}</h3>

              <StatusBadge status={issue.status || "OPEN"} />

              <p className="muted mt-2">
                {new Date(issue.createdAt).toLocaleString()}
              </p>

              <p>{issue.description}</p>

              <p className="muted">
                Reported by: {issue.reportedBy || "anonymous"}
              </p>

            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}
