import Proto from './proto.js';
import Mixin from './mixin.js';
import Directive from './directive/index';

class Main {

	constructor(Vue) {
		new Proto(Vue);
		new Directive(Vue);
		new Mixin(Vue);
	}

}

export default Main;