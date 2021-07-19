            const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            var arrayCubes=[];
            var i=0;
            var number=0;
            import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
            import { GLTFLoader } from '/three.js-master/examples/jsm/loaders/GLTFLoader.js';
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
            scene.background = new THREE.Color(0x99FFFF);
            camera.position.set( 1, 0.5, 5 );
            var flag0=true;
            var flag1=true;
            var flag2=true;
            var flag3=true;
            var flag4=true;
            var flag5=true;
            var flag6=true;
            var arrayCheck=[false,false,false,false,false,false,false];
            var sumFlag=0;
            var generalFlag=true;
            const light = new THREE.AmbientLight( 0x404040,4 ); // soft white light
            scene.add( light );


			// const geometry = new THREE.BoxGeometry(1,1,1);
			// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
			// const cube = new THREE.Mesh( geometry, material );
            // cube.position.x=1;
            
            var signX;
            var signY;
            var flagSignX;
            var flagSignY;
            var Cordinates= new Array();
            var Objects=new Array();
            var Cordinates_x;
            var Cordinates_y;
            while(number<7){

                const geometry = new THREE.SphereGeometry(0.1, 20,20,20,20,20,20);
                const texture = new THREE.TextureLoader().load( 'textures/Fire.jpg' );
                const material = new THREE.MeshBasicMaterial( { map:texture} );
                const sphere = new THREE.Mesh( geometry, material );
                flagSignX=Math.random();
                if(flagSignX>=0.5){
                    signX=1;
                }
                else{
                    signX=-1;
                }
                flagSignY=Math.random();
                if(flagSignY>=0.5){
                    signY=1;
                }
                else{
                    signY=-1;
                }
                Cordinates_x=Math.random()*10*signX;
                Cordinates_y=Math.random()*10*signY;
                Cordinates.push((Cordinates_x,0,Cordinates_y));
                Objects.push(sphere);
                sphere.position.set(Cordinates_x,0,Cordinates_y);
                scene.add(sphere);
                number=number+1;
                
            }

           

            

            const geometryFloor = new THREE.BoxGeometry(1500,0.5,1500);
            const textureFloor = new THREE.TextureLoader().load( 'textures/grassTexture.jpeg');
			const materialFloor = new THREE.MeshBasicMaterial( { map: textureFloor } );
			const floor = new THREE.Mesh( geometryFloor, materialFloor );
            floor.position.y=-0.6;

            
            
            scene.add(floor);

            const geometryDrake = new THREE.TorusKnotGeometry( 1, 0.4, 52, 15,6,3 )
            const textureDrake = new THREE.TextureLoader().load( 'textures/dragonGreen.jpg');
            const materialDrake = new THREE.MeshBasicMaterial( { map: textureDrake} );
            const Drake = new THREE.Mesh( geometryDrake, materialDrake );
            Drake.position.set(0,-1,0);
            scene.add(Drake);

           
            
            var boxDrake = new THREE.Box3().setFromObject( Drake );
           
            


            Drake.position.y-=1.5;

            const geometryDrakeHead = new THREE.SphereGeometry(0.4, 20,20,20,20,20,20);
            const textureDrakeHead = new THREE.TextureLoader().load( 'textures/fire.jpg');
            const materialDrakeHead = new THREE.MeshBasicMaterial( {map: textureDrakeHead} );
            const DrakeHead = new THREE.Mesh( geometryDrakeHead, materialDrakeHead );
            DrakeHead.rotation.y+=4.5;
            DrakeHead.position.set(0.2,0.6,0.4);
            Drake.add(DrakeHead);


            const geometryDrakeEye = new THREE.SphereGeometry( 0.05, 32, 32);
            const textureDrakeEye = new THREE.TextureLoader().load( 'textures/Eye.jpg');
            const materialDrakeEye = new THREE.MeshBasicMaterial( {map: textureDrakeEye} );
            const DrakeEye = new THREE.Mesh( geometryDrakeEye, materialDrakeEye );
            DrakeEye.position.set(0.1,0.6,0.75);
            DrakeEye.rotation.y-=1;
            Drake.add(DrakeEye);

            const geometryDrakeEye1 = new THREE.SphereGeometry( 0.05, 32, 32);
            const textureDrakeEye1 = new THREE.TextureLoader().load( 'textures/Eye.jpg');
            const materialDrakeEye1 = new THREE.MeshBasicMaterial( {map: textureDrakeEye1} );
            const DrakeEye1 = new THREE.Mesh( geometryDrakeEye1, materialDrakeEye1 );
            DrakeEye1.position.set(0.4,0.6,0.7);
            DrakeEye1.rotation.y-=1;
            Drake.add(DrakeEye1);

            const geometryDrakeMouth = new THREE.BoxGeometry( 0.2, 0.1, 0.04);
            const textureDrakeMouth = new THREE.TextureLoader().load( 'textures/MouthTexture.jpg');
            const materialDrakeMouth = new THREE.MeshBasicMaterial( {map: textureDrakeMouth} );
            const DrakeMouth = new THREE.Mesh( geometryDrakeMouth, materialDrakeMouth );
            DrakeMouth.position.set(0.25,0.4,0.72);
            
            DrakeMouth.rotation.y+=0.2;
            
            
            Drake.add(DrakeMouth);


            // const geometryPlayer=new THREE.BoxGeometry(0.5,0.5,0.5);
            // const texturePlayer=new THREE.TextureLoader().load( 'textures/MouthTexture.jpg');
            // const materialPlayer= new THREE.MeshBasicMaterial({map:texturePlayer});
            // const Player=new THREE.Mesh(geometryPlayer,materialPlayer);
            // Player.position.set(1,-0.1,1);
            // scene.add(Player);

            
            var Goku;

            const loader = new GLTFLoader();
            var flagGoku=false;

            loader.load( 'scene.gltf', function ( gltf ) {
                Goku=gltf.scene;
                Goku.rotation.y-=Math.PI;
                scene.add( Goku );
                flagGoku=true;
            
            }, undefined, function ( error ) {
            
                console.error( error );
            
            } );
            
            

            const controls = new OrbitControls( camera, renderer.domElement );

            controls.screenSpacePanning = false;

            controls.minDistance = 2;
            controls.maxDistance = 10;
            controls.maxPolarAngle = Math.PI / 2;
            controls.keys=false;
            


            
            


            // var indexDrake=0;
            // var xIndex=0.1;
            // var yIndex=0.1;
            // var vec=(0.1,0.1,0.1);
            // for(indexDrake=0.1;indexDrake<0.8;indexDrake=indexDrake+0.1){
            //     const geometryDrake = new THREE.CylinderGeometry( 0.1,0.1,0.1);
            //     var stringPath=''
            //     if(indexDrake==0.1){
            //         stringPath='textures/DragonHead.jpg';
                    
            //     }
            //     else{
            //         stringPath='textures/dragon.jpg';
            //     }
            //     const textureDrake = new THREE.TextureLoader().load( stringPath);
            //     const materialDrake = new THREE.MeshBasicMaterial( { map: textureDrake} );
            //     const Drake = new THREE.Mesh( geometryDrake, materialDrake );
            //     Drake.position.x+=indexDrake;
            //     Drake.position.y+=Math.exp(yIndex)/9;
            //     scene.add(Drake);
            //     yIndex+=0.1;
            //     Drake.rotation.z+=1.58+Math.exp(yIndex)/10;
            // }

            // const geometryDrakeHead= new THREE.CylinderGeometry( 0.2,0.1,0.1);
            // stringPath='textures/DragonHead.jpg';
            // const textureDrakeHead = new THREE.TextureLoader().load( stringPath);
            // const materialDrakeHead = new THREE.MeshBasicMaterial( { map: textureDrakeHead} );
            // const DrakeHead = new THREE.Mesh( geometryDrakeHead, materialDrakeHead );
            // DrakeHead.position.x+=0.1;
            // DrakeHead.position.y+=Math.exp(0.1)/9;
            // scene.add(DrakeHead);
            // DrakeHead.rotation.z+=1.57+Math.exp(0.1)/10;

            // const geometryDrakeHead1= new THREE.CylinderGeometry( 0.1,0.2,0.2);
            // stringPath='textures/DragonHead.jpg';
            // const textureDrakeHead1 = new THREE.TextureLoader().load( stringPath);
            // const materialDrakeHead1 = new THREE.MeshBasicMaterial( { map: textureDrakeHead1} );
            // const DrakeHead1 = new THREE.Mesh( geometryDrakeHead1, materialDrakeHead1 );
            // DrakeHead1.position.x-=0.048;
            
            // DrakeHead.add(DrakeHead1);



               
            

			camera.position.z = 2;
            


            controls.update();
            document.body.addEventListener('keydown', keyPressed);
            var indiceappoggio=0;
            var direzione=0;
           
            function keyPressed(e){
                
                    controls.target=Goku.position;
                    
                switch(e.key) {
                  case 'ArrowUp':
                        if(direzione==0){
                            Goku.position.z-=0.1;
                            camera.position.z-=0.1;
                        }
                        if(direzione==-1){
                            Goku.position.x+=0.1;
                            camera.position.x+=0.1;
                        }
                        if(direzione==-2){
                            Goku.position.z+=0.1;
                            camera.position.z+=0.1;
                        }
                        if(direzione==-3){
                            Goku.position.x-=0.1;
                            camera.position.x-=0.1;
                        }

                        if(direzione==1){
                            Goku.position.x-=0.1;
                            camera.position.x-=0.1;
                        }
                        if(direzione==2){
                            Goku.position.z+=0.1;
                            camera.position.z+=0.1;
                        }
                        if(direzione==3){
                            Goku.position.x+=0.1;
                            camera.position.x+=0.1;
                        }
                        break;
                  case 'ArrowDown':
                        
                        if(direzione==0){
                            Goku.position.z+=0.1;
                            camera.position.z+=0.1;
                        }
                        if(direzione==-1){
                            Goku.position.x-=0.1;
                            camera.position.x-=0.1;
                        }
                        if(direzione==-2){
                            Goku.position.z-=0.1;
                            camera.position.z-=0.1;
                        }
                        if(direzione==-3){
                            Goku.position.x+=0.1;
                            camera.position.x+=0.1;
                        }

                        if(direzione==1){
                            Goku.position.x+=0.1;
                            camera.position.x+=0.1;
                        }
                        if(direzione==2){
                            Goku.position.z-=0.1;
                            camera.position.z-=0.1;
                        }
                        if(direzione==3){
                            Goku.position.x-=0.1;
                            camera.position.x-=0.1;
                        }
                       
                        break;
                  case 'ArrowLeft':
                        
                        direzione+=1;
                        if(direzione==4){
                            direzione=0;
                        }
                        Goku.rotation.y+=Math.PI/2;
                        
                        camera.position.x-=0.1;
                        console.log(direzione);
                        break;
                  case 'ArrowRight':
                        direzione-=1;
                        if(direzione==-4){
                            direzione=0;
                        }
                        Goku.rotation.y-=Math.PI/2;
                        camera.position.x+=0.1;
                        console.log(direzione);
                        break;
                        
                }
                e.preventDefault();
               
              }
            
            var FlagDrake=false;
            var indexarraysphere=0;
			const animate = function () {
				requestAnimationFrame( animate );
                var j;
			
                
                 if(FlagDrake){
                     
                 }
                for(indexarraysphere=0;indexarraysphere<Objects.length;indexarraysphere++){
                    Objects[indexarraysphere].rotation.y+=0.02;
                }
                
                
                //Horizontal Slider Rotation
                
                document.getElementById("YSlider").onclick = function() {
                    scene.rotation.y+=0.1;
                };

                document.getElementById("YSlider-").onclick = function() {
                    scene.rotation.y-=0.1;
                };


            
            // for(indexarraysphere=0;indexarraysphere<Objects.length;indexarraysphere++){   
            //     var xDif = Player.position.x - Objects[indexarraysphere].position.x;
            //     var yDif = Player.position.z - Objects[indexarraysphere].position.z;
            //   if (yDif < 0.4 && yDif > -0.4 && xDif < 0.4 && xDif > -0.4){
            //     scene.remove(Objects[indexarraysphere]); 
            //     Objects.pop(Objects[indexarraysphere]);
            //     console.log(Objects);
            //     sumFlag+=1;
            //     console.log(sumFlag);
            //     break;

            //   }


            // }

            if(generalFlag && flagGoku){

                
                if(flag0){
                    var xDif = Goku.position.x - Objects[0].position.x;
                    var yDif = Goku.position.z - Objects[0].position.z;
                    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1){
                        scene.remove(Objects[0]); 
                        
                        sumFlag+=1;
                        flag0=false;
                    }
                }

                if(flag1){
                    var xDif = Goku.position.x - Objects[1].position.x;
                    var yDif = Goku.position.z - Objects[1].position.z;
                    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1){
                        scene.remove(Objects[1]); 
                        
                        sumFlag+=1;
                        flag1=false;
                    }
                }

                if(flag2){
                    var xDif = Goku.position.x - Objects[2].position.x;
                    var yDif = Goku.position.z - Objects[2].position.z;
                    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1){
                        scene.remove(Objects[2]); 
                        
                        sumFlag+=1;
                        flag2=false;
                    }
                }

                if(flag3){
                    var xDif = Goku.position.x - Objects[3].position.x;
                    var yDif = Goku.position.z - Objects[3].position.z;
                    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1){
                        scene.remove(Objects[3]); 
                        
                        sumFlag+=1;
                        flag3=false;
                    }
                }

                if(flag4){
                    var xDif = Goku.position.x - Objects[4].position.x;
                    var yDif = Goku.position.z - Objects[4].position.z;
                    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1){
                    scene.remove(Objects[4]); 
                    
                    sumFlag+=1;
                    flag4=false;
                    }
                }
                if(flag5){
                    var xDif = Goku.position.x - Objects[5].position.x;
                    var yDif = Goku.position.z - Objects[5].position.z;
                    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1){
                    scene.remove(Objects[5]); 
                    
                    sumFlag+=1;
                    flag5=false;
                    }
                }
                if(flag6){
                    var xDif = Goku.position.x - Objects[6].position.x;
                    var yDif = Goku.position.z - Objects[6].position.z;
                    if (yDif < 1 && yDif > -1 && xDif < 1 && xDif > -1){
                    scene.remove(Objects[6]); 
                    
                    sumFlag+=1;
                    flag6=false;
                    }
                }
                
               
                // console.log(sumFlag);
                // console.log(Objects);
            }


                keydown();
                
                if(sumFlag==7 && generalFlag==true){
                    controls.target=Drake.position;
                     Drake.position.y+=0.01;
                     if(camera.position.z<7){
                    camera.position.z+=0.02;
                    
                 }
                     camera.position.y+=0.005;
                }
                if(Drake.position.y>3 && generalFlag==true &&sumFlag==7){
                    generalFlag=false;
                    alert("Congratulazioni, hai vinto!!\nEsprimi il tuo desiderio!");
                }


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

function checkTouching(a, d) {
    let b1 = a.position.y - a.geometry.parameters.height / 2;
    let t1 = a.position.y + a.geometry.parameters.height / 2;
    let r1 = a.position.x + a.geometry.parameters.width / 2;
    let l1 = a.position.x - a.geometry.parameters.width / 2;
    let f1 = a.position.z - a.geometry.parameters.depth / 2;
    let B1 = a.position.z + a.geometry.parameters.depth / 2;
    let b2 = d.position.y - d.geometry.parameters.height / 2;
    let t2 = d.position.y + d.geometry.parameters.height / 2;
    let r2 = d.position.x + d.geometry.parameters.width / 2;
    let l2 = d.position.x - d.geometry.parameters.width / 2;
    let f2 = d.position.z - d.geometry.parameters.depth / 2;
    let B2 = d.position.z + d.geometry.parameters.depth / 2;
    if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
      return false;
    }
    return true;
  }