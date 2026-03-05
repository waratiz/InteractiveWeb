// TASK A2: Implement GET with fetch (Random User)
// Requirements:
// 1) Show status: "Loading..."

// 0) Access HTML elements (IDs required: btnLoad, status, result)
const loadUserBtn = document.getElementById("btnLoad");
const statusDiv = document.getElementById("status");
const resultDiv = document.getElementById("result");

// Must-have pattern: async/await, try/catch, res.ok, await res.json()

function setStatus(message) {
  statusDiv.value = message;
}

function renderUser(user) {
  resultDiv.innerHTML = `
    <div class="text-center">
      <img src="${user.picture.large}" class="mx-auto rounded-full" />
      <p class="text-xl font-bold">
        ${user.name.first} ${user.name.last}
      </p>
      <p>${user.email}</p>
    </div>
  `;
  resultDiv.classList.remove("hidden");
}

// 1) Add click event listener to Load user button
// Hint: loadUserBtn.addEventListener("click", async () => { ... });

loadUserBtn.addEventListener("click", async () => {

  // 2) UI state: show loading + disable button
  // TODO: statusDiv.textContent = "Loading...";
  setStatus("Loading...");
  loadUserBtn.classList.add("hidden");
  // TODO: loadUserBtn.disabled = true;
  loadUserBtn.disabled = true;

  // 3) Hide previous result (required)
  // TODO: resultDiv.classList.add("hidden");
  resultDiv.classList.add("hidden");
  // TODO: resultDiv.innerHTML = "";
  resultDiv.innerHTML = "";

  try {
    // 4) Fetch random user data
    // TODO: const res = await fetch("https://randomuser.me/api/");
    const res = await fetch("https://randomuser.me/api/");

    // 5) Check res.ok (HTTP errors do not throw automatically)
    // TODO: if (!res.ok) throw new Error(`HTTP ${res.status}`);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    // 6) Parse JSON
    // TODO: const data = await res.json();
    const data = await res.json();
    // TODO: const user = data.results[0];
    const user = data.results[0];

    // 7) Render name + email + avatar into resultDiv
    // TODO: resultDiv.innerHTML = `...`;
    renderUser(user);

    // 8) Show result area (remove "hidden")
    // (handled inside renderUser)

    // 9) Status success
    // TODO: statusDiv.textContent = "Loaded successfully.";
    setStatus("Loaded successfully.");
    loadUserBtn.classList.remove("hidden");
  } catch (err) {
    // 10) Status error
    // TODO: statusDiv.textContent = `Error: ${err.message}`;
    setStatus(`Error: ${err.message}`);
  } finally {
    // 11) Re-enable button (always)
    // TODO: loadUserBtn.disabled = false;
    loadUserBtn.disabled = false;
  }
});
