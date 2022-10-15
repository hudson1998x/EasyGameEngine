const ELCore = require('./../SupportLibrary');

class GridAdapter extends ELCore.Component {

	constructor(props){
		super(props);
		this.props = props;
		this.listItemComponent = props.component;
		this.list = props.list;

		if ( !this.listItemComponent ) {
			throw new Error("GridAdapter::constructor requires { component: Component }");
		}
		if ( !this.list ) {
			throw new Error("GridAdapter::constructor requires { list: [...] }");
		}
	}
	render(){

		this.domElement.innerHTML = ``;
		// console.log(this);
		this.list.forEach((item) => {
			let comp = new this.listItemComponent({...this.props} , item);

			this.domElement.appendChild(comp.render());
		});

		return this.domElement;
	}

}
module.exports = GridAdapter;