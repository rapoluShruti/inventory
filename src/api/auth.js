const API_BASE = "https://inventory-backend-oayq.onrender.com";

export const tokenUtils = {
  getToken: () => localStorage.getItem("token"),
  setToken: (token) => localStorage.setItem("token", token),
  removeToken: () => localStorage.removeItem("token"),
  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  setUser: (user) => localStorage.setItem("user", JSON.stringify(user)),
  clearUser: () => localStorage.removeItem("user"),
  isAuthenticated: () => !!localStorage.getItem("token"),
};

export const authAPI = {
  register: async (payload) => {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  login: async (payload) => {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  logout: async () => {
    tokenUtils.removeToken();
    tokenUtils.clearUser();
    return { success: true };
  },

  getMe: async () => {
    const token = tokenUtils.getToken();
    const res = await fetch(`${API_BASE}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  },

  updateShop: async (payload) => {
    const token = tokenUtils.getToken();
    const res = await fetch(`${API_BASE}/update-shop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
};
