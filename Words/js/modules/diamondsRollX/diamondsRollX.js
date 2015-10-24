define(function (require, exports, module) {
	var characterModel = {
		'A' : {
			arr : [0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1],
		},
		'B' : {
			arr : [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
		},
		'C' : {
			arr : [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
			width : 7,
			height : 7
		},
		'D' : {
			arr : [0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0],
		},
		'E' : {
			arr : [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
		},
		'H' : {
			arr : [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
		},
		'I' : {
			arr : [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
		},
		'L' : {
			arr : [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
		},
		'M' : {
			arr : [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
			width : 10,
			height : 7
		},
		'N' : {
			arr : [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
			width : 8,
			height : 7
		},
		'O' : {
			arr : [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0],
		},
		'S' : {
			arr : [0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
			width : 9,
			height : 7
		},
		'T' : {
			arr : [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			width : 9,
			height : 7
		},
		'U' : {
			arr : [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1],
		},
		'V' : {
			arr : [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
		},
		'W' : {
			arr : [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0], 
		},
		'R' : {
			arr : [0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
		},
		'Y' : {
			arr : [0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
			width : 9
		},
		'.' : {
			arr : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
			width : 6
		},
		' ' : {
			'arr' : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			'width' : 2,
			'height' : 7
		},
		'|' : {
			arr : [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
			'width' : 3,
			'height' : 7
		}
	};
	
	function Effect(div){
		this.div = div;
		this.rows = 7;
		this.cols = 50;
		this.characterModel = characterModel;
		this.initial();
	}
	Effect.prototype = {
		initial : function () {
			this.mkDiamonds();
		},
		show : function (val) {
			this.show(val);
		},
		mkDiamonds : function () {
			$(this.div).css('width', this.cols * 10 + 'px');
			var div = document.createElement('div'),
				diamond,
				i,
				j;
			for (i = 0; i < this.rows; i++) {
				for (j = 0; j < this.cols; j++) {
					diamond = document.createElement('div');
					$(diamond).attr('class', 'diamond');
					$(diamond).attr('cols', j);
					$(diamond).attr('rows', i);
					$(div).append(diamond);
				}
			}
			$(this.div).append(div);
			this.diamonds = $(this.div).find('.diamond');
		},
		show : function (val) {
			this.mkModel(val);
			this.render();
			this.refresh();
		},
		mkModel : function (val) {
			var col = 7,	// 一个字符占据5列 7行
				row = 7,
				arr = [],
				i,
				config,
				model = this.characterModel,
				prop = {},
				total = 0;
			this.model = [];
			for(i = 0; i < val.length; i++) {
				prop = {};
				prop.character = val.substr(i, 1);
				// prop.rowsPosition = i * col;
				prop.rowsPosition = total;
				prop.width = this.getCharacterWidth(prop.character)
				total += prop.width;
				this.model.push(prop);
			}
		},
		getCharacterWidth : function (str) {
			var obj;
			if (this.characterModel[str]) {
				obj = this.characterModel[str];
			} else if (this.characterModel[str.toUpperCase()]) {
				obj = this.characterModel[str.toUpperCase()];
			} else {
				return this.characterModel[' '].width;
			}
			return obj.width ? obj.width : 7;
		},
		render : function () {
			var diamonds = this.diamonds,
				i,
				j,
				diamond,
				index,
				character,
				arr,
				$this = this,
				model = this.characterModel,
				rows,
				cols;
			diamonds.removeClass('active');
			this.model.forEach(function (obj) {
				rows = obj.height || 7;
				cols = obj.width || 7;
				// console.log(rows + '---' + cols + '--' + obj.character);
				character = obj.character;
				index = obj.rowsPosition;
				// console.log(obj);
				// console.log(model[character]);
				if (index > 50) {
					return false;
				}
				if (model[character]) {
					arr = model[character].arr;
				} else if (model[character.toUpperCase()]) {
					arr = model[character.toUpperCase()].arr;
				} else {
					arr = model[' '].arr;
				}
				cols = arr.length / rows;
				for (i = 0; i < rows; i++) {
					for(j = 0; j < cols; j++){
						if(arr[i * cols + j] === 1){
							// console.log(i + '--' + j + '--1');
							if ((j + index < 50) && (j + index >= 0)) {
								diamonds.eq(i * 50 + j + index).addClass('active');
							}
						}
					}
				}
			});
		},
		refresh : function () {
			var $this = this;
			setInterval(function () {
				$this.model.forEach(function (obj) {
					obj.rowsPosition -= 1;
				});
				$this.model.forEach(function (obj) {
					if (obj.rowsPosition < -10) {
						var item = $this.model.shift(),
							last = $this.model[$this.model.length - 1];
						item.rowsPosition = last.rowsPosition + last.width;
						$this.model.push(item);
					}
				});
				$this.render();
			}, 500);
		}
	};
	require.async('./index.css');
	var div = $('#aj-diamonds-roll-x');
	if (div.length !== 0) {
		(new Effect(div)).show("Welcome To My Website.");
	}
});