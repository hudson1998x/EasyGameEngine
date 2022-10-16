class AssetManager {

	static isEditor = true;

	static getAssetPath(str){

		if ( AssetManager.isEditor ) {
			return str.split('assets://').join('source/');
		} else {
			return str.split('assets://').join('/');
		}

	}
	static getPathWherever(str){
		if ( module && module.exports ) {
			if ( AssetManager.expectingImage(str) ) {
				return str.split('assets://').join('../source/');
			} else {
				return AssetManager.getAssetPath(str);
			}
		}
	}
	static expectingImage(str){
		switch(true){
			case str.indexOf('.png') > -1:
			case str.indexOf('.gif') > -1:
			case str.indexOf('.jpeg') > -1:
			case str.indexOf('.jpg') > -1:
			case str.indexOf('.ico') > -1:
			case str.indexOf('.bmp') > -1:
				return true;
			default:
				return false;
		}
	}
	static loadAsset(path) {
		path = AssetManager.getAssetPath(path);
		return new Promise((resolve , reject) => {

			let x = new XMLHttpRequest();
			x.open("GET" , path , true);
			x.onreadystatechange = () => {
				if ( x.status === 200 && x.readyState == 4 ) {
					let base64 = btoa(x.responseText);
					this.storeAsset(path , base64)
						.then(() => {
							resolve(base64);
						})
						.catch((err) => {
							console.error("Error: " + err);
							resolve(base64);
						})
				}
			};
			x.send();
		
		});

	}
	static StoreAsset(path , str){
		let transaction = AssetManager.fileStore.transaction(["assets"] , IDBTransaction.READ_WRITE);

		let put = transaction.objectStore('assets').put({
			asset_path: path , 
			data: str
		});
	}

}

module.exports = AssetManager;