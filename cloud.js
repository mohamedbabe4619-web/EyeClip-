/* EyeClip - الاتصال بـ Firebase (منشورات وقصص مشتركة) */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, limit }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

var firebaseConfig = {
  apiKey: "AIzaSyAeKpOpze32O0Vv6x2fcWs7zVx4hoEDjnM",
  authDomain: "eyeclip-5557d.firebaseapp.com",
  projectId: "eyeclip-5557d",
  storageBucket: "eyeclip-5557d.firebasestorage.app",
  messagingSenderId: "652600168424",
  appId: "1:652600168424:web:1737779f4b2aff9c2c1e5d"
};

try {
  var app = initializeApp(firebaseConfig);
  var db = getFirestore(app);
  window.CLOUD = window.CLOUD || { posts: [], stories: [] };

  function watch(name, max) {
    var q = query(collection(db, name), orderBy("t", "desc"), limit(max));
    onSnapshot(q, function (snap) {
      var arr = [];
      snap.forEach(function (d) { var v = d.data(); v.id = d.id; arr.push(v); });
      window.CLOUD[name] = arr;
      if (window.xRefresh) window.xRefresh();
    }, function (err) { console.warn("Firestore:", err && err.code); });
  }
  watch("posts", 60);
  watch("stories", 100);

  window.cloudPublish = function (coll, id, data) {
    if (JSON.stringify(data).length > 950000) { delete data.img; }
    return setDoc(doc(db, coll, id), data);
  };
  window.cloudDelete = function (coll, id) { return deleteDoc(doc(db, coll, id)); };
} catch (e) { console.warn("Firebase init failed", e); }
