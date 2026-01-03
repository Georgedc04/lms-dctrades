"use client";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- Types ---------- */
type Course = { id: string; title: string };
type Module = { id: string; title: string; course: Course };

export default function ModulesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [title, setTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<Module | null>(null);

  const deleteRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetch("/api/course").then(r => r.json()).then(setCourses);
    fetch("/api/module").then(r => r.json()).then(setModules);
  }, []);

  /* ---------- Filter ---------- */
  const filteredModules = useMemo(() => {
    return modules.filter(m =>
      (!courseId || m.course.id === courseId) &&
      m.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [modules, courseId, search]);

  /* ---------- Create / Edit (FIXED) ---------- */
  async function saveModule() {
    if (!title || !courseId) return;

    await fetch("/api/module", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editingId,
        title,
        courseId,
      }),
    });

    setTitle("");
    setCourseId("");
    setEditingId(null);
    setModules(await fetch("/api/module").then(r => r.json()));
  }

  /* ---------- Undo Delete (FIXED) ---------- */
  function deleteModule(m: Module) {
    setDeleted(m);
    setModules(prev => prev.filter(x => x.id !== m.id));

    if (deleteRef.current) clearTimeout(deleteRef.current);

    deleteRef.current = setTimeout(async () => {
      await fetch("/api/module", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m.id }),
      });
      setDeleted(null);
    }, 4000);
  }

  /* ---------- Bulk Delete ---------- */
  async function bulkDelete() {
    await fetch("/api/module/bulk-delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: selected }),
    });

    setModules(prev => prev.filter(m => !selected.includes(m.id)));
    setSelected([]);
  }

  /* ---------- Drag reorder (FIXED INDEX SOURCE) ---------- */
  async function onDragEnd(fromId: string, toId: string) {
    const fromIndex = modules.findIndex(m => m.id === fromId);
    const toIndex = modules.findIndex(m => m.id === toId);

    if (fromIndex === -1 || toIndex === -1) return;

    const updated = [...modules];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setModules(updated);

    await fetch("/api/module/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated.map((m, i) => ({ id: m.id, order: i }))),
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Modules</h1>
          <p className="text-gray-500">{modules.length} total</p>
        </div>

        {/* Controls */}
        <div className="grid sm:grid-cols-3 gap-4">
          <input
            placeholder="Search…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded-xl px-4 py-2"
          />
          <select
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            className="border rounded-xl px-4 py-2"
          >
            <option value="">All courses</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
          <button
            disabled={!selected.length}
            onClick={bulkDelete}
            className="bg-red-600 text-white rounded-xl px-4 py-2 disabled:opacity-50"
          >
            Delete Selected ({selected.length})
          </button>
        </div>

        {/* Create / Edit */}
        <div className="bg-white p-6 rounded-2xl shadow space-y-4">
          <input
            placeholder="Module title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full"
          />
          <select
            value={courseId}
            onChange={e => setCourseId(e.target.value)}
            className="border rounded-xl px-4 py-2 w-full"
          >
            <option value="">Select course</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>

          <div className="flex gap-3">
            <button
              onClick={saveModule}
              disabled={!title || !courseId}
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl font-medium shadow hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50"
            >
              {editingId ? "Update Module" : "Create Module"}
            </button>

            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setCourseId("");
                }}
                className="text-sm text-gray-500 underline"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-3">
          {filteredModules.map(m => (
            <div
              key={m.id}
              onDrop={e => {
                const fromId = e.dataTransfer.getData("id");
                onDragEnd(fromId, m.id);
              }}
              onDragOver={e => e.preventDefault()}
              className="flex items-center justify-between border rounded-xl p-4"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(m.id)}
                  onChange={() =>
                    setSelected(s =>
                      s.includes(m.id)
                        ? s.filter(id => id !== m.id)
                        : [...s, m.id]
                    )
                  }
                />
                <span
                  draggable
                  onDragStart={e => e.dataTransfer.setData("id", m.id)}
                  className="cursor-grab text-gray-400"
                >
                  ⠿
                </span>
                <div>
                  <p className="font-medium">{m.title}</p>
                  <p className="text-sm text-gray-500">{m.course.title}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setEditingId(m.id);
                    setTitle(m.title);
                    setCourseId(m.course.id);
                  }}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteModule(m)}
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
            <span>Module deleted</span>
            <button
              onClick={() => {
                if (deleteRef.current) clearTimeout(deleteRef.current);
                setModules(prev => [...prev, deleted]);
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
