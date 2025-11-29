import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import TopNav from "../components/TopNav";
import { Container, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/issues")
      .then(r => setIssues(r.data))
      .catch(() => toast.error("Failed to load issues"));
  }, []);

  const change = async (id, status) => {
    try {
      await axios.put(`/api/admin/issues/${id}/status?status=${status}`);
      toast.success("Status updated");

      setIssues(prev =>
        prev.map(i => i.id === id ? { ...i, status } : i)
      );
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <>
      <TopNav />
      <Container className="mt-4">
        <h3 className="neon-title">Admin - Issues</h3>
        <Table striped hover className="neon-card">
          <thead>
            <tr><th>Title</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {issues.map(i => (
              <tr key={i.id}>
                <td>{i.title}</td>
                <td>{i.status}</td>
                <td>
                  <Button size="sm"
                    onClick={() => change(i.id, "IN_PROGRESS")}
                    className="me-2">
                    In Progress
                  </Button>
                  <Button size="sm" variant="success"
                    onClick={() => change(i.id, "RESOLVED")}>
                    Resolve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

