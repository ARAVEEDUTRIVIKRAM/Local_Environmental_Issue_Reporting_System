import React, { useEffect, useState } from "react";
import axios from "../api/axiosClient";
import TopNav from "../components/TopNav";
import { Container, Table, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function OfficialDashboard() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("/api/issues")
      .then(r => setIssues(r.data))
      .catch(() => toast.error("Failed to load issues"));
  }, []);

  const update = async (id, status) => {
    try {
      await axios.put(`/api/official/issues/${id}/status?status=${status}`);
      toast.success("Updated");

      setIssues(prev =>
        prev.map(i => i.id === id ? {...i, status} : i)
      );
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <>
      <TopNav />
      <Container className="mt-4">
        <h3 className="neon-title">Official Dashboard</h3>
        <Table striped hover className="neon-card">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(i => (
              <tr key={i.id}>
                <td>{i.title}</td>
                <td>{i.status}</td>
                <td>
                  <Button size="sm"
                          onClick={() => update(i.id, "IN_PROGRESS")}
                          className="me-2">
                    In Progress
                  </Button>
                  <Button size="sm" variant="success"
                          onClick={() => update(i.id, "RESOLVED")}>
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

