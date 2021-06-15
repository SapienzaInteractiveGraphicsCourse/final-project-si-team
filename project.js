const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            var arrayCubes=[];
            var i=0;
            var number=0;
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
            scene.background = new THREE.Color(0x99FFFF);

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

            

            const geometryFloor = new THREE.BoxGeometry(50,0.5,50);
			const materialFloor = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			const floor = new THREE.Mesh( geometryFloor, materialFloor );
            floor.position.y=-0.6;

            
            
            scene.add(floor);
            

			camera.position.z = 0.5;

           
            console.log(document)
            

			const animate = function () {
				requestAnimationFrame( animate );
                var j;
				for(j=0;j<arrayCubes.length;j++){
                    //arrayCubes[j].rotation.x += 0.01;
				     //arrayCubes[j].rotation.y += 0.01;
                }
                
                //Horizontal Slider Rotation
                
                document.getElementById("YSlider").onclick = function() {
                    scene.rotation.y+=0.1;
                };

                document.getElementById("YSlider-").onclick = function() {
                    scene.rotation.y-=0.1;
                };
                

                keydown();
				renderer.render( scene, camera );
			};

			animate();



            
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function keydown(){
    
    //scene.rotation.y+=0.1;
}