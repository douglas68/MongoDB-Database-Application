export const user = [
  { name: "Ashley D", email: "ashley@example.com" },
  { name: "Mika R",   email: "mika@example.com" }
];

export const goal = [
  { userEmail: "ashley@example.com", title: "Check in 4 days/week", targetPerWeek: 4, active: true },
  { userEmail: "mika@example.com",   title: "Daily mood log",       targetPerWeek: 7, active: true }
];

export const checkins = [
  { userEmail: "ashley@example.com", date: "2025-09-21", mood: 4, notes: "Long walk + water" },
  { userEmail: "mika@example.com",   date: "2025-09-22", mood: 3, notes: "Busy but okay" }
];

export const reflections = [
  { userEmail: "ashley@example.com", weekStartISO: "2025-09-15", text: "Better sleep this week; walking helped." },
  { userEmail: "mika@example.com",   weekStartISO: "2025-09-15", text: "Work stress eased by midweek. More water next week." }
];