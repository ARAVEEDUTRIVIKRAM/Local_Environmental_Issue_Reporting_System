import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";

export default function LandingPage() {
  const nav = useNavigate();
  return (
    <>
      <TopNav />
      <Container className="mt-5">
        <Row className="align-items-center">
          <Col md={6}>
            <motion.h1 className="neon-h1" initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }}>Make your neighborhood shine</motion.h1>
            <motion.p initial={{ x:-20, opacity:0 }} animate={{ x:0, opacity:1 }} transition={{ delay:.1 }}>
              Report environmental issues, track progress in real-time, and power community-driven change.
            </motion.p>
            <Button variant="warning" onClick={() => nav("/register")}>Get Started</Button>
          </Col>
          <Col md={6}>
            <motion.img src="/assets/hero-neon.png" alt="hero" initial={{ scale:.9 }} animate={{ scale:1 }} className="w-100 float-anim"/>
          </Col>
        </Row>

        <Row className="mt-5 g-4">
          {[
            {title: "Fast Reports", desc: "Report with photos & location", img: "/assets/issue-card-1.jpg"},
            {title: "Track Status", desc: "Official updates", img: "/assets/issue-card-2.jpg"},
            {title: "Community Voting", desc: "Highlight urgent issues", img: "/assets/issue-card-3.jpg"}
          ].map((f,i) => (
            <Col md={4} key={i}>
              <motion.div whileHover={{ y:-6 }} className="feature-card p-3 neon-card">
                <img src={f.img} alt={f.title} style={{ width:"100%", height:140, objectFit:"cover", borderRadius:8 }} />
                <h5 className="neon-title mt-2">{f.title}</h5>
                <p className="muted">{f.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
