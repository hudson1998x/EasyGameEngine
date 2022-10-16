const ELCore = require('./../SupportLibrary');

function camelToHyphen(s){
 return Object.keys(s).reduce((ac, x) => {
   var k = x.replace(/[A-Z]|^webkit|^moz/g, (c => '-' + c.toLowerCase() )) // converts  uppercase to - and lowercase
  
   return Object.assign(ac, {[k] : s[x]})
 },{})
}

class Transform extends ELCore.Component {

	getIcon(){
		return 'media/transform-move.png';
	}
	render(){
		super.render();

		this.domElement.innerHTML = `<label style="color:#fff;font-family:sans-serif;text-indent:15px;line-height:40px;display:block;border-bottom:1px solid #000;font-size:12px;">Transform</label>`;

		if ( !this.parent.state.activeObject ) {
			this.domElement.innerHTML += `<p class="notice error">No Active Object</p>`;
		} else {

			let styleProperties = [
				"top" , 
				"left" , 
				"right" , 
				"bottom" , 
				"width" , 
				"height" , 
				"background"
			];
			let d = document.createElement("div");
			d.className = 'prop-list';
			let target = this.parent.state.activeObject.domElement;

			styleProperties.forEach((name) => {
				let a = document.createElement("div");
				a.innerHTML = `<label>${name}</label>
				<input type="text" value="${this.getCssValue(target , name)}"/>`;

				let inval = a.querySelector("input");

				inval.addEventListener('input' , () => {

					if ( (target.getAttribute('style') ?? "").indexOf(name) > -1 ) {
						//update value
						target.setAttribute('style' , this.slim(this.swap(target.getAttribute("style") , name , inval.value)));

					} else {
						//create value

						target.setAttribute('style' , this.slim((target.getAttribute('style') ?? "") + ';' + name + ':' + inval.value));
					}

					this.parent.state.activeObject.props.style = target.getAttribute("style");
				});

				d.appendChild(a);
			});

			this.domElement.appendChild(d);
		}
		return this.domElement;
	}
	getCssValue(domElement , prop){
		let out = null;
		if ( domElement && (domElement.getAttribute("style") ?? "").indexOf(prop) > -1 ) {
			(domElement.getAttribute("style") ?? "").split(";").forEach((propval) => {
				let kv = propval.split(":");
				// console.log(kv);
				if ( kv[0].trim() === prop ) {
					out = kv[1];
				}
			});

			if ( out !== null ) {
				return out;
			}
		}

		// console.log(domElement.getAttribute("style") , prop);

		return "";
	}
	swap(cssstr , key , value){

		let out = '';

		cssstr.split(";").forEach((propval) => {
			if ( propval.split(":")[0].trim() == key ) {
				out += key + ":" + value + ";"
			} else {
				out += propval + ";";
			}
		});

		if ( out == "" ) {
			console.log("CSS string: " + cssstr + ", cannot be modified" , key , value);
		}

		return out;

	}
	slim(str){
		let out = str.split(';;').join(';');

		return out.split(':;').join(':inherit;');
	}
}

module.exports = Transform;