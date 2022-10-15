const AssetManager = require('./../AssetManager');
const THREE = require('three');

class Object3D {
	constructor(pathToObject) {
		this.assetPath = pathToObject;
		this.mesh = null;
		this.scripts = [];
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

							this.loadMaterialsAndScripts(obj)
								.then(() => {
									resolve();
								}).catch(reject);
							
						}catch(e){
							reject(e);
						}
					break;
				}
			});
		});
	}
	loadMaterialsAndScripts(obj){
		return new Promise((resolve , reject) => {
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
				})
				.catch(reject);
			}
			if ( obj.scripts && Array.isArray(obj.scripts) ) {
				obj.scripts.forEach((script) => {
					AssetManager.loadAsset(
						script
					)
					.then((base64) => {
						let js = atob(base64);
						window.exports = {};
						eval(js);
						let obj = window.exports;

						let inst = new obj(this);

						this.scripts.push(inst);

						
					}).catch(reject);
				});
				resolve();
			}
		})
	}
}
module.exports = Object3D;