let D = loadData();
let muted = true, obs;

const U = id => D.users.find(u => u.id == id);
const esc = s => String(s == null ? "" : s).replace(/[&<>"']/g, c =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const letter = u => esc(u.name.trim().charAt(0));
const av = (u, size, extra) =>
  `<div class="av c${u.color} ${extra || ""}" style="width:${size}px;height:${size}px;font-size:${size * 0.45}px">${letter(u)}</div>`;
const $ = id => document.getElementById(id);

function render() {
  $("logoText").textContent = D.appName;
  $("meAv").textContent = D.meLetter;

  $("stories").innerHTML =
    `<div class="st"><button class="av add">+</button>قصتك</div>` +
    D.stories.map(id => {
      const u = U(id); if (!u) return "";
      return `<div class="st">${av(u, 68, "ring")}${esc(u.name.split(" ")[0])}</div>`;
    }).join("");

  $("posts").innerHTML = D.posts.map(p => {
    const u = U(p.user); if (!u) return "";
    return `<div class="post">
      <div class="ph">${av(u, 48)}<div><b>${esc(u.name)}</b><small>${esc(p.time)}</small></div></div>
      <p>${esc(p.text)}</p>
      ${p.image ? `<img class="img" src="${esc(p.image)}">` : ""}
      <div class="pa"><span onclick="this.classList.toggle('on')">❤️ إعجاب</span><span>💬 تعليق</span><span>↗️ مشاركة</span></div>
    </div>`;
  }).join("");

  $("reqs").innerHTML = D.requests.length ? D.requests.map(id => {
    const u = U(id); if (!u) return "";
    return `<div class="row">${av(u, 78)}<div class="info"><b>${esc(u.name)}</b><small>${u.mutual} صديقاً مشتركاً</small>
      <div class="btns"><button class="btn ok" onclick="reqAct(${id})">تأكيد</button><button class="btn no" onclick="reqAct(${id})">حذف</button></div></div></div>`;
  }).join("") : `<small style="color:#6b7280">لا توجد طلبات</small>`;

  $("sugg").innerHTML = D.suggestions.map(id => {
    const u = U(id); if (!u) return "";
    return `<div class="row">${av(u, 56)}<div class="info"><b>${esc(u.name)}</b><small>${u.mutual} صديقاً مشتركاً</small></div>
      <button class="addb" onclick="this.textContent='تمت ✓'">إضافة</button></div>`;
  }).join("");

  const nt = n => {
    const u = U(n.user); if (!u) return "";
    return `<div class="nt ${n.isNew ? "new" : ""}">${av(u, 56)}<div class="t"><b>${esc(u.name)}</b> ${esc(n.text)}<small>${esc(n.time)}</small></div>${n.isNew ? '<div class="dot"></div>' : ""}</div>`;
  };
  $("ntNew").innerHTML = D.notifications.filter(n => n.isNew).map(nt).join("");
  $("ntOld").innerHTML = D.notifications.filter(n => !n.isNew).map(nt).join("");
  const c = D.notifications.filter(n => n.isNew).length;
  $("badge").textContent = c;
  $("badge").style.display = c ? "grid" : "none";

  renderReels();
}

function reqAct(id) {
  D.requests = D.requests.filter(x => x != id);
  saveData(D);
  render();
}

function go(id, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  $(id).classList.add("active");
  document.querySelectorAll("nav button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.body.classList.toggle("reels-on", id === "reels");
  window.scrollTo(0, 0);
  if (id === "reels") setTimeout(observeReels, 50);
}

function renderReels() {
  const list = D.reels || [];
  $("reelList").innerHTML = `<div class="rwrap" id="rwrap">` + (list.length
    ? list.map((r, i) => {
        const u = U(r.user) || { name: "مجهول", color: 3 };
        return `<div class="rl">
          ${r.video
            ? `<video src="${esc(r.video)}" loop playsinline muted preload="metadata" onclick="togglePlay(this)"></video>`
            : `<div class="rnov">لا يوجد فيديو</div>`}
          <div class="rinfo"><div class="ru">${av(u, 40)}<b>${esc(u.name)}</b></div><p>${esc(r.caption)}</p></div>
          <div class="rside">
            <button class="${r.liked ? "on" : ""}" onclick="likeReel(${i},this)">❤️<span>${r.likes || 0}</span></button>
            <button class="mbtn" onclick="toggleMute()">${muted ? "🔇" : "🔊"}</button>
            <button>↗️</button>
          </div>
        </div>`;
      }).join("")
    : `<div class="rnov">لا توجد ريلز</div>`) + `</div>`;
  observeReels();
}

function observeReels() {
  if (obs) obs.disconnect();
  const root = $("rwrap");
  if (!root) return;
  obs = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target.querySelector("video");
    if (!v) return;
    if (e.isIntersecting) { v.muted = muted; v.play().catch(() => {}); }
    else v.pause();
  }), { root, threshold: 0.6 });
  document.querySelectorAll(".rl").forEach(el => obs.observe(el));
}

function togglePlay(v) { v.paused ? v.play() : v.pause(); }

function toggleMute() {
  muted = !muted;
  document.querySelectorAll(".rl video").forEach(v => v.muted = muted);
  document.querySelectorAll(".mbtn").forEach(b => b.textContent = muted ? "🔇" : "🔊");
}

function likeReel(i, btn) {
  const r = D.reels[i];
  r.liked = !r.liked;
  r.likes = Math.max(0, (r.likes || 0) + (r.liked ? 1 : -1));
  saveData(D);
  btn.classList.toggle("on", r.liked);
  btn.querySelector("span").textContent = r.likes;
}

render();
