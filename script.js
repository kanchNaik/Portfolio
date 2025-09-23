function toggleMenu(){
    const menu=document.querySelector(".menu-links");
    const icon=document.querySelector(".hamburger-icon");
    menu.classList.toggle("show");
    icon.classList.toggle("open");
}

function openModal(id) {
document.getElementById(id).style.display = "block";
}
function closeModal(id) {
document.getElementById(id).style.display = "none";
}