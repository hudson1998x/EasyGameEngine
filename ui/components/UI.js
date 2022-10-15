
class UI {

	static render(qs , component) {
		let inst = new component();
		document.querySelector(qs).appendChild(inst.render());
	}

}
module.exports = UI;