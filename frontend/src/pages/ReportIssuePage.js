import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import TopNav from "../components/TopNav";
import MapPicker from "../components/MapPicker";
import { toast } from "react-toastify";
import { uploadFileApi, createIssueApi } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function ReportIssuePage() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Sanitation",
    severity: "Medium",
    suggestedAction: "",
  });

  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const choose = (e) => {
    const f = e.target.files[0];
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };
  const submit = async (e) => { 
  e.preventDefault();

  try {
    let imagePath = null;
    if (file) {
      const upload = await uploadFileApi(file);
      imagePath = upload.data;
    }

    await createIssueApi({
      title: form.title,
      description: form.description,
      imagePath,
      location: coords.lat && coords.lng ? `${coords.lat}, ${coords.lng}` : "",
    });

    toast.success("Issue reported successfully!");
    nav("/dashboard");

  } catch (err) {
    console.error("Report issue error", err);
    toast.error("Failed to report issue");
  }
};



  return (
    <>
      <TopNav />

      <Container className="mt-5 d-flex justify-content-center">
        <Card className="p-4 neon-card" style={{ width: 440 }}>
          <h4 className="neon-title mb-3">Report Issue</h4>

          <Form onSubmit={submit}>
            <Form.Control
              className="mb-2"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />

            <Form.Control
              as="textarea"
              rows={4}
              className="mb-2"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />

            <div className="d-flex gap-2 mb-2">
              <Form.Select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                <option>Sanitation</option>
                <option>Road Safety</option>
                <option>Environmental Hazard</option>
                <option>Public Infrastructure</option>
              </Form.Select>

              <Form.Select
                value={form.severity}
                onChange={(e) => setForm({ ...form, severity: e.target.value })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </Form.Select>
            </div>

            <Form.Control
              className="mb-2"
              placeholder="Suggested Action"
              value={form.suggestedAction}
              onChange={(e) =>
                setForm({ ...form, suggestedAction: e.target.value })
              }
            />

            <Form.Control
              className="mb-3"
              type="file"
              accept="image/*"
              onChange={choose}
            />

            {preview && (
              <img
                src={preview}
                style={{ maxWidth: "100%", borderRadius: 8 }}
                className="mb-3"
              />
            )}

            <MapPicker
              lat={coords.lat}
              lng={coords.lng}
              onChange={(p) => setCoords({ lat: p.lat, lng: p.lng })}
            />

            <Button type="submit" variant="warning" className="w-100 mt-3">
              Submit Issue
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

