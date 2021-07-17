if('serviceWorker' in navigator){
    navigator.serviceWorker.register("/sw.js")
        .then(res => console.log("Registred", res))
        .catch(error => console.error(error));
}