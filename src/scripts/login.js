import { goTo } from "./routes";

const API_URL = "http://localhost:3000";

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const username = formData.get("username").trim();
  const password = formData.get("password").trim();

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  try {
    // Buscar al usuario por nombre de usuario
    const response = await fetch(`${API_URL}/users?username=${username}`);
    const users = await response.json();

    if (users.length === 0) {
      alert("User not found.");
      return;
    }

    const user = users[0];

    // Validar contraseña
    if (user.password !== password) {
      alert("Incorrect password.");
      return;
    }

    // Guardar sesión en localStorage
    localStorage.setItem("loggedUser", JSON.stringify(user));

    alert(`Welcome, ${user.name}!`);
    window.location.origin
    goTo("dashboard")


  } catch (error) {
    console.error("Login error:", error);
    alert("Login failed. Try again.");
  }
});
