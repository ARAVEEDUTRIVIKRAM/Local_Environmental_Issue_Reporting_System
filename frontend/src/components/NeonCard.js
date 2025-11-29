import React from "react";
import { motion } from "framer-motion";

export default function NeonCard({ children, className = "", style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`neon-card ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}
