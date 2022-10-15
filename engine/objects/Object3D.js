const AssetManager = require('./../AssetManager');
const THREE = require('three');

class Object3D {
	constructor(pathToObject) {
		this.assetPath = pathToObject;
		this.mesh = null;
	}
	load(){
		return new Promise((resolve , reject) => {
			AssetManager.loadAsset(
				this.assetPath
			)
			.then((base64) => {
				let raw = atob(base64);

				let obj = JSON.parse(raw);

				switch(obj.meshType){
					case "obj":
						try{
							this.loader = new THREE.OBJLoader();
							this.mesh = this.loader.parse(obj.mesh);

							for(let prop in obj.material) {
								AssetManager.loadAsset(
									obj.material[prop].src
								)
								.then((base64) => {
									 let img = new Image();
									 let texture = new THREE.Texture(img);
									 img.onload = () => {
									 	texture.needsUpdate = true;
									 };
									 img.src = 'data:' + obj.material[prop].mime + ';base64,' + base64;
									 this.mesh.material[prop] = img;
								});
							}
							resolve();
						}catch(e){
							reject(e);
						}
					break;
				}
			});
		});
	}
}
module.exports = Object3D;