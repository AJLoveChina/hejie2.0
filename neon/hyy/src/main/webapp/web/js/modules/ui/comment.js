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
				console.log("I am rendering comments ui...");
				console.log("I am rendering comments ui2...");
			}
	}
	
	return new Comment();
});