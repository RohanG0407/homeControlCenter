const element = document.querySelector('.sidebar-item');
const style = getComputedStyle(element);

var sidebar_itemwidth = style.width;
var sidebar_itemheight = style.height;
sidebar_margin = sidebar_itemwidth.substring(0,sidebar_itemwidth.length -2 );
sidebar_marginP = parseInt(sidebar_margin);
sidebar_marginV = (sidebar_marginP * .35);
sidebar_marginL = (sidebar_marginP * .15);



function onMouseEnter() {
    document.getElementById('sidebar').style.width = '250%';
    document.getElementById('menubar-item').innerHTML = "<img src=\"./assets/menu-2.png\" width=\"40\" height=\"40\" alt=\"\" class=\"d-inline-block align-top\" style=\"margin-right: 10%;\"> Sidebar"
    var sidebaritems = document.getElementsByClassName('sidebar-item');
    for(var i = 0; i < sidebaritems.length; i++){
        sidebaritems[i].style.width = "100%";
        sidebaritems[i].style.marginTop = sidebar_marginV +'px';
        sidebaritems[i].style.marginBottom = sidebar_marginV +'px';
        sidebaritems[i].style.marginLeft = sidebar_marginL +'px';
        sidebaritems[i].innerHTML = "<p><img src=\"./assets/home.png\" width=\"40\" height=\"40\" alt=\"\" class=\"sidebar-item-icon\">Some text</p>"
    }

    }

function onMouseExit() {
    document.getElementById('sidebar').style.width = '70%';
    document.getElementById('menubar-item').innerHTML = "<img src=\"./assets/menu-2.png\" width=\"40\" height=\"40\" alt=\"\" class=\"d-inline-block align-top\" style=\"margin-right: 10%;\"> Dashboard"
    var sidebaritems = document.getElementsByClassName('sidebar-item');
    for(var i = 0; i < sidebaritems.length; i++){
        sidebaritems[i].style.width = "70%";
        sidebaritems[i].style.marginTop = sidebar_marginV +'px';
        sidebaritems[i].style.marginBottom = sidebar_marginV +'px';
        sidebaritems[i].style.marginLeft = sidebar_marginL +'px';
        sidebaritems[i].innerHTML = "<p><img src=\"./assets/home.png\" width=\"40\" height=\"40\" alt=\"\" class=\"sidebar-item-icon\"></p>"
    }

}