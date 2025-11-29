import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from "recharts";
import axios from "../api/axiosClient";
import TopNav from "../components/TopNav";
import NeonCard from "../components/NeonCard";

const COLORS = ["#00e5ff", "#ffc107", "#28a745"];

export default function AdminCharts() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    axios.get("/issues")
      .then(r => setIssues(r.data || []))
      .catch(e => console.error("Chart load failed", e));
  }, []);

  // ✅ GROUP BY STATUS
  const summary = () => {
    const map = { OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0 };
    issues.forEach(i => map[i.status] = (map[i.status] || 0) + 1);
    return Object.keys(map).map(k => ({ name: k, value: map[k] }));
  };

  // ✅ GROUP BY MONTH
  const timeline = () => {
    const map = {};
    issues.forEach(i => {
      const m = new Date(i.createdAt).toLocaleString("default", { month: "short" });
      map[m] = (map[m] || 0) + 1;
    });
    return Object.keys(map).map(k => ({ date: k, count: map[k] }));
  };

  return (
    <>
      <TopNav />
      <Container className="mt-4">

        <Row>
          <Col md={5}>
            <NeonCard className="p-3">
              <h5 className="neon-title">Status Breakdown</h5>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={summary()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    {summary().map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </NeonCard>
          </Col>

          <Col md={7}>
            <NeonCard className="p-3">
              <h5 className="neon-title">Issues Per Month</h5>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeline()}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00e5ff" />
                </BarChart>
              </ResponsiveContainer>
            </NeonCard>
          </Col>
        </Row>

      </Container>
    </>
  );
}
