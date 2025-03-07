const dropArea = document.querySelector('.drag__input');
const fileInput = document.getElementById('file-input');
const fileImg = document.querySelector('.file-img'); // Selecciona la imagen de vista previa
const fileSizeMessage = document.getElementById('file-size-message'); // Mensaje de tamaño de archivo

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.style.borderColor = '#000';
});

dropArea.addEventListener('dragleave', () => {
    dropArea.style.borderColor = '#ccc';
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.style.borderColor = '#ccc';
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

dropArea.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});


let isImageSelected = false; // Variable para rastrear si se ha seleccionado una imagen

function handleFile(file) {
    const maxSize = 500 * 1024; // 500 KB en bytes
    if (file.size > maxSize) {
        alert("El archivo es demasiado grande. Por favor, selecciona una imagen de 500 KB o menos.");
        fileSizeMessage.style.color = 'red';
        isImageSelected = false; // No se ha seleccionado una imagen válida
        return;
    }

    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        const reader = new FileReader();
        reader.onload = function (e) {
            fileImg.src = e.target.result;
            selectedImage = e.target.result;
            fileSizeMessage.style.color = '';
            isImageSelected = true; // Se ha seleccionado una imagen válida
        };
        reader.readAsDataURL(file);
    } else {
        alert("Por favor, selecciona una imagen válida (JPG o PNG).");
        fileSizeMessage.style.color = 'red';
        isImageSelected = false; // No se ha seleccionado una imagen válida
    }
}











const form = document.getElementById("myForm");
const ticketGenerated = document.getElementById("generated-tickets-section");
const formSection = document.getElementById("form-section");


// regex para los inputs

const regexUsername = /^[a-zA-Z0-9_ ]{3,16}$/;
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexGitHubUser = /^(?!-)[a-zA-Z0-9-]{2,39}(?<!-)$/;


// funcion para validar los inputs 

function validateField(input, regex, errorElement) {
    const isValid = regex.test(input.value.trim());
    errorElement.style.display = isValid ? "none" : "inline-flex";
    return isValid;
}




form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const githubUser = document.getElementById("github");
    const ticketName = document.getElementById("ticket-name");
    const ticketUsername = document.getElementById("ticket-username");
    const ticketEmail = document.getElementById("ticket-email-title");
    const ticketGitHub = document.getElementById("ticket-github");
    const ticketImg = document.getElementById("ticket-img");
    const imageError = document.getElementById("image-error"); 
    const fileSizeMessage = document.getElementById("file-size-message");
 
    const errorUsername = username.nextElementSibling;
    const errorEmail = email.nextElementSibling;
    const errorGithub = githubUser.nextElementSibling;



    isValid &= validateField(username, regexUsername, errorUsername);
    isValid &= validateField(email, regexEmail, errorEmail);
    isValid &= validateField(githubUser, regexGitHubUser, errorGithub);

    if (!isImageSelected) {
        imageError.style.display = "block"; //
        isValid = false; //
        fileSizeMessage.style.display = "none";
    } else {
        fileSizeMessage.style.display = "block"; 
        imageError.style.display = "none"; 
    }

    if (isValid) {
        const usernameInput = document.getElementById("username").value.trim();
        const emailInput = document.getElementById("email").value.trim();
        const githubUserInput = document.getElementById("github").value.trim();

        formSection.style.display = "none";
        ticketGenerated.style.display = "flex";

        ticketName.innerText = `${usernameInput}`;
        ticketEmail.innerText = `${emailInput}`;
        ticketGitHub.innerHTML = `<img src="/assets/images/icon-github.svg" alt="">  ${githubUserInput}`;
        ticketUsername.innerHTML = `${usernameInput}`;

        if (selectedImage) {
            ticketImg.src = selectedImage;
        } else {
            ticketImg.src = "/assets/images/image-avatar.jpg";
        }
    }
});