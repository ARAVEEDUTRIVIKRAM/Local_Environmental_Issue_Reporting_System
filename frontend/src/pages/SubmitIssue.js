import React, { useState } from "react";
import { submitIssue } from "../services/Api";
import IssueForm from "../components/IssueForm";

export default function SubmitIssue(){
  const [loading, setLoading] = useState(false);

  async function onSubmit(formData, file) {
    setLoading(true);
    try {
      const payload = new FormData();
      payload.append("data", new Blob([JSON.stringify(formData)], { type: "application/json" }));
      if (file) payload.append("file", file);
      await submitIssue(payload);
      alert("Issue submitted");
    } catch(err){
      console.error(err);
      alert("Failed to submit. Check backend & CORS.");
    } finally { setLoading(false); }
  }

  return (
    <div className="card fade-in" style={{maxWidth:720, margin:"0 auto"}}>
      <h2>Report</h2>
      <IssueForm onSubmit={onSubmit} submitting={loading}/>
    </div>
  );
}
