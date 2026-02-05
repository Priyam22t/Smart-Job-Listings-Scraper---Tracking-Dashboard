let jobs = [];
let applied = JSON.parse(localStorage.getItem("applied") || "[]");
let ignored = JSON.parse(localStorage.getItem("ignored") || "[]");
let alerts = JSON.parse(localStorage.getItem("alerts") || "[]");
let lastVisit = localStorage.getItem("lastVisit") || 0;

fetch("jobs.json")
  .then(r => r.json())
  .then(data => {
    jobs = data.map(j => ({
      ...j,
      isNew: Date.now() > lastVisit
    }));
    localStorage.setItem("lastVisit", Date.now());
    render();
  });

const $ = id => document.getElementById(id);

["search", "source", "location"].forEach(id =>
  $(id).addEventListener("input", render)
);

/* ANALYTICS */
function renderAnalytics(list) {
  const total = list.length;
  const linkedin = list.filter(j => j.source === "LinkedIn").length;
  const indeed = list.filter(j => j.source === "Indeed").length;
  const remote = list.filter(j => j.location.toLowerCase().includes("remote")).length;

  $("analytics").innerHTML = `
    <div class="stat"><h3>${total}</h3><span>Total Jobs</span></div>
    <div class="stat"><h3>${linkedin}</h3><span>LinkedIn</span></div>
    <div class="stat"><h3>${indeed}</h3><span>Indeed</span></div>
    <div class="stat"><h3>${applied.length}</h3><span>Applied</span></div>
    <div class="stat"><h3>${remote}</h3><span>Remote</span></div>
  `;
}

/* MAIN RENDER */
function render() {
  const keyword = $("search").value.toLowerCase();
  const src = $("source").value;
  const loc = $("location").value.toLowerCase();

  let filtered = jobs.filter(j =>
    !ignored.includes(j.jobLink) &&
    j.jobTitle.toLowerCase().includes(keyword) &&
    (!src || j.source === src) &&
    (!loc || j.location.toLowerCase().includes(loc))
  );

  renderAnalytics(filtered);

  const container = $("jobs");
  container.innerHTML = "";

  filtered.forEach(job => {
    const card = document.createElement("div");
    card.className = "card";

    if (applied.includes(job.jobLink)) card.classList.add("applied");
    if (alerts.some(a => job.jobTitle.toLowerCase().includes(a)))
      card.classList.add("new");

   card.innerHTML = `
  <h3>${job.jobTitle}</h3>
  <p>${job.company}</p>
  <p>${job.location}</p>
  <strong>${job.source}</strong>

  <div class="actions">
    <a class="open" href="${job.jobLink}" target="_blank">Open Job</a>
    <button class="apply">Applied</button>
    <button class="ignore">Ignore</button>
  </div>
`;

    card.querySelector(".apply").onclick = () => {
      applied.push(job.jobLink);
      localStorage.setItem("applied", JSON.stringify(applied));
      render();
    };

    card.querySelector(".ignore").onclick = () => {
      ignored.push(job.jobLink);
      localStorage.setItem("ignored", JSON.stringify(ignored));
      render();
    };

    container.appendChild(card);
  });
}

/* ALERTS */
$("alertBtn").onclick = () => $("alertModal").classList.remove("hidden");
$("closeAlert").onclick = () => $("alertModal").classList.add("hidden");

$("saveAlert").onclick = () => {
  const val = $("alertInput").value.toLowerCase();
  if (val) alerts.push(val);
  localStorage.setItem("alerts", JSON.stringify(alerts));
  $("alertModal").classList.add("hidden");
  render();
};
