import React, { useState } from "react";

export default function IssueForm({ onSubmit, submitting }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("Water Leakage");
  const [file, setFile] = useState(null);

  function handleSubmit(e){
    e.preventDefault();
    onSubmit({title, description, location, category}, file);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input className="input" value={title} onChange={e=>setTitle(e.target.value)} required />
      <label>Description</label>
      <textarea className="input" value={description} onChange={e=>setDescription(e.target.value)} required />
      <label>Location</label>
      <input className="input" value={location} onChange={e=>setLocation(e.target.value)} required />
      <label>Category</label>
      <select className="input" value={category} onChange={e=>setCategory(e.target.value)}>
        <option>Water Leakage</option>
        <option>Garbage</option>
        <option>Pollution</option>
        <option>Road Damage</option>
      </select>
      <label>Attach Image (optional)</label>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
      <div style={{marginTop:12}}>
        <button className="btn" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit"}</button>
      </div>
    </form>
  );
}

