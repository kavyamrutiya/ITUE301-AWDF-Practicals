/**
 * Central API Client with JWT Authentication (Practical 7)
 */

export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

export function getStoredToken() {
  return localStorage.getItem('awdf_token') || '';
}

export function setStoredToken(token) {
  if (token) {
    localStorage.setItem('awdf_token', token);
  } else {
    localStorage.removeItem('awdf_token');
  }
}

export function removeStoredToken() {
  localStorage.removeItem('awdf_token');
  localStorage.removeItem('awdf_user');
}

export function getStoredUser() {
  try {
    const u = localStorage.getItem('awdf_user');
    return u ? JSON.parse(u) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredUser(user) {
  if (user) {
    localStorage.setItem('awdf_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('awdf_user');
  }
}

async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const token = getStoredToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(url, { ...options, headers });
    const data = await res.json().catch(() => null);

    if (res.status === 401) {
      // 401 Unauthorized Handling: clear stale token and notify listener
      removeStoredToken();
      window.dispatchEvent(new Event('auth:unauthorized'));
      throw new Error(data?.message || 'Authentication required or session expired');
    }

    if (!res.ok) {
      const errorMsg = data?.message || data?.error || `Request failed with status ${res.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      throw new Error(`Cannot reach backend server at ${BASE_URL}. Ensure backend is running.`);
    }
    throw err;
  }
}

// Auth API Calls
export async function registerUser(userData) {
  const result = await request('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData)
  });
  if (result.token) {
    setStoredToken(result.token);
    setStoredUser(result.user);
  }
  return result;
}

export async function loginUser(credentials) {
  const result = await request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  if (result.token) {
    setStoredToken(result.token);
    setStoredUser(result.user);
  }
  return result;
}

export async function getCurrentUser() {
  const result = await request('/api/auth/me', { method: 'GET' });
  return result.user;
}

// Protected Task API Calls
export async function getTasks(params = {}) {
  const query = new URLSearchParams();
  if (params.priority && params.priority !== 'all') query.append('priority', params.priority);
  if (params.completed !== undefined && params.completed !== 'all') query.append('completed', params.completed);
  if (params.search) query.append('search', params.search);

  const qs = query.toString() ? `?${query.toString()}` : '';
  const result = await request(`/tasks${qs}`, { method: 'GET' });
  return result?.data || [];
}

export async function createTask(taskData) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(taskData)
  });
}

export async function updateTask(id, updateData) {
  return request(`/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updateData)
  });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: 'DELETE'
  });
}
