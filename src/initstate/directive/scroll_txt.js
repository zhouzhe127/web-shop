import Vue from 'vue';

let cache = {};
let cacheId = 0;
let str = '';

let timer = function(d) {

	clearTimeout(cache[d.iscrollId]);
	str = setTimeout(() => {
		d.style.overflowY = 'hidden';
	}, 1500);
	cache[d.iscrollId] = str;
};

let over = function(e) {
	let t = e.currentTarget;
	t.style.overflowY = 'auto';
	clearTimeout(cache[t.iscrollId]);
};
let hidden = function(e) {
	let t = e.currentTarget;
	if (t.style.overflowY == 'hidden') {
		t.style.overflowY = 'auto';

	}
	timer(t);
};

Vue.directive('iscroll', {

	// 当被绑定的元素插入到 DOM 中时……
	inserted: function(el) {

		el.iscrollId = ++cacheId;
		el.addEventListener('touchstart', over);
		el.addEventListener('mouseenter', over);
		el.addEventListener('mouseleave', hidden);
		el.addEventListener('touchend', hidden);


	},
	unbind: function(el) {
		clearTimeout(cache[el.iscrollId]);
		cache[el.iscrollId] = null;
		el.removeEventListener('touchstart', over);
		el.removeEventListener('mouseenter', over);
		el.removeEventListener('mouseleave', hidden);
		el.removeEventListener('touchend', hidden);
	}
});