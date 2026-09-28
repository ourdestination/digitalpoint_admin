/* Firebase Cloud Messaging — background push service worker.
   এই ফাইলটা index.html-এর একদম পাশে (একই ফোল্ডারে) রাখতে হবে — অ্যাডমিন ও কাস্টমার দুই সাইটেই। */
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.14.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCl1GbGiwzNq5-nXw4TtLBKHY3_TfnD0iM",
  authDomain: "ourfamily02-664c7.firebaseapp.com",
  databaseURL: "https://ourfamily02-664c7-default-rtdb.firebaseio.com",
  projectId: "ourfamily02-664c7",
  storageBucket: "ourfamily02-664c7.firebasestorage.app",
  messagingSenderId: "758591808249",
  appId: "1:758591808249:web:4983e10ec587bc1a423828"
});

const messaging = firebase.messaging();

// সাইট বন্ধ/ব্যাকগ্রাউন্ডে থাকলে সার্ভার থেকে আসা পুশ এখানে দেখানো হয়
messaging.onBackgroundMessage(payload => {
  const d = payload.data || {};
  return self.registration.showNotification(d.title || "নতুন নোটিফিকেশন", {
    body: d.body || "",
    tag: d.tag || undefined,
    renotify: !!d.tag,
    vibrate: [180, 90, 180]
  });
});

// নোটিফিকেশনে ট্যাপ করলে সাইট খুলবে (খোলা থাকলে সেটাকেই সামনে আনবে)
self.addEventListener("notificationclick", e => {
  e.notification.close();
  const scope = self.registration.scope;
  e.waitUntil(
    clients.matchAll({type: "window", includeUncontrolled: true}).then(list => {
      for (const c of list) { if (c.url.startsWith(scope) && "focus" in c) return c.focus(); }
      return clients.openWindow(scope);
    })
  );
});
