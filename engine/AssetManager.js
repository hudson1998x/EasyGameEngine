class AssetManager {

	static isEditor = true;

	static getAssetPath(str){

		if ( AssetManager.isEditor ) {
			return str.split('asset://').join('source/');
		} else {
			return str.split('asset://').join('/');
		}

	}
	static loadAsset(path) {
		path = AssetManager.getAssetPath(path);
		return new Promise((resolve , reject) => {

			if ( !AssetManager.fileStore) {
				let conn = window.indexedDB.open("webgl_cache" , 1);
				conn.onsuccess = (event) => {
					AssetManager.fileStoreDb = db;

					AssetManager.fileStore = AssetManager.fileStoreDb.createObjectStore("assets" , {
						keyPath: "ssn" , 
						autoIncrement: true
					});

					try{
						AssetManager.fileStore.createIndex("asset_path" , "asset_path" , {
							unique: true
						});
					}catch(e){

					} 

					const transaction = AssetManager.fileStoreDb.transaction(
						["assets"] , "readwrite"
					);

					transaction.oncomplete = () => {
						let assets = transaction.objectStore("assets");

						const index = assets.index('asset_path');

						const request = index.get(IDBKeyRange.only([path]));

						if ( request[0] && resolve[0].data ) {
							resolve(request[0].data);
						} else {
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
						}
					};
					transaction.onerror = (event) => {
						reject(event);
					}

				}
				conn.onerror = (err) => reject(err);
			}

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