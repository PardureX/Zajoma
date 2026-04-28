// firebase-messaging-sw.js
// Service Worker para notificaciones push - Amaime Chat

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

// Notificación cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage((payload) => {
    console.log('📱 [SW] Notificación en segundo plano:', payload);
    
    const titulo = payload.notification?.title || '💬 Nuevo mensaje';
    const cuerpo = payload.notification?.body || 'Alguien te ha enviado un mensaje';
    const icon = '/avatars/avatar1.png';
    const emisorUid = payload.data?.emisorUid || 'mensaje';
    
    const opciones = {
        body: cuerpo,
        icon: icon,
        badge: icon,
        tag: emisorUid,
        renotify: true,
        vibrate: [200, 100, 200],
        data: {
            url: '/chat.html',
            emisorUid: emisorUid
        }
    };
    
    self.registration.showNotification(titulo, opciones);
});

// Cuando el usuario hace clic en la notificación
self.addEventListener('notificationclick', (evento) => {
    console.log('🔔 [SW] Click en notificación');
    evento.notification.close();
    
    const url = evento.notification.data?.url || '/chat.html';
    
    evento.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((listaClientes) => {
                // Si ya hay una ventana abierta, la enfoca
                for (const cliente of listaClientes) {
                    if (cliente.url.includes('chat.html') && 'focus' in cliente) {
                        return cliente.focus();
                    }
                }
                // Si no hay ventana abierta, abre una nueva
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});

// Evento cuando el SW se activa correctamente
self.addEventListener('activate', (evento) => {
    console.log('✅ [SW] Service Worker activado');
    evento.waitUntil(clients.claim());
});

// Evento cuando el SW se instala
self.addEventListener('install', (evento) => {
    console.log('📦 [SW] Service Worker instalado');
    evento.waitUntil(self.skipWaiting());
});
