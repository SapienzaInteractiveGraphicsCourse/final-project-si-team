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


            //sky

            var sky = new THREE.Sky();
			sky.scale.setScalar( 5000 );

            //sun
			const params = {
                turbidity: 1,
                mieDirectionalG: 0.65,
                mieCoefficient: 0.008,
                azimuth: 180,
                elevation: 3,
                exposure: renderer.toneMappingExposure,
                rayleigh: 4,
            };
            
            var sun = new THREE.Vector3();
            const skyParams = sky.material.uniforms;
            skyParams[ 'turbidity' ].value = params.turbidity;
            skyParams[ 'rayleigh' ].value = params.rayleigh;
            skyParams[ 'mieCoefficient' ].value = params.mieCoefficient;
            skyParams[ 'mieDirectionalG' ].value = params.mieDirectionalG;
            const phi = THREE.MathUtils.degToRad( 90 - params.elevation );
            const theta = THREE.MathUtils.degToRad( params.azimuth );
            sun.setFromSphericalCoords( 1, phi, theta );
            
            skyParams[ 'sunPosition' ].value.copy( sun );
            
            renderer.toneMappingExposure = params.exposure;
            scene.add( sky );


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

          

            
            var Goku;

            let loader = new THREE.GLTFLoader();
            var flagGoku=false;

            loader.load( 'scene.gltf', function ( gltf ) {
                Goku=gltf.scene;
                Goku.rotation.y-=Math.PI;
                Goku.scale.x=0.4;
                Goku.scale.y=0.4;
                Goku.scale.z=0.4;
                scene.add( Goku );
                flagGoku=true;
                
                //Head
                const geometryHead = new THREE.BoxGeometry( 0.3, 0.3,0.2 );
                const textureHead = new THREE.TextureLoader().load( 'textures/ArmTexture.jpg' );
                const materialHead = new THREE.MeshBasicMaterial( { map:textureHead} );
                const head = new THREE.Mesh( geometryHead, materialHead );
                head.position.y+=1.5;
                
                head.rotation.y+=Math.PI;
                head.rotation.z+=Math.PI;
                Goku.add(head);

                //Body
                const geometryBody = new THREE.BoxGeometry( 0.65, 0.7,0.4 );
                const textureBody = new THREE.TextureLoader().load( 'textures/BodyTexture.jpg' );
                const materialBody = new THREE.MeshBasicMaterial( { map:textureBody} );
                const body = new THREE.Mesh( geometryBody, materialBody );
                body.position.y+=1;
                
                body.rotation.y+=Math.PI;
                body.rotation.z+=Math.PI;
                Goku.add(body);

                //UpperLeftArm
                const geometryUpperLeftArm = new THREE.BoxGeometry( 0.1, 0.4,0.1 );
                const textureUpperLeftArm = new THREE.TextureLoader().load( 'textures/ArmTexture.jpg' );
                const materialUpperLeftArm = new THREE.MeshBasicMaterial( { map:textureUpperLeftArm} );
                const UpperLeftArm = new THREE.Mesh( geometryUpperLeftArm, materialUpperLeftArm );
                UpperLeftArm.position.y+=1.1;
                UpperLeftArm.position.x+=0.35;
                UpperLeftArm.rotation.x-=0.1;
                UpperLeftArm.rotation.z-=0.1;
                UpperLeftArm.position.x+=0.03;
                
                UpperLeftArm.rotation.y+=Math.PI;
                UpperLeftArm.rotation.z+=Math.PI;
                Goku.add(UpperLeftArm);
                
                //UpperRightArm
                const geometryUpperRightArm = new THREE.BoxGeometry( 0.1, 0.4,0.1 );
                const textureUpperRightArm = new THREE.TextureLoader().load( 'textures/ArmTexture.jpg' );
                const materialUpperRightArm = new THREE.MeshBasicMaterial( { map:textureUpperRightArm} );
                const UpperRightArm = new THREE.Mesh( geometryUpperRightArm, materialUpperRightArm );
                UpperRightArm.position.y+=1.1;
                UpperRightArm.position.x+=0.35;
                UpperRightArm.rotation.x-=0.1;
                UpperRightArm.rotation.z+=0.1;
                UpperRightArm.position.x+=0.03;
                UpperRightArm.position.x-=0.77;
                
                UpperRightArm.rotation.y+=Math.PI;
                UpperRightArm.rotation.z+=Math.PI;
                Goku.add(UpperRightArm);


                //LowerRightArm
                const geometryLowerRightArm = new THREE.BoxGeometry( 0.1, 0.25,0.1 );
                const textureLowerRightArm = new THREE.TextureLoader().load( 'textures/ArmTexture.jpg' );
                const materialLowerRightArm = new THREE.MeshBasicMaterial( { map:textureLowerRightArm} );
                const LowerRightArm = new THREE.Mesh( geometryLowerRightArm, materialLowerRightArm );
                LowerRightArm.position.y+=0.85;
                LowerRightArm.position.x+=0.3;
                LowerRightArm.rotation.x-=0.5;
                LowerRightArm.rotation.z+=0.1;
                LowerRightArm.position.z+=0.07;
                LowerRightArm.position.x+=0.05;
                LowerRightArm.position.x-=0.77;
                
                LowerRightArm.rotation.y+=Math.PI;
                LowerRightArm.rotation.z+=Math.PI;
                Goku.add(LowerRightArm);

                //LowerLeftArm
                const geometryLowerLeftArm = new THREE.BoxGeometry( 0.1, 0.25,0.1 );
                const textureLowerLeftArm = new THREE.TextureLoader().load( 'textures/ArmTexture.jpg' );
                const materialLowerLeftArm = new THREE.MeshBasicMaterial( { map:textureLowerLeftArm} );
                const LowerLeftArm = new THREE.Mesh( geometryLowerLeftArm, materialLowerLeftArm );
                LowerLeftArm.position.y+=0.85;
                LowerLeftArm.position.x+=1.12;
                LowerLeftArm.rotation.x-=0.5;
                LowerLeftArm.rotation.z-=0.1;
                LowerLeftArm.position.z+=0.07;
                LowerLeftArm.position.x+=0.05;
                LowerLeftArm.position.x-=0.77;
                
                LowerLeftArm.rotation.y+=Math.PI;
                LowerLeftArm.rotation.z+=Math.PI;
                Goku.add(LowerLeftArm);

                const geometryLeg = new THREE.BoxGeometry(0.65,0.25,0.4 );
                const textureLeg = new THREE.TextureLoader().load( 'textures/LegTexture.jpg' );
                const materialLeg = new THREE.MeshBasicMaterial( { map:textureLeg} );
                const Leg = new THREE.Mesh( geometryLeg, materialLeg );
                Leg.position.x+=0;
                Leg.position.y+=0.529;
                
                
                Leg.rotation.y+=Math.PI;
                Leg.rotation.z+=Math.PI;
                Goku.add(Leg);

               
                const geometryHair = new THREE.ConeGeometry( 0.07,0.2, 10, 33,21,0,6.3 );
                const textureHair = new THREE.TextureLoader().load( 'textures/HairTexture.jpg' );
                const materialHair = new THREE.MeshBasicMaterial( { map:textureHair} );
                const Hair = new THREE.Mesh( geometryHair, materialHair );
                Hair.position.y+=1.75;
                Hair.position.x+=0.1;
                Goku.add(Hair);

                const geometryHair1 = new THREE.ConeGeometry( 0.07,0.2, 10, 33,21,0,6.3 );
                const materialHair1 = new THREE.MeshBasicMaterial( { map:textureHair} );
                const Hair1 = new THREE.Mesh( geometryHair1, materialHair1 );
                Hair1.position.y+=1.75;
                Hair1.position.x-=0.1;
                Goku.add(Hair1);

                const geometryHair2 = new THREE.ConeGeometry( 0.14,0.35, 10, 33,21,0,6.3 );
                const materialHair2 = new THREE.MeshBasicMaterial( { map:textureHair} );
                const Hair2 = new THREE.Mesh( geometryHair2, materialHair2 );
                Hair2.position.y+=1.82;
                ;
                Goku.add(Hair2);
          
                

            }, undefined, function ( error ) {
            
                console.error( error );
            
            } );
            const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
            scene.add( directionalLight );
            
            
            

            var flagDrake;
            let loaderShenron = new THREE.GLTFLoader();
            var Drake;

            loaderShenron.load( 'Shenron/scene.gltf', function ( gltf ) {
                Drake=gltf.scene;
                Drake.scale.x=0.0004;
                Drake.scale.y=0.0004;
                Drake.scale.z=0.0004;
                Drake.position.y-=4;
            
                
                
                scene.add( Drake );
                flagDrake=true;
            
            }, undefined, function ( error ) {
            
                console.error( error );
            
            } );

            var flagTrees;
            let loaderTrees = new THREE.GLTFLoader();
            
            var indexTrees=0;
            
            var Trees;
            loaderTrees.load( 'Trees/scene.gltf', function ( gltf ) {
                Trees=gltf.scene;
                
                Trees.scale.x=0.004;
                Trees.scale.y=0.005;
                Trees.scale.z=0.004;
                Trees.position.y-=0.3;

                Trees.position.z-=10;
                
                // Drake.position.y-=4;
           
                
                scene.add(Trees);
                
                flagTrees=true;
            
            }, undefined, function ( error ) {
            
                console.error( error );
            
            } );

          
            
            

            const controls = new OrbitControls( camera, renderer.domElement );

            controls.screenSpacePanning = false;

            controls.minDistance = 2;
            controls.maxDistance = 10;
            controls.maxPolarAngle = Math.PI / 2;
            controls.keys=false;

                
            




               
            

			camera.position.z = 2;
            


            controls.update();
            document.body.addEventListener('keydown', keyPressed);
            var indiceappoggio=0;
            var direzione=0;
            var firstBB;
            var secondBB;
           
            function keyPressed(e){
                
                    controls.target=Goku.position;
                    
                switch(e.key) {
                  case 'ArrowUp':

                    firstBB = new THREE.Box3().setFromObject(Goku);

                    secondBB = new THREE.Box3().setFromObject(Trees);
                    
                    var collision = firstBB.intersectsBox(secondBB);

                    
                    
                    if(!collision){

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
                    }
                        break;
                  case 'ArrowDown':
                    firstBB = new THREE.Box3().setFromObject(Goku);

                    secondBB = new THREE.Box3().setFromObject(Trees);
                    
                    var collision = firstBB.intersectsBox(secondBB); 
                    
                    if(!collision){
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
                    }
                       
                        break;
                  case 'ArrowLeft':
                        
                        direzione+=1;
                        if(direzione==4){
                            direzione=0;
                        }
                        Goku.rotation.y+=Math.PI/2;
                        
                        //camera.position.x-=0.1;
                        console.log(direzione);
                        break;
                  case 'ArrowRight':
                        direzione-=1;
                        if(direzione==-4){
                            direzione=0;
                        }
                        Goku.rotation.y-=Math.PI/2;
                        //camera.position.x+=0.1;
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
                if(flagDrake){
                if(sumFlag==7 && generalFlag==true){
                    controls.target=Drake.position;
                     Drake.position.y+=0.01;
                     if(camera.position.z<7){
                    camera.position.z+=0.02;
                    
                 }
                     camera.position.y+=0.005;
                }
                if(Drake.position.y>0.025 && generalFlag==true &&sumFlag==7){
                    generalFlag=false;
                    alert("Congratulazioni, hai vinto!!\nEsprimi il tuo desiderio!");
                    Drake.position.y-=0.01;
                }
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