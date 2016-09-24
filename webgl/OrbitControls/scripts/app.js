var example = (function() {

    "use strict";

    var scene = new THREE.Scene(),
        renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
        light = new THREE.AmbientLight(0xffffff),
        camera,
        box,
		box2;

    function initScene() {
        renderer.setSize(1025, 500);
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);

        camera = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            1,
            1000
        );
		
		
		// call the render function
        var step = 0;
        var speed = new function () {
            this.rotationSpeed = 0.02;
                    };
					
        var gui = new dat.GUI();
        gui.add(speed, 'rotationSpeed', 0, 0.5);
        
        camera.position.z = 100;
        scene.add(camera);  
      

        box = new THREE.Mesh(
            new THREE.BoxGeometry(
                20,
                20,
                20),
            new THREE.MeshBasicMaterial({

                vertexColors: THREE.VertexColors
            }));
	
		
        assignColorsToCube(box);
        scene.add(box);
		
        render();
		
		function render() {
		
		box.rotation.x += speed.rotationSpeed;
		box.rotation.y += speed.rotationSpeed;
		
		requestAnimationFrame( render );

        renderer.render(scene, camera);        
    }
    }

    function assignColorsToCube(cube) {


        var colors = [
            new THREE.Color("rgb(255,0,0)"),
            new THREE.Color("rgb(0,255,0)"),
            new THREE.Color("rgb(0,0,255)"),
            new THREE.Color("rgb(255,255,0)"),
            new THREE.Color("rgb(0,255,255)"),
            new THREE.Color("rgb(255,0,255)")
        ];

        for (var i = 0; i < 12; i += 2) {

            var color = colors[i / 2];

            //each cube face is made up of 2 triangles & we want same color for each
            cube.geometry.faces[i].color = color;
            cube.geometry.faces[i + 1].color = color;
        }
    }

    
	
	

    window.onload = initScene;
	

    return {
        scene: scene
    }

})();