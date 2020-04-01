const element = document.querySelector('#screen');
const style = getComputedStyle(element)
console.log(style.width);
console.log(style.height);

function onMouseEnter() {
    document.getElementById('sidebar').style.width = '250%';
    document.getElementById('menubar-item').innerHTML = "<img src=\"./assets/menu-2.png\" width=\"40\" height=\"40\" alt=\"\" class=\"d-inline-block align-top\" style=\"margin-right: 10%;\"> Sidebar"
    document.getElementsByClassName('sidebar-item')[0].style.width = "200%";
    document.getElementsByClassName('sidebar-item')[0].innerHTML = "<p><img src=\"./assets/home.png\" width=\"40\" height=\"40\" alt=\"\" class=\"sidebar-item-icon\">Some text</p>"
    }

function onMouseExit() {
    document.getElementById('sidebar').style.width = '70%';
    document.getElementById('menubar-item').innerHTML = "<img src=\"./assets/menu-2.png\" width=\"40\" height=\"40\" alt=\"\" class=\"d-inline-block align-top\" style=\"margin-right: 10%;\"> Dashboard"
    //document.getElementsByClassName('sidebar-item')[0].style.width = "50px";
    document.getElementsByClassName('sidebar-item')[0].innerHTML = "<p><img src=\"./assets/home.png\" width=\"40\" height=\"40\" alt=\"\" class=\"sidebar-item-icon\"></p>"

}