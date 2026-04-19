// Service Worker scope: /Zajoma/
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

// Notificaciones cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage((payload) => {
    const titulo = payload.notification?.title || '💬 Nuevo mensaje';
    const cuerpo = payload.notification?.body || '';
    const icon = payload.notification?.icon || 'avatars/avatar1.png';

    self.registration.showNotification(titulo, {
        body: cuerpo,
        icon,
        badge: 'avatars/avatar1.png',
        tag: payload.data?.emisorUid || 'mensaje',
        renotify: true,
        data: { url: payload.data?.url || '/chat.html' }
    });
});

// Al tocar la notificación, abrir/enfocar la app
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const url = event.notification.data?.url || '/chat.html';
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            for (const client of clientList) {
                if (client.url.includes('chat.html') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) return clients.openWindow(url);
        })
    );
});
