function generateTorqueGeom(force,lever){
	var mag = guiParams.forceMagnitude;
	var tMag =-mag*guiParams.forceOffset;
	var net = Math.abs(tMag);
	guiParams.torque = tMag;
	
	return generateForceGeom(net).translate(0,-(net+1.5),0);
}
function generateForceGeom(mag){
	var rod= new THREE.CylinderGeometry(.125,.125,mag, 25,2).translate(0, mag/2 +.25,0);
	rod.merge(new THREE.CylinderGeometry(.4,.0,.5, 25,8).translate(0,.25,0 ) );
	return rod;
}

function updateTorque(){
	torqueGeom = generateTorqueGeom(forceVect,lever);
	torque.children[0].geometry.dispose();
	torque.children[0].geometry = torqueGeom;
	torque.rotation.x = -Math.PI/2 * (Math.sign(guiParams.torque) || 1);
}
function updateAngMom(){
	var mmag = Math.abs(leverProps.I*leverProps.vel);
	angMomGeom = generateForceGeom(mmag).translate(0,-(mmag+1.5),0);
	//console.log(mmag);
	//console.log(angMom);
	angMom.children[0].geometry.dispose();
	angMom.children[0].geometry = angMomGeom;
	angMom.rotation.x = -Math.PI/2 *(Math.sign(leverProps.vel) ||1);
}
function reset(){
	lever.rotation.z = 0;
	forceVect.position.set(0,.25,0);
	guiParams.forceOffset = 0;
	forceGeom = generateForceGeom(2.5);
	forceVect.children[0].geometry.dispose();
	forceVect.children[0].geometry = forceGeom;
	guiParams.forceMagnitude = 2.5;
	leverProps.vel = 0;
	updateTorque();
	updateAngMom();
	controls.reset();
	camera.position.z = 7;
	
	
}

function kick(){
	var alpha = parseFloat((guiParams.torque/leverProps.I).toFixed(2));
	//console.log(typeof alpha);
	leverProps.vel += alpha;
}
function advanceFrame(){
	var t = new Date();
	var elapsed = (t.getTime()-d.getTime())/1000;
	lever.rotation.z += leverProps.vel*elapsed;
	d =  t;
	updateTorque();
	updateAngMom();
}