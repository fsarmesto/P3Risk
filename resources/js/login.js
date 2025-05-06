document.addEventListener('DOMContentLoaded',f_main);

const regExUser = /[a-zA-Z][a-z]+/;
const regExPass = /^\w{8}\w*/

function f_main(){
    let form = document.forms[0];

    form.addEventListener('submit',checkForm);
}

function checkForm(e) {
    e.preventDefault();
    let eMsg;
    let user = e.target.querySelector('#uName').value;
    let pass = e.target.querySelector('#pWord').value

    if(user.length > 3 && pass.length > 8){
        if(regExUser.test(user) && regExPass.test(pass)){
            //Initial check correct, send to server.
            alert("Ok");
        }else{
            eMsg = "Error: Username or password do not meet the minimum complexity criteria";
        }
    }else{
        eMsg = "Error: Username or password do not meet the minimum length requirements";
    }
    let errorContainer = document.querySelector('#errorMessages');
    errorContainer.innerHTML = '';
    let errorSpan = document.createElement('span');
    errorSpan.textContent = eMsg;
    errorSpan.textContent.length > 0 ? errorContainer.append(errorSpan) : sendForms();
}

function sendForms(){
    alert("Yay");
}