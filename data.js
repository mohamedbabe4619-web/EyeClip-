const KEY = "eyeclipData_v2";

const DEFAULT_DATA = {
  appName: "EyeClip",
  meLetter: "m",
  users: [
    { id: 1, name: "يوسف العتيبي", color: 1, mutual: 12 },
    { id: 2, name: "سارة النجار", color: 2, mutual: 5 },
    { id: 3, name: "علي الحربي", color: 3, mutual: 21 },
    { id: 4, name: "مريم القحطاني", color: 4, mutual: 8 },
    { id: 5, name: "نور العلي", color: 5, mutual: 3 },
    { id: 6, name: "لينا الشمري", color: 6, mutual: 0 }
  ],
  requests: [1, 2],
  suggestions: [3, 4, 5],
  stories: [2, 1, 6, 4],
  posts: [
    {
      user: 6,
      time: "قبل ١٠ دقائق · الرياض",
      text: "يوم هادئ في الاستوديو ✨ خلّصنا مشروع جديد وقلبي مليان امتنان.",
      image: ""
    }
  ],
  notifications: [
    { user: 3, text: "أعجب بمنشورك", time: "قبل ٥ دقائق", isNew: true },
    { user: 2, text: "علّقت: «لقطة رائعة!»", time: "قبل ٢٠ دقيقة", isNew: true },
    { user: 4, text: "أرسلت لك طلب صداقة", time: "قبل ساعة", isNew: true },
    { user: 5, text: "نشرت ريلز جديد", time: "أمس", isNew: false },
    { user: 1, text: "شارك منشورك", time: "أمس", isNew: false }
  ],
  reels: [
    {
      user: 5,
      caption: "أول ريلز لي 🌸",
      video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      likes: 0,
      liked: false
    }
  ]
};

function loadData() {
  try {
    const s = localStorage.getItem(KEY);
    if (s) return JSON.parse(s);
  } catch (e) {}
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}
function saveData(d) {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
}
function resetData() {
  try { localStorage.removeItem(KEY); } catch (e) {}
}
