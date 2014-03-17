(function() {

	console.log('started');

	function triangleArea(x1, y1, x2, y2, x3, y3) {
		return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);

	}

	function isInside(e1, e2, e3, e) {   
	   /* Calculate area of triangle ABC */
	    A = triangleArea(e1.x, e1.y, e2.x, e2.y, e3.x, e3.y);
	 
	   /* Calculate area of triangle PBC */  
	   A1 = triangleArea(e.x, e.y, e2.x, e2.y, e3.x, e3.y);
	 
	   /* Calculate area of triangle PAC */  
	   A2 = triangleArea(e1.x, e1.y, e.x, e.y, e3.x, e3.y);
	 
	   /* Calculate area of triangle PAB */   
	   A3 = triangleArea(e1.x, e1.y, e2.x, e2.y, e.x, e.y);
	   
	   /* Check if sum of A1, A2 and A3 is same as A */
	   return A == A1 + A2 + A3;
	}

	$.fn.pressit = function() {

		$(this).bind('click', function(event) {

			topLeft = {x: 0, y: 0};
			topRight = {x: $(this).width(), y: 0};
			bottomLeft = {x: 0, y: $(this).height()};
			bottomRight = {x: $(this).width(), y: $(this).height()};
			middle = {x: $(this).width()/2, y: $(this).height()/2};

			eventXY = {x: event.offsetX, y: event.offsetY};

			istop = isInside(topLeft, topRight, middle, eventXY);
			isbottom = isInside(bottomRight, bottomLeft, middle, eventXY);
			isleft = isInside(topLeft, bottomLeft, middle, eventXY);
			isright = isInside(topRight, bottomRight, middle, eventXY);

			if (istop) {
				$(this).addClass('press-top');
			} else if (isbottom) {
				$(this).addClass('press-bottom')
			} else if (isleft) {
				$(this).addClass('press-left');
			} else if (isright) {
				$(this).addClass('press-right');
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