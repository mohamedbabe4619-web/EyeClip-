/* EyeClip - السكربتات (مجمّعة ومرتبة) */
function go(id, btn) {
  var pages = document.querySelectorAll(".page");
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove("active");
  document.getElementById(id).classList.add("active");
  var bs = document.querySelectorAll("nav button");
  for (var j = 0; j < bs.length; j++) bs[j].classList.remove("active");
  btn.classList.add("active");
  document.body.classList.toggle("reels-on", id === "reels");
  window.scrollTo(0, 0);
  var v = document.querySelector(".rl video");
  if (v) { if (id === "reels") { var pp = v.play(); if (pp && pp.catch) pp.catch(function () {}); } else { v.pause(); } }
}
function hideRow(id) { document.getElementById(id).style.display = "none"; }

var muted = true;
function togglePlay(v) { if (v.paused) v.play(); else v.pause(); }
function toggleMute() {
  muted = !muted;
  var vs = document.querySelectorAll(".rl video");
  for (var i = 0; i < vs.length; i++) vs[i].muted = muted;
  var mb = document.getElementById("mbtn"); if (mb) mb.textContent = muted ? "🔇" : "🔊";
}
function likeReel(btn) {
  var s = btn.querySelector("span");
  var on = btn.classList.toggle("on");
  s.textContent = on ? 1 : 0;
}

(function () {
  var svg = '<svg class="heart" viewBox="0 0 24 24"><path d="M12 21s-8-5.3-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.7-8 11-8 11z"/></svg>';

  // قلب الريلز
  document.querySelectorAll(".rside button").forEach(function (b) {
    if (b.textContent.indexOf("❤️") > -1) {
      var s = b.querySelector("span");
      b.innerHTML = svg;
      if (s) b.appendChild(s);
    }
  });

  // قلب المنشور
  document.querySelectorAll(".pa span").forEach(function (sp) {
    if (sp.textContent.indexOf("❤️") > -1) {
      sp.innerHTML = svg + " إعجاب";
    }
  });
})();

(function () {
  var ICON_SOUND = '<svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
  var ICON_MUTE  = '<svg viewBox="0 0 24 24"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>';
  var ICON_SHARE = '<svg viewBox="0 0 24 24"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v13"/></svg>';

  function paintMute() {
    var b = document.getElementById("mbtn");
    if (b) b.innerHTML = muted ? ICON_MUTE : ICON_SOUND;
  }

  // زر المشاركة
  document.querySelectorAll(".rside button").forEach(function (b) {
    if (b.textContent.indexOf("↗️") > -1) b.innerHTML = ICON_SHARE;
  });

  // زر الصوت: يتحدث الشكل عند كل ضغطة
  var old = window.toggleMute;
  window.toggleMute = function () { old(); paintMute(); };
  paintMute();
})();

(function () {
"use strict";
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function banner(m) { var e = $("#xerr"); if (!e) { e = document.createElement("div"); e.id = "xerr"; document.body.appendChild(e); } e.textContent = "خطأ: " + m; e.style.display = "block"; }
function safe(n, f) { try { f(); } catch (e) { banner(n + " - " + e.message); } }
function toast(m) { var t = document.createElement("div"); t.className = "xt"; t.textContent = m; document.body.appendChild(t); setTimeout(function () { t.remove(); }, 2200); }
function hs(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return Math.abs(h).toString(36); }
function ago(t) { var s = (Date.now() - t) / 1000; if (s < 60) return "الآن"; if (s < 3600) return "قبل " + Math.floor(s / 60) + " دقيقة"; if (s < 86400) return "قبل " + Math.floor(s / 3600) + " ساعة"; return "قبل " + Math.floor(s / 86400) + " يوم"; }

/* ===== الأيقونات ===== */
var P = {
  live: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M22 8l-6 4 6 4z"/>',
  img: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5L5 21"/>',
  feel: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>',
  share: '<path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M18 6L6 18M6 6l12 12"/>',
  send: '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
  heart: '<path d="M12 21s-8-5.3-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.7-8 11-8 11z"/>',
  sound: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/>',
  mute: '<path d="M11 5L6 9H3v6h3l5 4z"/><path d="M22 9l-6 6M16 9l6 6"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
  back: '<path d="M9 18l6-6-6-6"/>'
};
function ic(n, c) { return '<svg class="ic ' + (c || "") + '" viewBox="0 0 24 24">' + P[n] + '</svg>'; }

/* ===== التخزين ===== */
var KEY = "eyeclipX1", S = null;
try { S = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
var A = null;
try { A = JSON.parse(localStorage.getItem("eyeclipData_v2")); } catch (e) {}
S = S || {};
S.profile = S.profile || { name: "أنا", letter: (A && A.meLetter) || "m", photo: "" };
["posts", "stories", "reels", "rd", "ad"].forEach(function (k) { S[k] = S[k] || []; });
["comments", "chats", "likes", "rl"].forEach(function (k) { S[k] = S[k] || {}; });
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast("مساحة التخزين ممتلئة"); } }

function idb() { return new Promise(function (res, rej) { var r = indexedDB.open("eyeclipMedia", 1); r.onupgradeneeded = function () { r.result.createObjectStore("v"); }; r.onsuccess = function () { res(r.result); }; r.onerror = function () { rej(r.error); }; }); }
function putV(k, b) { return idb().then(function (db) { return new Promise(function (res, rej) { var t = db.transaction("v", "readwrite"); t.objectStore("v").put(b, k); t.oncomplete = function () { res(); }; t.onerror = function () { rej(t.error); }; }); }); }
function getV(k) { return idb().then(function (db) { return new Promise(function (res, rej) { var q = db.transaction("v").objectStore("v").get(k); q.onsuccess = function () { res(q.result); }; q.onerror = function () { rej(q.error); }; }); }); }
function delV(k) { return idb().then(function (db) { db.transaction("v", "readwrite").objectStore("v")["delete"](k); }); }

/* ===== البيانات (من لوحة التحكم إن وُجدت، وإلا الافتراضية) ===== */
var USERS = (A && A.users && A.users.length) ? A.users : [
  { id: 1, name: "يوسف العتيبي", color: 1, mutual: 12 }, { id: 2, name: "سارة النجار", color: 2, mutual: 5 },
  { id: 3, name: "علي الحربي", color: 3, mutual: 21 }, { id: 4, name: "مريم القحطاني", color: 4, mutual: 8 },
  { id: 5, name: "نور العلي", color: 5, mutual: 3 }, { id: 6, name: "لينا الشمري", color: 6, mutual: 0 }];
var D = {
  posts: A ? (A.posts || []) : [{ user: 6, time: "قبل ١٠ دقائق · الرياض", text: "يوم هادئ في الاستوديو ✨ خلّصنا مشروع جديد وقلبي مليان امتنان.", image: "photo.jpg" }],
  requests: A ? (A.requests || []) : [1, 2],
  sugg: A ? (A.suggestions || []) : [3, 4, 5],
  stories: A ? (A.stories || []) : [2, 1, 6, 4],
  notifs: A ? (A.notifications || []) : [
    { user: 3, text: "أعجب بمنشورك", time: "قبل ٥ دقائق", isNew: true },
    { user: 2, text: "علّقت: «لقطة رائعة!»", time: "قبل ٢٠ دقيقة", isNew: true },
    { user: 4, text: "أرسلت لك طلب صداقة", time: "قبل ساعة", isNew: true },
    { user: 5, text: "نشرت ريلز جديد", time: "أمس", isNew: false },
    { user: 1, text: "شارك منشورك", time: "أمس", isNew: false }],
  reels: A ? (A.reels || []) : [{ user: 5, caption: "أول ريلز لي 🌸", video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" }]
};
var DUM = { 1: 12, 2: 5, 3: 21, 4: 8, 5: 3, 6: 0 };
var GR = { 1: "#14b8a6,#0e6b73", 2: "#d46aae,#7d3d6a", 3: "#5a7fd6,#2a3f8f", 4: "#d49a1a,#7a5206", 5: "#4caf70,#1f6b3a", 6: "#e07a66,#a2412f" };
function U(id) { for (var i = 0; i < USERS.length; i++) if (USERS[i].id == id) return USERS[i]; return null; }
function mut(u) { return u.mutual != null ? u.mutual : (DUM[u.id] || 0); }
function me() { return { id: "me", name: S.profile.name, color: 3, photo: S.profile.photo, letter: S.profile.letter }; }
function av(u, sz, extra) {
  var st = "width:" + sz + "px;height:" + sz + "px;font-size:" + Math.round(sz * .45) + "px";
  var tx = esc(u.letter || String(u.name || "؟").trim().charAt(0));
  if (u.photo) { st += ";background:url('" + u.photo + "') center/cover"; tx = ""; }
  return '<div class="av c' + (u.color || 3) + ' ' + (extra || "") + '" style="' + st + '">' + tx + '</div>';
}

/* ===== أدوات الواجهة ===== */
function sheet(title, body, full) {
  var old = $(".xs"); if (old) old.remove();
  var o = document.createElement("div"); o.className = "xs";
  o.innerHTML = '<div class="xs-bg"></div><div class="xs-box' + (full ? ' full' : '') + '"><div class="xs-h"><b>' + title + '</b><button class="xs-x">' + ic("close") + '</button></div><div class="xs-b">' + body + '</div></div>';
  document.body.appendChild(o);
  o.close = function () { o.remove(); };
  $(".xs-bg", o).onclick = o.close; $(".xs-x", o).onclick = o.close;
  return o;
}
function pick(accept, cb) { var i = document.createElement("input"); i.type = "file"; i.accept = accept; i.onchange = function () { if (i.files[0]) cb(i.files[0]); }; i.click(); }
function readImg(file, max, cb) {
  var fr = new FileReader();
  fr.onload = function () {
    var im = new Image();
    im.onload = function () {
      var s = Math.min(1, max / Math.max(im.width, im.height)), c = document.createElement("canvas");
      c.width = Math.round(im.width * s); c.height = Math.round(im.height * s);
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      cb(c.toDataURL("image/jpeg", .75));
    };
    im.src = fr.result;
  };
  fr.readAsDataURL(file);
}
function share(txt) {
  var d = { title: "EyeClip", text: txt || "EyeClip", url: location.href };
  if (navigator.share) navigator.share(d)["catch"](function () {});
  else if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { toast("تم نسخ الرابط"); }, function () { toast("تعذر النسخ"); });
  else toast("المشاركة غير مدعومة");
}

/* ===== المنشورات ===== */
function postList() {
  var mine = S.posts.map(function (p) { return { id: p.id, mine: true, time: ago(p.t) + (p.feel ? " · يشعر بـ " + p.feel : ""), text: p.text, img: p.img }; });
  var base = D.posts.map(function (p) { return { id: "s" + hs(String(p.user) + String(p.text)), user: p.user, time: p.time, text: p.text, img: p.image }; });
  return mine.concat(base);
}
function postHTML(p) {
  var u = p.mine ? me() : U(p.user); if (!u) return "";
  var nc = (S.comments[p.id] || []).length;
  return '<div class="post" data-pid="' + p.id + '"><div class="ph">' + av(u, 48) + '<div style="flex:1"><b>' + esc(u.name) + '</b><small>' + esc(p.time) + '</small></div>' +
    (p.mine ? '<button class="xdel" data-a="del">' + ic("trash") + '</button>' : '') + '</div>' +
    (p.text ? '<p>' + esc(p.text) + '</p>' : '') +
    (p.img ? '<img class="img" src="' + esc(p.img) + '" alt="" onerror="this.style.display=\'none\'">' : '') +
    '<div class="pa"><span data-a="lk" class="' + (S.likes[p.id] ? 'on' : '') + '">' + ic("heart", "heart") + ' إعجاب</span>' +
    '<span data-a="cm">' + ic("chat") + ' تعليق <i data-cc="' + p.id + '">' + (nc || "") + '</i></span>' +
    '<span data-a="sh">' + ic("share") + ' مشاركة</span></div></div>';
}
function renderPosts() { $("#xposts").innerHTML = postList().map(postHTML).join("") || '<div class="xempty">لا توجد منشورات</div>'; }
function cnt(key) {
  var n = (S.comments[key] || []).length;
  $$('[data-cc="' + key + '"]').forEach(function (el) { el.textContent = el.tagName === "I" ? (n || "") : n; });
}

/* ===== القصص ===== */
function renderStories() {
  var now = Date.now();
  S.stories = S.stories.filter(function (s) { return now - s.t < 864e5; });
  var h = '<div class="st" data-a="addst"><button class="av add s68">' + ic("plus") + '</button>قصتك</div>';
  if (S.stories.length) h += '<div class="st" data-a="mine">' + av(me(), 68, "ring") + 'أنا</div>';
  D.stories.forEach(function (id) { var u = U(id); if (u) h += '<div class="st" data-a="st" data-u="' + id + '">' + av(u, 68, "ring") + esc(String(u.name).split(" ")[0]) + '</div>'; });
  $(".stories").innerHTML = h;
}
function viewStory(items) {
  if (!items.length) return;
  var i = 0, tm, o = document.createElement("div"); o.className = "xv"; document.body.appendChild(o);
  function show() {
    clearTimeout(tm);
    if (i >= items.length) { o.remove(); return; }
    var it = items[i];
    o.innerHTML = '<div class="xv-bars">' + items.map(function (_, k) { return '<i class="' + (k < i ? 'd' : k === i ? 'a' : '') + '"></i>'; }).join("") + '</div>' +
      '<div class="xv-top">' + it.av + '<b>' + esc(it.name) + '</b><button class="xv-x">' + ic("close") + '</button></div>' +
      '<div class="xv-bg" style="' + it.bg + '"></div><div class="xv-t">' + esc(it.text || "") + '</div>';
    $(".xv-x", o).onclick = function (e) { e.stopPropagation(); clearTimeout(tm); o.remove(); };
    tm = setTimeout(function () { i++; show(); }, 5000);
  }
  o.onclick = function () { i++; show(); };
  show();
}
function openAddStory() {
  var img = "";
  var o = sheet("قصة جديدة", '<textarea id="xst" rows="3" placeholder="اكتب نصاً للقصة (اختياري)"></textarea><div id="xpv"></div><button class="xb2" id="xsi">' + ic("img") + ' إضافة صورة</button><button class="xgo" id="xsp">نشر القصة</button>');
  $("#xsi", o).onclick = function () { pick("image/*", function (f) { readImg(f, 900, function (d) { img = d; $("#xpv", o).innerHTML = '<img src="' + d + '">'; }); }); };
  $("#xsp", o).onclick = function () {
    var t = $("#xst", o).value.trim();
    if (!t && !img) return toast("أضف نصاً أو صورة");
    S.stories.push({ img: img, text: t, t: Date.now() }); save(); o.close(); renderStories(); toast("تم نشر القصة");
  };
}

/* ===== الأصدقاء والإشعارات ===== */
function renderFriends() {
  var rq = D.requests.filter(function (id) { return S.rd.indexOf(String(id)) < 0 && U(id); });
  var h1 = rq.length ? rq.map(function (id) {
    var u = U(id);
    return '<div class="row">' + av(u, 78) + '<div class="info"><b>' + esc(u.name) + '</b><small>' + mut(u) + ' صديقاً مشتركاً</small><div class="btns"><button class="btn ok" data-a="rq" data-id="' + id + '">تأكيد</button><button class="btn no" data-a="rq" data-id="' + id + '">حذف</button></div></div></div>';
  }).join("") : '<small style="color:#6b7280">لا توجد طلبات</small>';
  var h2 = D.sugg.filter(function (id) { return U(id); }).map(function (id) {
    var u = U(id), done = S.ad.indexOf(String(id)) > -1;
    return '<div class="row">' + av(u, 56) + '<div class="info"><b>' + esc(u.name) + '</b><small>' + mut(u) + ' صديقاً مشتركاً</small></div><button class="addb" data-a="ad" data-id="' + id + '">' + (done ? "تمت ✓" : "إضافة") + '</button></div>';
  }).join("");
  var hd = $("#friends header").outerHTML;
  $("#friends").innerHTML = hd + '<div class="box"><h2>طلبات الصداقة</h2>' + h1 + '</div><div class="box"><h2>قد تعرفهم</h2>' + h2 + '</div>';
}
function renderNotifs() {
  function nt(n) {
    var u = U(n.user); if (!u) return "";
    return '<div class="nt ' + (n.isNew ? "new" : "") + '">' + av(u, 56) + '<div class="t"><b>' + esc(u.name) + '</b> ' + esc(n.text) + '<small>' + esc(n.time) + '</small></div>' + (n.isNew ? '<div class="dot"></div>' : '') + '</div>';
  }
  var nw = D.notifs.filter(function (n) { return n.isNew; }), od = D.notifs.filter(function (n) { return !n.isNew; });
  var hd = $("#notifs header").outerHTML;
  $("#notifs").innerHTML = hd + '<div style="padding:8px 10px"><div class="sec">اليوم</div>' + nw.map(nt).join("") + '<div class="sec" style="margin-top:16px">سابقاً</div>' + od.map(nt).join("") + '</div>';
  var b = $(".badge"); if (b) { b.textContent = nw.length; b.style.display = nw.length ? "grid" : "none"; }
}

/* ===== الريلز ===== */
var xm = true;
function reelHTML(r) {
  var u = r.mine ? me() : (U(r.user) || { name: "مجهول", color: 3 });
  var st = S.rl[r.id] || { n: 0, on: false };
  return '<div class="rl" data-rid="' + r.id + '"><video loop playsinline muted preload="metadata"' + (r.video ? ' src="' + esc(r.video) + '"' : '') + '></video>' +
    '<div class="rinfo"><div class="ru">' + av(u, 40) + '<b>' + esc(u.name) + '</b></div><p>' + esc(r.caption) + '</p></div>' +
    '<div class="rside"><button class="' + (st.on ? 'on' : '') + '" data-a="rlk">' + ic("heart", "heart") + '<span>' + st.n + '</span></button>' +
    '<button data-a="rcm">' + ic("chat") + '<span data-cc="' + r.id + '">' + (S.comments[r.id] || []).length + '</span></button>' +
    '<button data-a="rmu">' + ic(xm ? "mute" : "sound") + '</button><button data-a="rsh">' + ic("share") + '</button>' +
    (r.mine ? '<button data-a="rdel">' + ic("trash") + '</button>' : '') + '</div></div>';
}
function renderReels() {
  var w = $("#rwrap");
  var list = S.reels.map(function (r) { return { id: r.id, mine: true, caption: r.caption }; })
    .concat(D.reels.map(function (r) { return { id: "s" + hs(String(r.user) + String(r.video)), user: r.user, caption: r.caption, video: r.video }; }));
  w.innerHTML = list.map(reelHTML).join("") || '<div style="height:100%;display:grid;place-items:center;color:#fff">لا توجد ريلز</div>';
  S.reels.forEach(function (r) {
    getV(r.id).then(function (b) {
      var v = $('.rl[data-rid="' + r.id + '"] video');
      if (v && b) { v.src = URL.createObjectURL(b); updateReels(); }
    })["catch"](function () {});
  });
  updateReels();
}
function updateReels() {
  var w = $("#rwrap"); if (!w) return;
  var on = $("#reels").classList.contains("active"), wr = w.getBoundingClientRect();
  $$(".rl", w).forEach(function (r) {
    var v = $("video", r); if (!v) return;
    var vis = on && Math.abs(r.getBoundingClientRect().top - wr.top) < wr.height * .4;
    if (vis) { v.muted = xm; var p = v.play(); if (p && p["catch"]) p["catch"](function () {}); } else v.pause();
  });
}
function openReelUp() {
  var file = null;
  var o = sheet("ريلز جديد", '<button class="xb2" id="xvf">' + ic("live") + ' اختر فيديو</button><div id="xvn" class="xempty"></div><input id="xvc" placeholder="الوصف"><button class="xgo" id="xvp">نشر</button>');
  $("#xvf", o).onclick = function () { pick("video/*", function (f) { file = f; $("#xvn", o).textContent = f.name; }); };
  $("#xvp", o).onclick = function () {
    if (!file) return toast("اختر فيديو أولاً");
    var id = "r" + Date.now(), cap = $("#xvc", o).value.trim();
    putV(id, file).then(function () { S.reels.unshift({ id: id, caption: cap, t: Date.now() }); save(); o.close(); renderReels(); toast("تم نشر الريلز"); })["catch"](function () { toast("تعذر حفظ الفيديو"); });
  };
}

/* ===== التعليقات ===== */
function openComments(key) {
  var o = sheet("التعليقات", '<div class="cmil"></div><div class="xin"><input id="xci" placeholder="اكتب تعليقاً..."><button id="xcs">' + ic("send") + '</button></div>');
  function draw() {
    var l = S.comments[key] || [];
    $(".cmil", o).innerHTML = l.length ? l.map(function (c) { return '<div class="cmi"><b>' + esc(c.n) + '</b><p>' + esc(c.t) + '</p><small>' + ago(c.d) + '</small></div>'; }).join("") : '<div class="xempty">كن أول من يعلّق</div>';
  }
  function send() {
    var i = $("#xci", o), v = i.value.trim(); if (!v) return;
    (S.comments[key] = S.comments[key] || []).push({ n: S.profile.name, t: v, d: Date.now() });
    save(); i.value = ""; draw(); cnt(key); var l = $(".cmil", o); l.scrollTop = l.scrollHeight;
  }
  draw();
  $("#xcs", o).onclick = send;
  $("#xci", o).onkeydown = function (e) { if (e.key === "Enter") send(); };
}

/* ===== النشر والملف الشخصي ===== */
function openComposer(startPick) {
  var img = "", feel = "";
  var o = sheet("منشور جديد", '<textarea id="xt" rows="4" placeholder="بماذا تفكر؟"></textarea><div id="xpv"></div><button class="xb2" id="xpi">' + ic("img") + ' صورة</button>' +
    '<div class="xchips">' + ["سعيد", "متحمس", "ممتن", "محتفل", "متعب"].map(function (f) { return '<span data-f="' + f + '">' + f + '</span>'; }).join("") + '</div><button class="xgo" id="xpub">نشر</button>');
  $("#xpi", o).onclick = function () { pick("image/*", function (f) { readImg(f, 1000, function (d) { img = d; $("#xpv", o).innerHTML = '<img src="' + d + '">'; }); }); };
  $$(".xchips span", o).forEach(function (s) {
    s.onclick = function () {
      var was = s.classList.contains("on");
      $$(".xchips span", o).forEach(function (x) { x.classList.remove("on"); });
      feel = was ? "" : s.getAttribute("data-f"); if (!was) s.classList.add("on");
    };
  });
  $("#xpub", o).onclick = function () {
    var t = $("#xt", o).value.trim();
    if (!t && !img) return toast("اكتب شيئاً أو أضف صورة");
    S.posts.unshift({ id: "u" + Date.now(), text: t, img: img, feel: feel, t: Date.now() });
    save(); o.close(); renderPosts(); toast("تم النشر");
  };
  if (startPick) $("#xpi", o).click();
}
function applyProfile() {
  var a = $(".compose .av"); if (!a) return;
  if (S.profile.photo) { a.style.background = "url('" + S.profile.photo + "') center/cover"; a.textContent = ""; }
  else { a.style.background = ""; a.textContent = S.profile.letter; }
}
function openProfile() {
  var photo = S.profile.photo;
  var o = sheet("ملفي الشخصي", '<div style="text-align:center"><div id="xpa" style="display:flex;justify-content:center">' + av(me(), 90) + '</div><button class="xb2" id="xpp">تغيير الصورة</button></div>' +
    '<label>الاسم</label><input id="xn" value="' + esc(S.profile.name) + '"><label>حرف الصورة (إن لم توجد صورة)</label><input id="xl" maxlength="2" value="' + esc(S.profile.letter) + '"><button class="xgo" id="xps">حفظ</button>');
  $("#xpp", o).onclick = function () {
    pick("image/*", function (f) { readImg(f, 300, function (d) { photo = d; $("#xpa", o).innerHTML = av({ name: "", color: 3, photo: d }, 90); }); });
  };
  $("#xps", o).onclick = function () {
    S.profile = { name: $("#xn", o).value.trim() || "أنا", letter: $("#xl", o).value.trim() || "m", photo: photo };
    save(); applyProfile(); renderPosts(); renderStories(); o.close(); toast("تم الحفظ");
  };
}

/* ===== البحث والرسائل ===== */
function openSearch() {
  var o = sheet("بحث", '<input id="xs" placeholder="ابحث عن أشخاص أو منشورات..."><div id="xsr"></div>');
  var inp = $("#xs", o);
  inp.oninput = function () {
    var q = inp.value.trim().toLowerCase(), out = "";
    if (q) {
      USERS.forEach(function (u) { if (String(u.name).toLowerCase().indexOf(q) > -1) out += '<div class="cr" data-su="' + u.id + '">' + av(u, 44) + '<div><b>' + esc(u.name) + '</b><small>إرسال رسالة</small></div></div>'; });
      postList().forEach(function (p) { if (p.text && p.text.toLowerCase().indexOf(q) > -1) out += '<div class="cr" data-sp="' + p.id + '">' + ic("chat") + '<div><b>منشور</b><small>' + esc(p.text.slice(0, 50)) + '</small></div></div>'; });
      if (!out) out = '<div class="xempty">لا نتائج</div>';
    }
    $("#xsr", o).innerHTML = out;
  };
  o.addEventListener("click", function (e) {
    var r = e.target.closest(".cr"); if (!r) return;
    if (r.getAttribute("data-su")) { var id = r.getAttribute("data-su"); o.close(); openChats(id); }
    else if (r.getAttribute("data-sp")) {
      var pid = r.getAttribute("data-sp"); o.close();
      window.go("home", $$("nav button")[0]);
      setTimeout(function () { var el = $('.post[data-pid="' + pid + '"]'); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }, 250);
    }
  });
}
function openChats(uid) {
  var o = sheet("الرسائل", "", true);
  function list() {
    $(".xs-h b", o).textContent = "الرسائل";
    $(".xs-b", o).innerHTML = USERS.map(function (u) {
      var m = S.chats[u.id] || [], last = m.length ? m[m.length - 1].t : "ابدأ المحادثة";
      return '<div class="cr" data-u="' + u.id + '">' + av(u, 48) + '<div><b>' + esc(u.name) + '</b><small>' + esc(last.slice(0, 40)) + '</small></div></div>';
    }).join("");
  }
  function thread(id) {
    var u = U(id); if (!u) return list();
    $(".xs-h b", o).textContent = u.name;
    $(".xs-b", o).innerHTML = '<button class="xb2" id="xbk">' + ic("back") + ' رجوع</button><div class="msgs"></div><div class="xin"><input id="xmi" placeholder="اكتب رسالة..."><button id="xms">' + ic("send") + '</button></div>';
    function draw() {
      var m = S.chats[id] || [], l = $(".msgs", o);
      l.innerHTML = m.length ? m.map(function (x) { return '<div class="mg ' + (x.me ? 'me' : '') + '">' + esc(x.t) + '</div>'; }).join("") : '<div class="xempty">لا رسائل بعد</div>';
      l.scrollTop = l.scrollHeight;
    }
    function send() {
      var i = $("#xmi", o), v = i.value.trim(); if (!v) return;
      (S.chats[id] = S.chats[id] || []).push({ me: true, t: v, d: Date.now() }); save(); i.value = ""; draw();
    }
    $("#xbk", o).onclick = list; $("#xms", o).onclick = send;
    $("#xmi", o).onkeydown = function (e) { if (e.key === "Enter") send(); };
    draw();
  }
  o.addEventListener("click", function (e) { var r = e.target.closest(".cr[data-u]"); if (r) thread(r.getAttribute("data-u")); });
  if (uid) thread(uid); else list();
}

/* ===== معالج النقرات العام ===== */
document.addEventListener("click", function (e) {
  var tg = e.target;
  if (tg.tagName === "VIDEO") { if (tg.paused) tg.play(); else tg.pause(); return; }
  var c = tg.closest(".circle");
  if (c) { if (c.getAttribute("data-m")) openChats(); else openSearch(); return; }
  if (tg.closest(".compose .av")) { openProfile(); return; }
  if (tg.closest(".compose input")) { openComposer(); return; }
  var t = tg.closest("[data-a]"); if (!t) return;
  var a = t.getAttribute("data-a"), po = t.closest(".post"), rl = t.closest(".rl");
  var pid = po && po.getAttribute("data-pid"), rid = rl && rl.getAttribute("data-rid");
  switch (a) {
    case "live": toast("البث المباشر يحتاج خادماً — قريباً"); break;
    case "pimg": openComposer(true); break;
    case "feel": openComposer(); break;
    case "lk": t.classList.toggle("on"); S.likes[pid] = t.classList.contains("on"); save(); break;
    case "cm": openComments(pid); break;
    case "sh": share(); break;
    case "del":
      if (confirm("حذف المنشور؟")) { S.posts = S.posts.filter(function (p) { return p.id !== pid; }); save(); renderPosts(); }
      break;
    case "addst": openAddStory(); break;
    case "mine":
      viewStory(S.stories.map(function (s) {
        return { name: S.profile.name, av: av(me(), 36), bg: s.img ? "background:url('" + s.img + "') center/cover" : "background:linear-gradient(160deg," + GR[3] + ")", text: s.text };
      }));
      break;
    case "st":
      var u = U(t.getAttribute("data-u"));
      if (u) viewStory([{ name: u.name, av: av(u, 36), bg: "background:linear-gradient(160deg," + (GR[u.color] || GR[3]) + ")", text: u.name }]);
      break;
    case "rq": S.rd.push(String(t.getAttribute("data-id"))); save(); renderFriends(); toast("تم"); break;
    case "ad":
      var id = String(t.getAttribute("data-id"));
      if (S.ad.indexOf(id) < 0) S.ad.push(id); save(); t.textContent = "تمت ✓";
      break;
    case "rup": openReelUp(); break;
    case "rlk":
      var s = S.rl[rid] || (S.rl[rid] = { n: 0, on: false });
      s.on = !s.on; s.n = Math.max(0, s.n + (s.on ? 1 : -1));
      t.classList.toggle("on", s.on); t.querySelector("span").textContent = s.n; save();
      break;
    case "rcm": openComments(rid); break;
    case "rmu":
      xm = !xm;
      $$("#rwrap video").forEach(function (v) { v.muted = xm; });
      $$('[data-a="rmu"]').forEach(function (b) { b.innerHTML = ic(xm ? "mute" : "sound"); });
      break;
    case "rsh": share(); break;
    case "rdel":
      if (confirm("حذف الريلز؟")) { S.reels = S.reels.filter(function (r) { return r.id !== rid; }); save(); delV(rid); renderReels(); }
      break;
  }
});

/* ===== التهيئة ===== */
safe("setup", function () {
  if (A && A.appName) { var lg = $(".logo"); if (lg && lg.firstChild && lg.firstChild.nodeType === 3) lg.firstChild.nodeValue = A.appName + " "; }
  $$("#home .post").forEach(function (p) { p.remove(); });
  if (!$("#xposts")) { var px = document.createElement("div"); px.id = "xposts"; $(".stories").insertAdjacentElement("afterend", px); }
  var inp = $(".compose input"); if (inp) inp.setAttribute("readonly", "readonly");
  var spec = [["live", "بث مباشر", "#e11d48", "live"], ["img", "صورة", "#16a34a", "pimg"], ["feel", "شعور", "#2b6be6", "feel"]];
  $$(".acts span").forEach(function (s, i) { if (spec[i]) { s.innerHTML = ic(spec[i][0]) + " " + spec[i][1]; s.style.color = spec[i][2]; s.setAttribute("data-a", spec[i][3]); } });
  var lo = $$("#home .circle")[1]; if (lo) { lo.setAttribute("data-m", "1"); lo.innerHTML = ic("chat"); }
  if (!$(".xup")) { var up = document.createElement("button"); up.className = "xup"; up.setAttribute("data-a", "rup"); up.innerHTML = ic("plus"); $("#reels").appendChild(up); }
  var oldGo = window.go;
  window.go = function (id, b) { if (oldGo) oldGo(id, b); setTimeout(updateReels, 150); };
  var tmo; $("#rwrap").addEventListener("scroll", function () { clearTimeout(tmo); tmo = setTimeout(updateReels, 120); });
});
safe("profile", applyProfile);
safe("posts", renderPosts);
safe("stories", renderStories);
safe("friends", renderFriends);
safe("notifs", renderNotifs);
safe("reels", renderReels);
})();

(function () {
  try {
    var KEY = "eyeclipX1";
    function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
    function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

    // الصفحة
    var pg = document.createElement("div");
    pg.className = "page"; pg.id = "profile";
    document.body.insertBefore(pg, document.querySelector("nav"));

    function draw() {
      var S = load(), p = S.profile || { name: "أنا", letter: "m", photo: "" };
      var posts = (S.posts || []).length, stories = (S.stories || []).length, reels = (S.reels || []).length;
      var st = "width:96px;height:96px;font-size:42px;margin:0 auto";
      var tx = esc(p.letter || "m");
      if (p.photo) { st += ";background:url('" + p.photo + "') center/cover"; tx = ""; }
      pg.innerHTML =
        '<header><h1>حسابي</h1></header>' +
        '<div class="pf-head"><div class="av c3" style="' + st + '">' + tx + '</div>' +
        '<div class="pf-name">' + esc(p.name) + '</div><div class="pf-sub">عضو في EyeClip</div>' +
        '<div class="pf-btns"><button id="pfEdit">تعديل الملف</button><button class="g" id="pfMsg">الرسائل</button></div></div>' +
        '<div class="pf-stats"><div><b>' + posts + '</b><small>منشورات</small></div><div><b>' + reels + '</b><small>ريلز</small></div><div><b>' + stories + '</b><small>قصص</small></div></div>' +
        '<div class="box"><h2>منشوراتي</h2><div id="pfPosts"></div></div>';

      var list = (S.posts || []);
      document.getElementById("pfPosts").innerHTML = list.length ? list.map(function (x) {
        return '<div style="padding:10px 0;border-top:1px solid #eee">' +
          (x.text ? '<p style="margin-bottom:6px">' + esc(x.text) + '</p>' : '') +
          (x.img ? '<img src="' + x.img + '" style="width:100%;max-height:260px;object-fit:cover;border-radius:12px">' : '') + '</div>';
      }).join("") : '<small style="color:#6b7280">لم تنشر شيئاً بعد</small>';

      document.getElementById("pfEdit").onclick = function () {
        var a = document.querySelector(".compose .av"); if (a) a.click();
      };
      document.getElementById("pfMsg").onclick = function () {
        var m = document.querySelector("#home .circle[data-m]"); if (m) m.click();
      };
    }

    // الزر في الشريط السفلي
    var nav = document.querySelector("nav");
    var btn = document.createElement("button");
    btn.innerHTML = '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>حسابي';
    nav.appendChild(btn);

    btn.addEventListener("click", function () {
      draw();
      document.querySelectorAll(".page").forEach(function (p) { p.classList.remove("active"); });
      pg.classList.add("active");
      document.querySelectorAll("nav button").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      document.body.classList.remove("reels-on");
      window.scrollTo(0, 0);
      document.querySelectorAll("video").forEach(function (v) { v.pause(); });
    });

    // عند الضغط على الأزرار الأخرى، تُخفى صفحة الحساب تلقائياً
    document.querySelectorAll("nav button").forEach(function (b) {
      if (b !== btn) b.addEventListener("click", function () { pg.classList.remove("active"); btn.classList.remove("active"); });
    });
  } catch (e) {
    var d = document.createElement("div");
    d.style.cssText = "position:fixed;top:0;left:0;right:0;background:#b91c1c;color:#fff;padding:8px;font-size:12px;z-index:99";
    d.textContent = "خطأ الحساب: " + e.message; document.body.appendChild(d);
  }
})();


/* =====================================================
   إضافات السلوك
   ===================================================== */

/* ===== حذف القصة (🗑 شفاف داخل عارض القصص) ===== */
(function () {
  var KEY = "eyeclipX1";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  setInterval(function () {
    var v = document.querySelector(".xv");
    var old = document.getElementById("delStoryBtn");
    if (!v) { if (old) old.remove(); return; }
    if (old) return;

    var S = load();
    var myName = (S.profile && S.profile.name) || "أنا";
    var nameEl = v.querySelector(".xv-top b");
    if (!nameEl || nameEl.textContent.trim() !== myName) return;

    var b = document.createElement("button");
    b.id = "delStoryBtn";
    b.innerHTML = '<svg viewBox="0 0 24 24" style="width:22px;height:22px;fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"><path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/></svg>';
    b.style.cssText =
      "position:fixed;top:24px;left:60px;z-index:2147483647;width:36px;height:36px;" +
      "border:0;border-radius:50%;background:transparent;display:grid;place-items:center;";
    b.onclick = function (e) {
      e.stopPropagation();
      if (!confirm("حذف هذه القصة؟")) return;
      var bars = v.querySelectorAll(".xv-bars i");
      var idx = 0;
      for (var i = 0; i < bars.length; i++) {
        if (bars[i].classList.contains("a")) { idx = i; break; }
      }
      var d = load();
      if (d.stories && d.stories.length > idx) {
        d.stories.splice(idx, 1);
        localStorage.setItem(KEY, JSON.stringify(d));
      }
      location.reload();
    };
    v.appendChild(b);
  }, 300);
})();

/* ===== الريلز: الصوت تلقائي بعد أول لمسة ===== */
(function () {
  var unlocked = false;
  function wrap() { return document.getElementById("rwrap"); }
  function visibleVideo() {
    var w = wrap();
    if (!w) return null;
    var wr = w.getBoundingClientRect(), best = null, bd = 1e9;
    w.querySelectorAll(".rl").forEach(function (r) {
      var d = Math.abs(r.getBoundingClientRect().top - wr.top);
      if (d < bd) { bd = d; best = r; }
    });
    return best ? best.querySelector("video") : null;
  }
  function sync() {
    var page = document.getElementById("reels");
    var on = page && page.classList.contains("active");
    var cur = visibleVideo();
    document.querySelectorAll("#rwrap video").forEach(function (v) {
      if (on && v === cur) {
        v.muted = !unlocked;
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      } else {
        v.pause();
      }
    });
  }
  document.addEventListener("touchstart", function () {
    if (!unlocked) { unlocked = true; sync(); }
  }, { passive: true });
  document.addEventListener("click", function () {
    if (!unlocked) { unlocked = true; sync(); }
  }, true);
  var tmo;
  document.addEventListener("scroll", function () {
    clearTimeout(tmo); tmo = setTimeout(sync, 120);
  }, true);
  var nav = document.querySelector("nav");
  if (nav) nav.addEventListener("click", function () { setTimeout(sync, 250); });
  setInterval(function () {
    if (!unlocked) return;
    var cur = visibleVideo();
    if (cur && cur.muted) cur.muted = false;
  }, 600);
})();

/* ===== إخفاء زر الصوت مهما أُعيد رسمه ===== */
(function () {
  function hideMute() {
    document.querySelectorAll('#reels [data-a="rmu"], #reels .mbtn, #mbtn').forEach(function (b) {
      b.style.setProperty("display", "none", "important");
    });
  }
  hideMute();
  new MutationObserver(hideMute).observe(document.body, { childList: true, subtree: true });
})();

/* ===== ضغطتان على الفيديو = إعجاب ===== */
(function () {
  var last = 0, lastTarget = null, singleTimer = null;
  document.addEventListener("click", function (e) {
    var v = e.target;
    if (!v || v.tagName !== "VIDEO" || !v.closest("#rwrap")) return;
    var now = Date.now();
    if (lastTarget === v && now - last < 320) {
      e.stopImmediatePropagation();
      e.preventDefault();
      clearTimeout(singleTimer);
      last = 0; lastTarget = null;
      var rl = v.closest(".rl");
      var btn = rl.querySelector('[data-a="rlk"]');
      if (btn && !btn.classList.contains("on")) btn.click();
      var h = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      h.setAttribute("viewBox", "0 0 24 24");
      h.setAttribute("class", "xbig");
      h.innerHTML = '<path d="M12 21s-8-5.3-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.7-8 11-8 11z"/>';
      rl.appendChild(h);
      setTimeout(function () { h.remove(); }, 850);
      if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      return;
    }
    e.stopImmediatePropagation();
    e.preventDefault();
    last = now; lastTarget = v;
    clearTimeout(singleTimer);
    singleTimer = setTimeout(function () {
      if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
      else v.pause();
      last = 0; lastTarget = null;
    }, 320);
  }, true);
})();

/* ===== شاشة الدخول بالاسم + انفجار القلوب ===== */
(function () {
  var KEY = "eyeclipX1";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }
  if (localStorage.getItem("xlogged") === "1") return;

  var o = document.createElement("div");
  o.id = "xlogin";
  o.innerHTML =
    '<div class="lb"><h1>EyeClip 👁️</h1><p>اكتب اسمك للدخول</p>' +
    '<input id="xlname" placeholder="اسمك" maxlength="30" autocomplete="off">' +
    '<button id="xlgo">دخول</button></div>';
  document.body.appendChild(o);
  document.body.style.overflow = "hidden";

  var hearts = ["❤️", "💖", "💗", "💕", "💘", "🧡", "💜", "💙"];
  function explode() {
    for (var i = 0; i < 90; i++) {
      (function (i) {
        setTimeout(function () {
          var h = document.createElement("div");
          h.className = "xfly";
          h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
          h.style.left = Math.random() * 100 + "vw";
          h.style.fontSize = (20 + Math.random() * 40) + "px";
          h.style.setProperty("--r", (Math.random() * 120 - 60) + "deg");
          h.style.animationDuration = (1.4 + Math.random() * 1.4) + "s";
          document.body.appendChild(h);
          setTimeout(function () { h.remove(); }, 3000);
        }, i * 14);
      })(i);
    }
  }
  function enter() {
    var name = document.getElementById("xlname").value.trim();
    if (!name) { document.getElementById("xlname").focus(); return; }
    var s = load();
    s.profile = s.profile || {};
    s.profile.name = name;
    s.profile.letter = name.charAt(0);
    save(s);
    localStorage.setItem("xlogged", "1");
    explode();
    setTimeout(function () {
      o.classList.add("out");
      document.body.style.overflow = "";
      setTimeout(function () { o.remove(); location.reload(); }, 650);
    }, 1300);
  }
  document.getElementById("xlgo").onclick = enter;
  document.getElementById("xlname").onkeydown = function (e) { if (e.key === "Enter") enter(); };
})();

/* ===== الضغط على صورتي يفتح صفحة حسابي ===== */
(function () {
  document.addEventListener("click", function (e) {
    var a = e.target.closest(".compose .av");
    if (!a) return;
    if (e.__fromProfileBtn) return;
    e.stopImmediatePropagation();
    e.preventDefault();
    var btns = document.querySelectorAll("nav button");
    var pb = btns[btns.length - 1];
    if (pb) pb.click();
  }, true);

  document.addEventListener("click", function (e) {
    var b = e.target.closest("#pfEdit");
    if (!b) return;
    e.stopImmediatePropagation();
    e.preventDefault();
    var a = document.querySelector(".compose .av");
    if (!a) return;
    var ev = new MouseEvent("click", { bubbles: true, cancelable: true });
    ev.__fromProfileBtn = true;
    a.dispatchEvent(ev);
  }, true);
})();

/* ===== الوضع الداكن + الخروج + تعديل المنشور + حذف التعليق ===== */
(function () {
  var KEY = "eyeclipX1";
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }

  if (localStorage.getItem("xdark") === "1") document.body.classList.add("xdark");

  var t = document.createElement("div");
  t.className = "xtools";
  t.innerHTML = '<button id="xdk">🌙 داكن</button><button id="xout">خروج</button>';
  document.body.appendChild(t);

  document.getElementById("xdk").onclick = function () {
    var on = document.body.classList.toggle("xdark");
    localStorage.setItem("xdark", on ? "1" : "0");
  };
  document.getElementById("xout").onclick = function () {
    localStorage.removeItem("xlogged");
    location.reload();
  };

  /* حذف تعليق: ضغطة مطولة */
  document.addEventListener("contextmenu", function (e) { if (e.target.closest(".cmi")) e.preventDefault(); });
  var holdT;
  document.addEventListener("touchstart", function (e) {
    var c = e.target.closest(".cmi"); if (!c) return;
    holdT = setTimeout(function () {
      if (!confirm("حذف هذا التعليق؟")) return;
      var list = c.parentElement, idx = Array.prototype.indexOf.call(list.children, c);
      var d = load(), keys = Object.keys(d.comments || {});
      for (var i = 0; i < keys.length; i++) {
        var arr = d.comments[keys[i]];
        if (arr.length === list.children.length && arr[idx] && c.textContent.indexOf(arr[idx].t) > -1) {
          arr.splice(idx, 1); save(d); c.remove(); return;
        }
      }
    }, 600);
  }, { passive: true });
  ["touchend", "touchmove"].forEach(function (ev) {
    document.addEventListener(ev, function () { clearTimeout(holdT); }, { passive: true });
  });

  /* تعديل منشور: ضغطة مطولة على نصه */
  var holdP;
  document.addEventListener("touchstart", function (e) {
    var p = e.target.closest(".post p"); if (!p) return;
    var post = p.closest(".post");
    if (!post.querySelector('[data-a="del"]')) return;
    holdP = setTimeout(function () {
      var pid = post.getAttribute("data-pid");
      var nt = prompt("تعديل المنشور:", p.textContent);
      if (nt == null || !nt.trim()) return;
      var d = load();
      (d.posts || []).forEach(function (x) { if (x.id === pid) x.text = nt.trim(); });
      save(d); location.reload();
    }, 600);
  }, { passive: true });
  ["touchend", "touchmove"].forEach(function (ev) {
    document.addEventListener(ev, function () { clearTimeout(holdP); }, { passive: true });
  });
})();

/* ===== نافذة التأكيد الزجاجية (بدل confirm الأصلية) ===== */
(function () {
  var nativeConfirm = window.confirm;
  var busy = false;

  function glass(msg, yes) {
    if (busy) return;
    busy = true;
    var del = /حذف|خروج/.test(msg);
    var o = document.createElement("div");
    o.id = "xcf";
    o.innerHTML =
      '<div class="bx"><div class="tt">هل أنت متأكد؟</div><div class="ms"></div>' +
      '<div class="bt"><button class="no">إلغاء</button>' +
      '<button class="' + (del ? "dl" : "") + ' ok">' + (del ? "حذف" : "موافق") + '</button></div></div>';
    o.querySelector(".ms").textContent = msg;
    document.body.appendChild(o);
    function close(r) { o.remove(); busy = false; if (r) yes(); }
    o.querySelector(".ok").onclick = function (e) { e.stopPropagation(); close(true); };
    o.querySelector(".no").onclick = function (e) { e.stopPropagation(); close(false); };
    o.onclick = function (e) { if (e.target === o) close(false); };
  }

  document.addEventListener("click", function (e) {
    var b = e.target.closest('[data-a="del"],[data-a="rdel"],#xout,#delStoryBtn');
    if (!b || b.__ok) return;
    e.stopImmediatePropagation();
    e.preventDefault();

    var msg = b.id === "xout" ? "تسجيل الخروج؟"
            : b.id === "delStoryBtn" ? "حذف هذه القصة؟"
            : b.getAttribute("data-a") === "rdel" ? "حذف هذا الريلز؟"
            : "حذف هذا المنشور؟";

    glass(msg, function () {
      window.confirm = function () { return true; };
      b.__ok = true;
      b.click();
      b.__ok = false;
      window.confirm = nativeConfirm;
    });
  }, true);
})();

/* ===== نسخ احتياطي: تصدير واستيراد بياناتك ===== */
(function () {
  var KEYS = ["eyeclipX1", "eyeclipData_v2", "xlogged", "xdark"];
  var bar = document.querySelector(".xtools");
  if (!bar) return;

  var ex = document.createElement("button");
  ex.textContent = "💾 حفظ نسخة";
  var im = document.createElement("button");
  im.textContent = "📥 استرجاع";
  bar.appendChild(ex); bar.appendChild(im);

  ex.onclick = function () {
    var data = {};
    KEYS.forEach(function (k) {
      var v = localStorage.getItem(k);
      if (v !== null) data[k] = v;
    });
    var blob = new Blob([JSON.stringify(data)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "eyeclip-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  };

  im.onclick = function () {
    var i = document.createElement("input");
    i.type = "file"; i.accept = ".json,application/json";
    i.onchange = function () {
      var f = i.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var d = JSON.parse(r.result);
          if (!d || typeof d !== "object" || !d.eyeclipX1) throw new Error("bad");
          Object.keys(d).forEach(function (k) {
            if (KEYS.indexOf(k) > -1) localStorage.setItem(k, d[k]);
          });
          location.reload();
        } catch (e) { alert("الملف ليس نسخة احتياطية صالحة"); }
      };
      r.readAsText(f);
    };
    i.click();
  };
})();


/* ===== الصوت تلقائي: يفتح الصوت عند أول لمسة ===== */
(function () {
  var done = false;
  function unmute() {
    if (done) return;
    var b = document.querySelector('#rwrap [data-a="rmu"]');
    if (!b) return;
    if (b.innerHTML.indexOf("M22 9l-6 6") > -1) b.click();
    done = true;
  }
  ["touchend", "click"].forEach(function (ev) { document.addEventListener(ev, unmute, true); });
})();

/* ===== زر متابعة بجانب كل شخص + العلامة الزرقاء للحسابات الرسمية ===== */
(function () {
  var KEY = "eyeclipX1", FK = "xfollow";
  var VERIFIED = ["Mohamed babe"];   // أضف هنا أي اسم رسمي آخر

  function myName() {
    try { return (JSON.parse(localStorage.getItem(KEY)).profile || {}).name || ""; } catch (e) { return ""; }
  }
  function getF() { try { return JSON.parse(localStorage.getItem(FK)) || []; } catch (e) { return []; } }
  function addF(n) { var f = getF(); if (f.indexOf(n) < 0) f.push(n); localStorage.setItem(FK, JSON.stringify(f)); }

  var CHECK = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>';
  var queued = false;

  function mark() {
    queued = false;
    var me = myName(), fl = getF();

    document.querySelectorAll(".ph b,.xv-top b,.cmi b,.ru b,.pf-name").forEach(function (el) {
      if (el.classList.contains("xvf")) return;
      if (VERIFIED.indexOf(el.textContent.trim()) > -1) el.classList.add("xvf");
    });

    document.querySelectorAll(".ph, .ru").forEach(function (row) {
      var b = row.querySelector("b");
      if (!b || row.querySelector(".xfl")) return;
      var name = b.textContent.trim();
      if (!name || name === me || fl.indexOf(name) > -1) return;

      var btn = document.createElement("button");
      btn.className = "xfl";
      btn.textContent = "متابعة";
      btn.onclick = function (e) {
        e.stopPropagation(); e.preventDefault();
        addF(name);
        btn.classList.add("ok");
        btn.innerHTML = CHECK;
        btn.onclick = null;
        setTimeout(function () { btn.remove(); }, 1000);
      };
      row.appendChild(btn);
    });
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(mark); } }
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  mark();
})();
