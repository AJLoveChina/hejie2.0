define(function () {
	function Comment() {
		
	}
	Comment.prototype = {
			render : function () {
				console.log("I am rendering comments ui...");
				console.log("I am rendering comments ui2...");
			}
	}
	
	return new Comment();
});