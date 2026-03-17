const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const submitBtn = document.getElementById("submitBtn");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setError(el, message) {
  el.textContent = message || "";
}

function validate() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  let ok = true;

  if (!email) {
    setError(emailError, "Email is required.");
    ok = false;
  } else if (!emailRegex.test(email)) {
    setError(emailError, "Please enter a valid email address.");
    ok = false;
  } else {
    setError(emailError, "");
  }

  if (!password) {
    setError(passwordError, "Password is required.");
    ok = false;
  } else if (password.length < 6) {
    setError(passwordError, "Password must be at least 6 characters.");
    ok = false;
  } else {
    setError(passwordError, "");
  }

  return ok;
}

async function login(email, password) {
  const res = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = { success: false, message: "Invalid server response." };
  }

  if (!res.ok) {
    throw new Error(data?.message || "Login failed.");
  }

  return data;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!validate()) return;

  if (window.location.protocol === "file:") {
    alert(
      "You're opening this page as a file (file://).\n\n" +
        "Please serve the frontend and try again:\n" +
        "1) Open PowerShell in login-app\\frontend\n" +
        "2) Run: python -m http.server 5500\n" +
        "3) Open: http://localhost:5500\n\n" +
        "Also make sure the backend is running on http://localhost:8080."
    );
    return;
  }

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Signing in...";

  try {
    const result = await login(email, password);
    alert(result.message || (result.success ? "Login successful!" : "Login failed."));
    if (result.success) form.reset();
  } catch (err) {
    const msg = err?.message || "Login failed.";
    if (msg === "Failed to fetch") {
      alert(
        "Failed to fetch.\n\n" +
          "Most common reasons:\n" +
          "- Backend not running on http://localhost:8080\n" +
          "- Frontend not served over http://localhost (use python http.server)\n" +
          "- Port blocked by firewall\n\n" +
          "Tip: Test backend in PowerShell:\n" +
          'Invoke-RestMethod -Method Post -Uri \"http://localhost:8080/api/login\" -ContentType \"application/json\" -Body \"{`\"email`\":`\"a@b.com`\",`\"password`\":`\"secret1`\"}\"'
      );
    } else {
      alert(msg);
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign in";
  }
});

emailInput.addEventListener("input", () => validate());
passwordInput.addEventListener("input", () => validate());
