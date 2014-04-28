(function() {

	console.log('started');

	function triangleArea(v1, v2, v3) {
		return Math.abs((v1.x*(v2.y-v3.y) + v2.x*(v3.y-v1.y)+ v3.x*(v1.y-v2.y))/2.0);
	}

	function polygonArea(numPoints, v) { 
		area = 0;         // Accumulates area in the loop
		j = numPoints-1;  // The last vertex is the 'previous' one to the first

		for (i=0; i<numPoints; i++) { 
			area = area + (v[j].x+v[i].x) * (v[j].y-v[i].y); 
			j = i;  //j is previous vertex to i
		}

		return Math.abs(area*.5);
	}

	function isInside(points) {

		arguments  = Array.prototype.slice.call(arguments);
		if (arguments.length <= 2) {
			return false;
		}

		point = arguments.shift();
		var polygon = polygonArea(arguments.length, arguments);
		var polygon2 = triangleArea(arguments[0], arguments[1], arguments[2]);
		var vertices = polygonArea(3, [arguments[0], arguments[arguments.length-1], points]);

		for (i = 0; i < arguments.length - 1; i++) {

			vertices += triangleArea(arguments[i], arguments[i+1], points);
		}

		console.log(polygon + ' ' + vertices)

		if (vertices == polygon) {
			return true;
		} else {
			return false;
		}
	}

	$.fn.pressit = function() {

		$(this).bind('click', function(event) {

			topLeft = {x: 0, y: 0};
			topRight = {x: $(this).width(), y: 0};
			bottomLeft = {x: 0, y: $(this).height()};
			bottomRight = {x: $(this).width(), y: $(this).height()};
			middle = {x: $(this).width()/2, y: $(this).height()/2};

			eventXY = {x: event.offsetX, y: event.offsetY};

			if (isInside(eventXY, topLeft, topRight, middle)) {
				$(this).addClass('press-top');
				$(this).html('Top');
			} else if (isInside(eventXY, bottomRight, bottomLeft, middle)) {
				$(this).addClass('press-bottom')
				$(this).html('Bottom');
			} else if (isInside(eventXY, topLeft, bottomLeft, middle)) {
				$(this).addClass('press-left');
				$(this).html('Left');
			} else if (isInside(eventXY, topRight, bottomRight, middle)) {
				$(this).addClass('press-right');
				$(this).html('Right');
			}

			window.setTimeout(function(element) {
				element.removeClass('press-top press-bottom press-left press-right');
			}, 300, $(this));
		});
	}

	$('document').ready(function() {

		$('.pressit').pressit();
	})
})();