var renderer, scene, camera;

var drawCount;
var mesh;

var h = 200;
var amplitude = h;
var frequency = .02;
var phi = 0;
var frames = 0;

init();
animate();  

function init() {

	// renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// camera
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 0, 800);
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	// scene
	scene = new THREE.Scene();
	
	// geometry
	var geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array( 1500 );

	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var material = new THREE.LineBasicMaterial( { color: "#00ffff", linewidth: 5 } );

	// draw range
	drawCount = 0; // draw the first 2 points, only
	geometry.setDrawRange( 0, drawCount );


	// mesh
	mesh = new THREE.Line(geometry, material);
	scene.add(mesh);
	updatePositions();

	// load json file
	var loader = new THREE.JSONLoader();
	loader.load('./pencil.json', generateMesh );
}

// load pencil
function generateMesh(geometry, material){
	geometry.computeVertexNormals();
    var pencil = new THREE.Mesh(geometry, material);
	scene.add(pencil);
}

// set up sine wave
function updatePositions(){
	var positions = mesh.geometry.attributes.position.array; 
	var y = z = index = 0;
	frames++
	phi = frames / 20;

	for ( var i = 0, l = 500; i < l; i ++ ) {

		positions[ index ++ ] = x;
		positions[ index ++ ] = y;
		positions[ index ++ ] = z;
		
		y ++;
		var x = Math.sin(-y * frequency + phi) * amplitude / 2 + amplitude / 2;
	}
};

// render
function render() {
  	renderer.render( scene, camera );
}

// animate
function animate() {
	
	requestAnimationFrame( animate );

	mesh.geometry.setDrawRange( 0, 500 );
	updatePositions();
	mesh.geometry.attributes.position.needsUpdate = true; 
	// mesh.rotation.x += 0.02;
	// mesh.rotation.z += 0.02;

	render();
}



