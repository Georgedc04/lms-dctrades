"use client";

import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { useEffect, useState } from "react";

type Module = {
  id: string;
  title: string;
};

export default function LessonPage() {
  const [title, setTitle] = useState("");
  const [moduleId, setModuleId] = useState("");
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetch("/api/module").then(r => r.json()).then(setModules);
  }, []);

  async function saveLesson() {
    if (!title || !moduleId || !videoUrl || !pdfUrl) return;
    setStatus("Saving lesson...");

    const res = await fetch("/api/lesson", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, moduleId, videoUrl, pdfUrl }),
    });

    setStatus(res.ok ? "Lesson saved" : "Failed to save");
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Create Lesson</h1>
          <p className="text-gray-500">Drag, upload & preview content</p>
        </div>

        {/* Title + Module */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="Lesson title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={moduleId}
            onChange={e => setModuleId(e.target.value)}
            className="border rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select module</option>
            {modules.map(m => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>

        {/* Uploads */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* VIDEO */}
          <div className="space-y-3">
            <h3 className="font-semibold">Lesson Video</h3>

            {!videoUrl ? (
              <UploadDropzone<OurFileRouter, "lessonVideo">
                endpoint="lessonVideo"
                onUploadProgress={p => setProgress(p)}
                onClientUploadComplete={res => {
                  setVideoUrl(res?.[0]?.ufsUrl || null);
                  setProgress(0);
                }}
                onUploadError={() => setStatus("Video upload failed")}
                className="ut-label:text-blue-600 ut-button:bg-blue-600 ut-button:hover:bg-blue-700"
              />
            ) : (
              <video
                src={videoUrl}
                controls
                className="rounded-xl w-full shadow"
              />
            )}

            {progress > 0 && (
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-full bg-blue-600 rounded transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </div>

          {/* PDF */}
          <div className="space-y-3">
            <h3 className="font-semibold">Lesson PDF</h3>

            {!pdfUrl ? (
              <UploadDropzone<OurFileRouter, "lessonPDF">
                endpoint="lessonPDF"
                onClientUploadComplete={res =>
                  setPdfUrl(res?.[0]?.ufsUrl || null)
                }
                onUploadError={() => setStatus("PDF upload failed")}
                className="ut-label:text-blue-600 ut-button:bg-blue-600 ut-button:hover:bg-blue-700"
              />
            ) : (
              <div className="flex items-center gap-3 p-4 border rounded-xl">
                <span className="text-2xl">📄</span>
                <p className="text-sm text-gray-600">PDF uploaded</p>
              </div>
            )}
          </div>

        </div>

        {/* Save */}
        <button
          onClick={saveLesson}
          disabled={!title || !moduleId || !videoUrl || !pdfUrl}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          Save Lesson
        </button>

        {status && <p className="text-center text-sm text-gray-500">{status}</p>}
      </div>
    </div>
  );
}
