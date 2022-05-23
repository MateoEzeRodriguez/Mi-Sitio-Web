window.onload = function(){
    $('#onload').fadeOut();
}

$("#compra").click(function(){
    swal({
        title: 'Agregado al carrito',
        icon: 'success'
    })
});


let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () => {
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItem.classList.remove('active');
}

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	user: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    user: false,
    name: false,
    password: false,
    mail: false,
    phone: false
}

const validarFormulario = (e) => {
    switch(e.target.name) {
        case "user":
            validarCampos(expresiones.user, e.target, 'user');
        break;
        case 'name':
            validarCampos(expresiones.name, e.target, 'name');
        break;
        case 'password':
            validarCampos(expresiones.password, e.target, 'password');
            validarPassword2();
        break;
        case 'password2':
            validarPassword2();
        break;
        case 'mail':
            validarCampos(expresiones.mail, e.target, 'mail');
        break;
        case 'phone':
            validarCampos(expresiones.phone, e.target, 'phone');
        break;
    }
}

const validarCampos = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`group__${campo}`).classList.remove('formulario__group-incorrect');
        document.getElementById(`group__${campo}`).classList.add('formulario__group-correct');
        document.querySelector(`#group__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__${campo} .formulario__input-error`).classList.remove('formulario__input-error-active');
        campos[campo] = true;
    } else {
        document.getElementById(`group__${campo}`).classList.add('formulario__group-incorrect');
        document.getElementById(`group__${campo}`).classList.remove('formulario__group-correct');
        document.querySelector(`#group__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#group__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__${campo} .formulario__input-error`).classList.add('formulario__input-error-active');
        campos[campo] = false;
    }
}

const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if(inputPassword1.value !== inputPassword2.value){
        document.getElementById(`group__password2`).classList.add('formulario__group-incorrect');
        document.getElementById(`group__password2`).classList.remove('formulario__group-correct');
        document.querySelector(`#group__password2 i`).classList.add('fa-times-circle');
        document.querySelector(`#group__password2 i`).classList.remove('fa-check-circle');
        document.querySelector(`#group__password2 .formulario__input-error`).classList.add('formulario__input-error-active');
        campos['password'] = false;
    } else {
        document.getElementById(`group__password2`).classList.remove('formulario__group-incorrect');
        document.getElementById(`group__password2`).classList.add('formulario__group-correct');
        document.querySelector(`#group__password2 i`).classList.add('fa-check-circle');
        document.querySelector(`#group__password2 i`).classList.remove('fa-times-circle');
        document.querySelector(`#group__password2 .formulario__input-error`).classList.remove('formulario__input-error-active');
        campos['password'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const terms = document.getElementById('terms');
    if(campos.user && campos.name && campos.password && campos.mail && campos.phone && terms.checked){
        formulario.reset();

        document.getElementById('formulario__msg-success').classList.add('formulario__msg-success-active');
        setTimeout(() => {
            document.getElementById('formulario__msg-success').classList.remove('formulario__msg-success-active');
        }, 5000);

        document.querySelectorAll('.formulario__group-correct').forEach((icon) => {
            icon.classList.remove('formulario__group-correct');
        });

    } else {
        document.getElementById('formulario__msg').classList.add('formulario__msg-active')
        setTimeout(() => {
            document.getElementById('formulario__msg').classList.remove('formulario__msg-active');
        }, 5000);
    }
});