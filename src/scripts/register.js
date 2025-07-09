API_URL = "http://localhost:3000"

const form = document.getElementById('registerForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const username = formData.get("username").trim();
    const password = formData.get("password").trim();
    const confirmPassword = formData.get("confirmPassword").trim();

    if (!name || !email || !username || !password || !confirmPassword) {
        alert("All fields must be filled");
        return;
    }

    if (password != confirmPassword) {
        alert("Passwords do not match")
    }

    const newUser = { name, email, username, password };

    await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    });

    alert("User registered successfully!");
    form.reset();
    window.location.href = "../login/login.html";
});

