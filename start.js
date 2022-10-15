const { app , electron , BrowserWindow } = require('electron');
const fs = require('fs');

if ( !fs.existsSync('source') ) {
	fs.mkdirSync('source');
}
if ( !fs.existsSync('source/levels') ) {
	fs.mkdirSync('source/levels');
}
if ( !fs.existsSync('source/ui') ) {
	fs.mkdirSync('source/ui');
}
if ( !fs.existsSync('source/objectFactory') ) {
	fs.mkdirSync('source/objectFactory');
}
if ( !fs.existsSync('source/scripts') ) {
	fs.mkdirSync('source/scripts');
}
if ( !fs.existsSync('source/images') ) {
	fs.mkdirSync('source/images');
	fs.mkdirSync('source/images/sprite');
	fs.mkdirSync('source/images/media');
}
if ( !fs.existsSync('source/videos') ) {
	fs.mkdirSync('source/videos');
}
if ( !fs.existsSync('out') ) {
	fs.mkdirSync('out/web-deploy' , {
		recursive: true
	});
	fs.mkdirSync('out/win-desktop-x64');
	fs.mkdirSync('out/linux-desktop-x64');
	fs.mkdirSync('out/mac-osx-desktop-x64');
	fs.mkdirSync('out/android-deploy');
}

app.on('ready' , (ev) => {
	let win = new BrowserWindow({
		webPreferences: {
			nodeIntegration: true , 
			contextIsolation: false
		} , 
		fullscreen: true , 
		frame: false
	});
	win.loadFile('ui/app.html');
});