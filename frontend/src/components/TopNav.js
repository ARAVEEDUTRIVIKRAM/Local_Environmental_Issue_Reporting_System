import React, { useContext } from "react";
import { Navbar, Container, Nav, NavDropdown, Badge } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";
import { motion } from "framer-motion";

export default function TopNav() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <motion.div initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .25 }}>
      <Navbar expand="lg" variant="dark" className="topnav neon-glow">
        <Container>

          {/* LOGO */}
          <Navbar.Brand onClick={() => nav("/")} style={{ cursor: "pointer" }}>
            <img src="/assets/logo-neon.png" alt="logo" height="34" style={{ marginRight: 10 }} />
            <span className="brand-title">IssueReporter</span>
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

            {/* LINKS */}
            <Nav className="me-auto">
              <NavLink to="/issues" className="nav-link">Issues</NavLink>

              {user?.role === "ADMIN" && (
                <>
                  <NavLink to="/admin" className="nav-link">Admin</NavLink>
                  <NavLink to="/admin/charts" className="nav-link">Charts</NavLink>
                </>
              )}

              {user?.role === "OFFICIAL" && (
                <NavLink to="/official" className="nav-link">Official</NavLink>
              )}
            </Nav>

            {/* RIGHT SIDE */}
            <Nav>

              <NotificationBell />

              {user ? (
                <NavDropdown
                  align="end"
                  title={
                    <>
                      <span className="neon-icon">👤</span>
                      <span className="ms-2">{user.username}</span>
                      <Badge bg="info" className="ms-2">{user.role}</Badge>
                    </>
                  }
                >
                  <NavDropdown.Item onClick={() => nav("/dashboard")}>
                    Dashboard
                  </NavDropdown.Item>

                  <NavDropdown.Divider />

                  <NavDropdown.Item onClick={logout} className="text-danger">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavLink to="/login" className="nav-link">Login</NavLink>
              )}

            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </motion.div>
  );
}

