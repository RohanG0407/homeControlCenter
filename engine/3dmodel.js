var scene = new THREE.Scene();


var renderer = new THREE.WebGLRenderer();
let container = document.querySelector('#map_card');
let containerS = getComputedStyle(container);
let widthS = containerS.width;
widthS = widthS.substring(0,widthS.length -2 );
let heightS = containerS.height;
heightS = heightS.substring(0,heightS.length -2 );
renderer.setSize(widthS, heightS);
container.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera( 75, widthS/heightS, 0.1, 1000 );

var geometry = new THREE.BoxGeometry();
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render( scene, camera );
};

animate();