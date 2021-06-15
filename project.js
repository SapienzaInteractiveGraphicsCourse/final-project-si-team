            const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            var arrayCubes=[];
            var i=0;
            var number=0;
            import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
            scene.background = new THREE.Color(0x99FFFF);
            const controls = new OrbitControls( camera, renderer.domElement );

            controls.screenSpacePanning = false;

            controls.minDistance = 0;
            controls.maxDistance = 10;
            controls.maxPolarAngle = Math.PI / 2;


			// const geometry = new THREE.BoxGeometry(1,1,1);
			// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			// const cube = new THREE.Mesh( geometry, material );
            // cube.position.x=1;
            var j=0;
            var rand=0;
            for (j=0;j<6;j++){
                for(i=0;i<11;i++){
                    const geometry = new THREE.SphereGeometry(0.1, 20,20,20,20,20,20);
                    const texture = new THREE.TextureLoader().load( 'textures/Fire.jpg' );
                    const material = new THREE.MeshBasicMaterial( { map:texture} );
                    const cube = new THREE.Mesh( geometry, material );
                    var height=cube.height;
                    if(j<3){
                        if (i<5){
                            
                            cube.position.x=i+rand;
                        }
                        else{
                            
                            cube.position.x=-i+5;
                        }
                        cube.position.z=j;
                    }
                    else{
                        if (i<5){
                            
                            cube.position.x=i;
                        }
                        else{
                            
                            cube.position.x=-i+5;
                        }
                        cube.position.z=-j+2;
                    }

                    if(getRandomInt(5)==1 && number<7){
                    scene.add( cube );
                    arrayCubes.push(cube);
                    number=number+1;
                }
                }
			}
            var mio_array = new Array();

            mio_array[0] = new Array();
            mio_array[1] = new Array();

            while(number<7){
                const geometry = new THREE.SphereGeometry(0.1, 20,20,20,20,20,20);
                const texture = new THREE.TextureLoader().load( 'textures/Fire.jpg' );
                const material = new THREE.MeshBasicMaterial( { map:texture} );
                const cube = new THREE.Mesh( geometry, material );
                var height=cube.height;
                if(j<3){
                    if (i<2){
                        
                        cube.position.x=i+rand;
                    }
                    else{
                        
                        cube.position.x=-i+2;
                    }
                    cube.position.z=j;
                }
                else{
                    if (i<2){
                        
                        cube.position.x=i;
                    }
                    else{
                        
                        cube.position.x=-i+2;
                    }
                    cube.position.z=-j+2;
                }

                if(getRandomInt(5)==1 && mio_array[j][i]!=1){
                    scene.add( cube );
                    arrayCubes.push(cube);
                    number=number+1;
                    mio_array[j][i]=1;
                }

                i=i+1;
                if(i==5){
                    i=0;
                    j=j+1;
                }
            }

            for(j=0;j<arrayCubes.length;j++){
                arrayCubes[j].position.y -= 0.2;
               
            }

            

            const geometryFloor = new THREE.BoxGeometry(1500,0.5,1500);
            const textureFloor = new THREE.TextureLoader().load( 'textures/grassTexture.jpeg');
			const materialFloor = new THREE.MeshBasicMaterial( { map: textureFloor } );
			const floor = new THREE.Mesh( geometryFloor, materialFloor );
            floor.position.y=-0.6;

            
            
            scene.add(floor);

            var indexDrake=0;
            var xIndex=0.1;
            var yIndex=0.1;
            var vec=(0.1,0.1,0.1);
            for(indexDrake=0.1;indexDrake<0.8;indexDrake=indexDrake+0.1){
                const geometryDrake = new THREE.CylinderGeometry( 0.1,0.1,0.1);
                var stringPath=''
                if(indexDrake==0.1){
                    stringPath='textures/DragonHead.jpg';
                    
                }
                else{
                    stringPath='textures/dragon.jpg';
                }
                const textureDrake = new THREE.TextureLoader().load( stringPath);
                const materialDrake = new THREE.MeshBasicMaterial( { map: textureDrake} );
                const Drake = new THREE.Mesh( geometryDrake, materialDrake );
                Drake.position.x+=indexDrake;
                Drake.position.y+=Math.exp(yIndex)/9;
                scene.add(Drake);
                yIndex+=0.1;
                Drake.rotation.z+=1.58+Math.exp(yIndex)/10;
            }

            const geometryDrakeHead= new THREE.CylinderGeometry( 0.2,0.1,0.1);
            stringPath='textures/DragonHead.jpg';
            const textureDrakeHead = new THREE.TextureLoader().load( stringPath);
            const materialDrakeHead = new THREE.MeshBasicMaterial( { map: textureDrakeHead} );
            const DrakeHead = new THREE.Mesh( geometryDrakeHead, materialDrakeHead );
            DrakeHead.position.x+=0.1;
            DrakeHead.position.y+=Math.exp(0.1)/9;
            scene.add(DrakeHead);
            DrakeHead.rotation.z+=1.57+Math.exp(0.1)/10;

            const geometryDrakeHead1= new THREE.CylinderGeometry( 0.1,0.2,0.2);
            stringPath='textures/DragonHead.jpg';
            const textureDrakeHead1 = new THREE.TextureLoader().load( stringPath);
            const materialDrakeHead1 = new THREE.MeshBasicMaterial( { map: textureDrakeHead1} );
            const DrakeHead1 = new THREE.Mesh( geometryDrakeHead1, materialDrakeHead1 );
            DrakeHead1.position.x-=0.048;
            DrakeHead1.position.y+=0.106;
            scene.add(DrakeHead1);
            DrakeHead1.rotation.z+=1.57+Math.exp(0.1)/10;



               
            

			camera.position.z = 0.5;
            controls.update();
           
            

			const animate = function () {
				requestAnimationFrame( animate );
                var j;
				for(j=0;j<arrayCubes.length;j++){
                    arrayCubes[j].rotation.x += 0.01;
				    arrayCubes[j].rotation.y += 0.01;
                }
                
                //Horizontal Slider Rotation
                
                document.getElementById("YSlider").onclick = function() {
                    scene.rotation.y+=0.1;
                };

                document.getElementById("YSlider-").onclick = function() {
                    scene.rotation.y-=0.1;
                };
                

                keydown();
                controls.update();
				renderer.render( scene, camera );
			};

			animate();



            
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function keydown(){
    
    //scene.rotation.y+=0.1;
}