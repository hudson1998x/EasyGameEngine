const ELCore = require('./../SupportLibrary');

class PropertyEditor extends ELCore.Component {

	getIcon(){
		return 'media/property-editor.png';
	}
	render(){
		super.render();

		this.domElement.innerHTML = `<label style="color:#fff;font-family:sans-serif;text-indent:15px;line-height:40px;display:block;border-bottom:1px solid #000;font-size:12px;">Property Editor</label>`;

		if ( !this.parent.state.activeObject ) {
			this.domElement.innerHTML += `<p class="notice error">No Active Object</p>`;
		} else {

			let d = document.createElement("div");

			d.className = 'prop-list';

			for(let prop in this.parent.state.activeObject.props){

				let a = document.createElement("div");

				if ( Array.isArray( this.parent.state.activeObject.props[prop] ) ) {
					a.innerHTML = `<label>${prop}</label>
					<div class="inputlist">
					
					</div>`;

					this.parent.state.activeObject.props[prop].forEach((value , idx) => {
						let inp = document.createElement('input');
						inp.value = value;

						if ( typeof value === 'undefined' || value === "undefined" || value == "") {
							return;
						}

						a.querySelector('.inputlist').appendChild(inp);

						inp.addEventListener('input' , () => {
							if ( inp.value === "" ) {
								this.parent.state.activeObject.props[prop].splice(idx , 1);
								this.render();
							} else {
								this.parent.state.activeObject.props[prop][idx] = inp.value;
							}
						});
					});

					let addBtn = document.createElement("button");

					addBtn.textContent = '+ Add Item';
					addBtn.onclick = () => {
						this.parent.state.activeObject.props[prop].push("");
						this.render();
					};

					a.querySelector('.inputlist').appendChild(addBtn);
					d.appendChild(a);
				} else {
					a.innerHTML = `<label>${prop}</label>
					<input type="text" value="${this.parent.state.activeObject.props[prop]}"/>`;

					let input = a.querySelector('input');

					input.addEventListener('input' , () => {
						this.parent.state.activeObject.props[prop] = input.value;
						this.parent.state.activeObject.render();
					});

					d.appendChild(a);
				}
			}
			this.domElement.appendChild(d);

		}
		return this.domElement;
	}
}

module.exports = PropertyEditor;