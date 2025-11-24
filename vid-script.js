const modal = document.getElementById("aboutModal");
const openModal = document.getElementById("openModal");
const closeModal = document.querySelector(".close");
const video = modal.querySelector("video");

function closeModalFunc() {
    modal.style.display = "none";
    video.pause();          
    video.currentTime = 0;  
}

openModal.addEventListener("click", () => {
    modal.style.display = "block";
});

closeModal.addEventListener("click", closeModalFunc);

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModalFunc();
    }
});