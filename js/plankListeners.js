function initializeListeners(){
	
	camControls.onChange(function(value){
		controls.enabled = value;
	});
	
	offSet.onChange(function(value){
		forceVect.position.x = value*5;
	});
	
	fMagControls.onChange(function(value){
		forceGeom = generateForceGeom(value);
		forceVect.children[0].geometry.dispose();
		forceVect.children[0].geometry = forceGeom;
		updateTorque();
		//forceVect.position.setY(.25);
	});
	
	torqueDisplay.onChange(function(value){
		if(value){
			scene.add(torque);
		}
		else{
			scene.remove(torque);
		}
	});
	
	angMomDisplay.onChange(function(value){
		if(value){
			scene.add(angMom);
		}
		else{
			scene.remove(angMom);
		}
	});
}
