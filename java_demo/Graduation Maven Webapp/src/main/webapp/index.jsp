<!DOCTYPE html>
<html>
<head>

	<script src="http://apps.bdimg.com/libs/jquery/1.10.0/jquery.min.js"></script>

</head>

<body>



<script>
	$.ajax({
		url : "index?action=map",
		type : "GET",
		dataType : "json",
		success : function (json) {
			console.log(json);
		},
		error : function (err) {
			console.log(err);
		}
	});

</script>

<h2>Hello World!</h2>



</body>
</html>
