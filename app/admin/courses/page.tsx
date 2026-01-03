"use client";
import { useEffect, useMemo, useState } from "react";

/* ---------- Types ---------- */
type Course = {
  id: string;
  title: string;
  price: number;
  isPublished: boolean;
};

export default function CoursesPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<Course | null>(null);
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
      }),
    });

    setTitle("");
    setPrice("");
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

          <div className="flex gap-3">
            <button
              onClick={saveCourse}
              disabled={!title || !price}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl font-medium disabled:opacity-50"
            >
              {editingId ? "Update Course" : "Create Course"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setPrice("");
                }}
                className="text-sm text-gray-500 underline"
              >
                Cancel
              </button>
            )}
          </div>
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
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(course.id)}
                  onChange={() =>
                    setSelected(s =>
                      s.includes(course.id)
                        ? s.filter(id => id !== course.id)
                        : [...s, course.id]
                    )
                  }
                />

                <span
                  draggable
                  onDragStart={() => setDragId(course.id)}
                  className="cursor-grab text-gray-400"
                >
                  ⠿
                </span>

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

        {/* Undo Toast */}
        {deleted && (
          <div className="fixed bottom-6 right-6 bg-white shadow-xl rounded-xl p-4 flex gap-3">
            <span>Course deleted</span>
            <button
              onClick={() => {
                setCourses(prev => [...prev, deleted]);
                setDeleted(null);
              }}
              className="text-blue-600 font-medium"
            >
              Undo
            </button>
          </div>
        )}

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
