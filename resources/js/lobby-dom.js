document.addEventListener("DOMContentLoaded", f_prepare);

function f_prepare() {
  let hideMsgBtn = document.getElementById("close-msg");

  hideMsgBtn.addEventListener("click", f_hide);
}

function f_hide(e) {
  let container = e.target.parentElement;

  for (let child of container.children) {
    if (child.id !== 'close-msg') {
      child.style.height = "0.1px";
      child.style.visibility = "hidden";
    }
  }

  e.target.textContent = "⬇";

  e.target.addEventListener('click', f_show);

  e.target.removeEventListener('click', f_hide);
}

function f_show(e) {
  let container = e.target.parentElement;

  for (let child of container.children) {
    if (child.id !== 'close-msg') {
       child.style.height = "";
       child.style.visibility = "";
    }
  }

  e.target.textContent = "⬆";

  e.target.addEventListener('click', f_hide);
  e.target.removeEventListener('click', f_show);
}
