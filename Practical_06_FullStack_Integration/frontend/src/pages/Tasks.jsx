import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api/api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

/**
 * Tasks Page (Practical 6 Full Stack Integration)
 * Integrates React frontend with Express/Mongoose backend:
 * - Create task
 * - Read tasks list
 * - Update task / toggle completed
 * - Delete task with confirmation modal
 * - State synchronization & toast notifications
 */
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [submitting, setSubmitting] = useState(false);

  // Filter & Search
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');

  // Edit State
  const [editingTask, setEditingTask] = useState(null);

  // Feedback State
  const [toast, setToast] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Fetch tasks from Express backend
  const loadTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks({ search, priority: filterPriority });
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search, filterPriority]);

  // Handle Create Task
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const res = await createTask({
        title: title.trim(),
        description: description.trim(),
        priority
      });
      showToast('Task created and saved to MongoDB!', 'success');
      setTitle('');
      setDescription('');
      setPriority('medium');
      // Re-fetch to synchronize state
      await loadTasks();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Toggle Completion
  const handleToggle = async (task) => {
    try {
      await updateTask(task._id, { completed: !task.completed });
      showToast(`Task marked as ${!task.completed ? 'completed' : 'pending'}`, 'success');
      // Optimistic local state update + sync
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, completed: !t.completed } : t))
      );
    } catch (err) {
      showToast(err.message, 'error');
      loadTasks();
    }
  };

  // Handle Update Task
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingTask || !editingTask.title.trim()) return;

    try {
      await updateTask(editingTask._id, {
        title: editingTask.title.trim(),
        description: editingTask.description,
        priority: editingTask.priority
      });
      showToast('Task updated successfully!', 'success');
      setEditingTask(null);
      await loadTasks();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // Handle Delete Confirmation
  const confirmDelete = async () => {
    if (!deleteTargetId) return;
    try {
      await deleteTask(deleteTargetId);
      showToast('Task deleted from MongoDB', 'success');
      setDeleteTargetId(null);
      await loadTasks();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  return (
    <section className="section-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
        <h2 className="section-title" style={{ margin: 0, border: 'none', padding: 0 }}>
          <span className="section-title-dot"></span>
          Full-Stack Task Manager (React + Express + MongoDB)
        </h2>
        <button
          type="button"
          onClick={loadTasks}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--accent-cyan)',
            padding: '0.4rem 0.85rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.85rem'
          }}
        >
          🔄 Re-fetch Data
        </button>
      </div>

      {/* Task Creation Form */}
      <form onSubmit={handleCreate} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          ➕ Add New Task to Database
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Implement JWT Authentication"
              className="form-input"
              style={{ width: '100%', marginTop: '0.35rem' }}
            />
          </div>
          <div>
            <label className="form-label">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-input"
              style={{ width: '100%', marginTop: '0.35rem' }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label className="form-label">Task Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details, acceptance criteria, or notes..."
            className="form-input"
            style={{ width: '100%', marginTop: '0.35rem' }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="form-submit-btn"
          style={{ width: 'auto', padding: '0.65rem 1.5rem' }}
        >
          {submitting ? 'Saving to MongoDB...' : 'Save Task to MongoDB'}
        </button>
      </form>

      {/* Search & Filter Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search tasks by title or description..."
          className="form-input"
          style={{ flex: 1, minWidth: '220px' }}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="form-input"
          style={{ width: '160px' }}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>

      {/* Loading / Error States */}
      {loading && <Spinner message="Synchronizing with MongoDB backend..." />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={loadTasks} />
      )}

      {!loading && !error && tasks.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
          No tasks found in MongoDB. Create your first task using the form above!
        </div>
      )}

      {/* Task List */}
      {!loading && !error && tasks.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                padding: '1.15rem 1.35rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '0.75rem',
                opacity: task.completed ? 0.75 : 1,
                borderLeft: `4px solid ${
                  task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981'
                }`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '240px' }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent-cyan)' }}
                />
                <div>
                  <h4 style={{
                    fontSize: '1.05rem',
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: 'var(--text-primary)'
                  }}>
                    {task.title}
                  </h4>
                  {task.description && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                      {task.description}
                    </p>
                  )}
                  <span style={{
                    fontSize: '0.7rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                    marginTop: '0.35rem',
                    display: 'inline-block'
                  }}>
                    Priority: <strong>{task.priority.toUpperCase()}</strong> • Created: {new Date(task.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingTask(task)}
                  style={{
                    background: 'rgba(6, 182, 212, 0.15)',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    color: 'var(--accent-cyan)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTargetId(task._id)}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#ef4444',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {editingTask && (
        <div className="modal-overlay" onClick={() => setEditingTask(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Edit Task Details
            </h3>
            <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Task Title</label>
                <input
                  type="text"
                  required
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                  className="form-input"
                  style={{ width: '100%', marginTop: '0.35rem' }}
                />
              </div>
              <div>
                <label className="form-label">Description</label>
                <textarea
                  rows="3"
                  value={editingTask.description || ''}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                  className="form-textarea"
                  style={{ width: '100%', marginTop: '0.35rem' }}
                />
              </div>
              <div>
                <label className="form-label">Priority</label>
                <select
                  value={editingTask.priority}
                  onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                  className="form-input"
                  style={{ width: '100%', marginTop: '0.35rem' }}
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setEditingTask(null)}
                  style={{
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="form-submit-btn"
                  style={{ width: 'auto', padding: '0.5rem 1.25rem' }}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deleteTargetId)}
        title="Delete Task Confirmation"
        message="Are you sure you want to permanently remove this task from MongoDB? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}
