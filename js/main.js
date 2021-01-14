let BODY = document.querySelector('body');
let welcome = document.querySelector('#welcome');
let start = document.querySelector('#welcome button');
start.addEventListener("click", ()=>{
    welcome.remove();
} )