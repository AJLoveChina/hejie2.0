define(function (require, exports, module) {
	var E = require('./imgs.click.zoom.in.js'),
		target;
	$(window).on('click', function (e) {
		if (e.target.tagName.toLowerCase() === 'img') {
			target = e.target;
			(new E(target)).click();
		}
	});
});