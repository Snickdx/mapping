function registerSW(){
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/pwa/sw.js');
        });
    }
    
}

export {registerSW};