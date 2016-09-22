define(function () {
	function Comment() {
		this.className = "aj-comment-ui-area";
		this.groupIdAttr = "data-grounp-id";
	}
	Comment.prototype = {
			getGroupId : function (jDom) {
				return jDom.attr(this.groupIdAttr);
			},
			render : function () {
				console.log("I am rendering comments ui7...");
				console.log("I am rendering comments ui8...");
				console.log("I am rendering comments ui9...");
				console.log("I am rendering comments ui10...");
			}
	}
	
	return new Comment();
});