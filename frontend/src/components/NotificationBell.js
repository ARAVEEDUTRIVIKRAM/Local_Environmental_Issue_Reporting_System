import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BellFill } from "react-bootstrap-icons";
import { motion } from "framer-motion";

export default function NotificationBell() {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip>Notifications</Tooltip>}>
      <motion.div whileHover={{ scale: 1.08 }} className="me-2" style={{ cursor: "pointer" }}>
        <BellFill className="neon-icon" size={20} />
      </motion.div>
    </OverlayTrigger>
  );
}
