// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/12.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/12.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC4-_JQsS625vRMkmM4PeVupxX97FVBe5U",
  authDomain: "zajoma-8553f.firebaseapp.com",
  projectId: "zajoma-8553f",
  storageBucket: "zajoma-8553f.firebasestorage.app",
  messagingSenderId: "390203043975",
  appId: "1:390203043975:web:fe5e2f618ee285ce3bc822"
});

const messaging = firebase.messaging();

// Notificación cuando la app está cerrada o en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('📱 Notificación en background:', payload);
  
  const titulo = payload.notification?.title || '💬 ¡Tienes un nuevo mensaje!';
  const cuerpo = payload.notification?.body || 'Alguien te ha escrito';
  
  const opciones = {
    body: cuerpo,
    icon: '/avatars/avatar1.png',
    badge: '/avatars/avatar1.png',
    vibrate: [200, 100, 200],
    sound: '/notification.mp3',
    data: {
      url: '/chat.html'
    }
  };
  
  self.registration.showNotification(titulo, opciones);
});

// Al hacer clic en la notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/chat.html')
  );
});