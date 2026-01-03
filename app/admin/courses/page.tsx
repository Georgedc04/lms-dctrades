/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useMemo, useState } from "react";

/* ---------- Types ---------- */
type Course = {
  id: string;
  title: string;
  price: number;
  isPublished: boolean;
  imageUrl?: string | null;
};

export default function CoursesPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [, setDeleted] = useState<Course | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  function fetchCourses() {
    fetch("/api/course").then(r => r.json()).then(setCourses);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  /* ---------- Analytics ---------- */
  const analytics = useMemo(() => {
    const published = courses.filter(c => c.isPublished);
    return {
      total: courses.length,
      published: published.length,
      drafts: courses.length - published.length,
      revenue: published.reduce((sum, c) => sum + c.price, 0),
    };
  }, [courses]);

  /* ---------- Create / Edit ---------- */
  async function saveCourse() {
    if (!title || !price) return;

    await fetch("/api/course", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        title,
        price: Number(price),
        imageUrl: imageUrl || null,
      }),
    });

    setTitle("");
    setPrice("");
    setImageUrl("");
    setEditingId(null);
    fetchCourses();
  }

  /* ---------- Publish ---------- */
  async function togglePublish(course: Course) {
    await fetch("/api/course", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: course.id,
        isPublished: !course.isPublished,
      }),
    });
    fetchCourses();
  }

  /* ---------- Delete + Undo ---------- */
  function deleteCourse(course: Course) {
    setDeleted(course);
    setCourses(prev => prev.filter(c => c.id !== course.id));

    setTimeout(async () => {
      await fetch("/api/course", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: course.id }),
      });
      setDeleted(null);
    }, 4000);
  }

  /* ---------- Bulk Delete ---------- */
  async function bulkDelete() {
    await fetch("/api/course/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected }),
    });

    setCourses(prev => prev.filter(c => !selected.includes(c.id)));
    setSelected([]);
  }

  /* ---------- Reorder ---------- */
  async function onDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;

    const from = courses.findIndex(c => c.id === dragId);
    const to = courses.findIndex(c => c.id === targetId);

    const updated = [...courses];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setCourses(updated);

    await fetch("/api/course/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        updated.map((c, i) => ({ id: c.id, order: i }))
      ),
    });

    setDragId(null);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-gray-500">Overview & management</p>
        </div>

        {/* Analytics */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Stat label="Total" value={analytics.total} />
          <Stat label="Published" value={analytics.published} />
          <Stat label="Drafts" value={analytics.drafts} />
          <Stat label="Revenue" value={`₹${analytics.revenue}`} />
        </div>

        {/* Bulk actions */}
        <button
          disabled={!selected.length}
          onClick={bulkDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Delete Selected ({selected.length})
        </button>

        {/* Create / Edit */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          <input
            placeholder="Course title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full"
          />

          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full"
          />

          <input
            placeholder="Thumbnail Image URL (https://...)"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full"
          />

          {imageUrl && (
            <div className="mt-2">
              <p className="text-sm text-gray-500 mb-1">Preview</p>
              <img
                src={imageUrl}
                alt="Thumbnail preview"
                className="h-32 w-full object-cover rounded-xl border"
              />
            </div>
          )}

          <button
            onClick={saveCourse}
            disabled={!title || !price}
            className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium disabled:opacity-50"
          >
            {editingId ? "Update Course" : "Create Course"}
          </button>
        </div>

        {/* Courses List */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-4">
          {courses.map(course => (
            <div
              key={course.id}
              onDrop={() => onDrop(course.id)}
              onDragOver={e => e.preventDefault()}
              className="flex items-center justify-between border rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                {/* ✅ ONLY ADDITION: thumbnail preview */}
                {course.imageUrl ? (
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="h-12 w-20 object-cover rounded-md border"
                  />
                ) : (
                  <div className="h-12 w-20 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                    No Image
                  </div>
                )}

                <div>
                  <p className="font-medium">{course.title}</p>
                  <p className="text-sm text-gray-500">
                    ₹{course.price} ·{" "}
                    {course.isPublished ? (
                      <span className="text-green-600">Published</span>
                    ) : (
                      <span className="text-red-600">Draft</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(course.id);
                    setTitle(course.title);
                    setPrice(String(course.price));
                    setImageUrl(course.imageUrl ?? "");
                  }}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => togglePublish(course)}
                  className="text-sm px-3 py-1 rounded-lg bg-gray-100"
                >
                  {course.isPublished ? "Unpublish" : "Publish"}
                </button>

                <button
                  onClick={() => deleteCourse(course)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ---------- Stat Card ---------- */
function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
