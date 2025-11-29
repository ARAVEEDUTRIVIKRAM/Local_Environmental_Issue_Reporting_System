import React from "react";

export default function StatusBadge({ status }) {
  if (!status) return null;
  const s = status.toUpperCase();
  if (s === "RESOLVED") {
    return <img src="/assets/badge-resolved.png" alt="Resolved" className="status-badge" />;
  }
  if (s === "IN_PROGRESS" || s === "IN-PROGRESS") {
    return <img src="/assets/badge-progress.png" alt="In Progress" className="status-badge" />;
  }
  // default open
  return <img src="/assets/badge-open.png" alt="Open" className="status-badge" />;
}
