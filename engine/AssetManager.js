class AssetManager {

	static isEditor = true;

	static getAssetPath(str){

		if ( AssetManager.isEditor ) {
			return str.split('assets://').join('source/');
		} else {
			return str.split('assets://').join('/');
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