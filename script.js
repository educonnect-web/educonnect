const loginSection = document.getElementById("login");
const appSection = document.getElementById("app");

let user = "";

/* ================= LOGIN ================= */
function login() {
  user = document.getElementById("username").value.trim();
  if (!user) return alert("Nama pengguna wajib diisi");

  localStorage.setItem("user", user);

  if (!localStorage.getItem("edu_" + user)) {
    localStorage.setItem(
      "edu_" + user,
      JSON.stringify({
        video: false,
        diskusi: false,
        proyek: false,
        score: 0
      })
    );
  }

  loginSection.style.display = "none";
  appSection.style.display = "flex";
  openPage("home");
}

function logout() {
  localStorage.clear();
  location.reload();
}

/* ================= DATA ================= */
function getData() {
  return JSON.parse(localStorage.getItem("edu_" + user));
}

function saveData(data) {
  localStorage.setItem("edu_" + user, JSON.stringify(data));
}

/* ================= NAVIGASI ================= */
function openPage(pageId) {
  document.querySelectorAll(".page").forEach(p =>
    p.classList.remove("active")
  );
  document.getElementById(pageId).classList.add("active");

  if (pageId === "progres") {
    updateProgressUI();
  }
}

/* ================= AKTIVITAS ================= */
function finishVideo() {
  const data = getData();
  if (!data.video) {
    data.video = true;
    data.score += 30;
    saveData(data);
  }
  alert("Materi microlearning telah diselesaikan");
}

function sendDiscussion() {
  const text = document.getElementById("diskusiText").value.trim();
  if (!text) return alert("Diskusi tidak boleh kosong");

  const data = getData();
  if (!data.diskusi) {
    data.diskusi = true;
    data.score += 30;
    saveData(data);
  }

  const li = document.createElement("li");
  li.textContent = text;
  document.getElementById("diskusiList").appendChild(li);
  document.getElementById("diskusiText").value = "";
}

function finishProject() {
  const data = getData();
  if (!data.proyek) {
    data.proyek = true;
    data.score += 40;
    saveData(data);
  }
  alert("Proyek berhasil dikumpulkan");
}

/* ================= PROGRES ================= */
function updateProgressUI() {
  const data = getData();

  document.getElementById("vStatus").textContent =
    data.video ? "Selesai" : "Belum";
  document.getElementById("dStatus").textContent =
    data.diskusi ? "Selesai" : "Belum";
  document.getElementById("pStatus").textContent =
    data.proyek ? "Selesai" : "Belum";

  document.getElementById("score").textContent = data.score;

  let completed = 0;
  if (data.video) completed++;
  if (data.diskusi) completed++;
  if (data.proyek) completed++;

  const percentage = (completed / 3) * 100;
  document.getElementById("progressFill").style.width = percentage + "%";
}
