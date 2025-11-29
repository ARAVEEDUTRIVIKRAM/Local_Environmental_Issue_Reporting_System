// frontend/src/pages/ReportIssuePage.js
import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import TopNav from "../components/TopNav";
import { useNavigate } from "react-router-dom";
import { uploadFileApi, createIssueApi } from "../services/api";

export default function ReportIssuePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const nav = useNavigate();

  const choose = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      let imagePath = null;

      if (file) {
        const upload = await uploadFileApi(file);
        imagePath = upload.data; // backend returns /uploads/xxxx.jpg
      }

      await createIssueApi({ title, description, imagePath });

      toast.success("Issue reported successfully!");
      nav("/dashboard");
    } catch (err) {
      console.error("Report issue error", err.response || err);
      const msg = err?.response?.data || "Failed to report issue";
      toast.error(msg);
    }
  };

  return (
    <>
      <TopNav />
      <Container className="mt-5 d-flex justify-content-center">
        <Card className="p-4 neon-card" style={{ width: 420 }}>
          <h4 className="neon-title mb-3">Report Issue</h4>

          <Form onSubmit={submit}>
            <Form.Group className="mb-2">
              <Form.Control
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control type="file" accept="image/*" onChange={choose} />
            </Form.Group>

            {preview && (
              <img
                src={preview}
                style={{ maxWidth: 220, marginBottom: 12, borderRadius: 6 }}
                alt="preview"
              />
            )}

            <Button type="submit" variant="warning" className="w-100">
              Submit Issue
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
}

