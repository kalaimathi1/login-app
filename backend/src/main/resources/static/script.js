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
  const res = await fetch("/api/login", {
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

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  submitBtn.disabled = true;
  submitBtn.textContent = "Signing in...";

  try {
    const result = await login(email, password);
    alert(result.message || (result.success ? "Login successful!" : "Login failed."));
    if (result.success) form.reset();
  } catch (err) {
    alert(err?.message || "Login failed.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Sign in";
  }
});

emailInput.addEventListener("input", () => validate());
passwordInput.addEventListener("input", () => validate());

