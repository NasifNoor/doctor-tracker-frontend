const API_URL = process.env.NEXT_PUBLIC_API_URL;

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const api = {
  login: (credentials) => {
    console.log("🚀 ~ credentials:", credentials);
    return request("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  logout: () =>
    request("/auth/logout", {
      method: "POST",
    }),
  getMe: () => request("/auth/me"),

  getDashboardStats: () => request("/dashboard/stats"),

  getDoctors: () => request("/doctors"),
  getDoctor: (id) => request(`/doctors/${id}`),

  updateDoctor: (id, doctor) =>
    request(`/doctors/${id}`, {
      method: "PUT",
      body: JSON.stringify(doctor),
    }),

  deleteDoctor: (id) =>
    request(`/doctors/${id}`, {
      method: "DELETE",
    }),

  createDoctor: (doctor) =>
    request("/doctors", {
      method: "POST",
      body: JSON.stringify(doctor),
    }),

  getPatients: (params = {}) => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.set(key, value);
      }
    });

    const query = searchParams.toString();

    return request(`/patients${query ? `?${query}` : ""}`);
  },
  getPatient: (id) => request(`/patients/${id}`),

  createPatient: (patient) =>
    request("/patients", {
      method: "POST",
      body: JSON.stringify(patient),
    }),

  updatePatient: (id, patient) =>
    request(`/patients/${id}`, {
      method: "PUT",
      body: JSON.stringify(patient),
    }),

  deletePatient: (id) =>
    request(`/patients/${id}`, {
      method: "DELETE",
    }),
};
