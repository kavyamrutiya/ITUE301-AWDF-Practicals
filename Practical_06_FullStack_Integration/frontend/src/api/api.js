/**
 * Central API Client (Practical 6)
 * Handles communication between React UI and Express/MongoDB backend.
 */

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }
    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      throw new Error(`Cannot reach backend server at ${BASE_URL}. Ensure Express backend is running on port 5001.`);
    }
    throw err;
  }
}

// Fetch all tasks
export async function getTasks(params = {}) {
  const query = new URLSearchParams();
  if (params.priority && params.priority !== 'all') query.append('priority', params.priority);
  if (params.completed !== undefined && params.completed !== 'all') query.append('completed', params.completed);
  if (params.search) query.append('search', params.search);

  const qs = query.toString() ? `?${query.toString()}` : '';
  const result = await request(`/tasks${qs}`, { method: 'GET' });
  return result?.data || [];
}

// Create a task
export async function createTask(taskData) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData)
  });
}

// Update a task
export async function updateTask(id, updateData) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  });
}

// Delete a task
export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE'
  });
}
