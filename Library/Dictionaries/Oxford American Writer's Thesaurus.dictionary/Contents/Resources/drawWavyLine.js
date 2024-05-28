function drawWavyLine()
{
	var spectrumLeftCell = null;
	var spectrumCenterCell = null;
	var spectrumRightCell = null;
	var tds = document.getElementsByTagName("td");
	if ( tds )
	{
		var i = tds.length - 1;
		for ( ; i >= 0 ; --i )
		{
			if ( tds[i].getAttribute("class") == "spectrum-left-column" )
				spectrumLeftCell = tds[i];
			else if ( tds[i].getAttribute("class") == "spectrum-center-column" )
				spectrumCenterCell = tds[i];
			else if ( tds[i].getAttribute("class") == "spectrum-right-column" )
				spectrumRightCell = tds[i];
		}
	}

	if ( spectrumLeftCell && spectrumCenterCell && spectrumRightCell )
	{
		var	leftWords = spectrumLeftCell.getElementsByTagName("span");
		var	leftBottomWord = leftWords[leftWords.length - 1];
		var	centerWord = spectrumCenterCell.getElementsByTagName("span")[0];
		var	rightTopWord = spectrumRightCell.getElementsByTagName("span")[0];
		if ( leftBottomWord && centerWord && rightTopWord )
		{
			var ctx = document.getCSSCanvasContext("2d", "spectrum-wavy-line-canvas", spectrumCenterCell.offsetWidth, spectrumCenterCell.offsetHeight);
			if ( ctx.previousWidth != undefined )
			{
				if ( ctx.previousWidth == spectrumCenterCell.offsetWidth && ctx.previousHeight == spectrumCenterCell.offsetHeight )
					return false;	// We don't need to redraw this time.
			}

			ctx.previousWidth = spectrumCenterCell.offsetWidth;
			ctx.previousHeight = spectrumCenterCell.offsetHeight;


			// All set. Draw!!
			//
			var endY = rightTopWord.offsetTop + (rightTopWord.offsetHeight / 2);
			var drawRectWidth = spectrumCenterCell.offsetWidth * 0.9;
			var drawRectHeight = (leftBottomWord.offsetTop + (leftBottomWord.offsetHeight / 2)) - endY;

			ctx.strokeStyle = '#909090';
			ctx.lineCap = "round";
			ctx.lineWidth = 1.2;	

			ctx.save();
			ctx.translate(spectrumCenterCell.offsetWidth * 0.05, endY);	

			ctx.beginPath();
			ctx.moveTo(0, drawRectHeight);
			ctx.bezierCurveTo(drawRectWidth * 0.65, drawRectHeight * 0.75, drawRectWidth * 0.35, drawRectHeight * 0.25, drawRectWidth, 0);
			ctx.stroke();

			ctx.restore();

			drawRectWidth = centerWord.offsetWidth;
			drawRectHeight = centerWord.offsetHeight * 1.5;
			ctx.clearRect(	(spectrumCenterCell.offsetWidth / 2) - (drawRectWidth / 2),
							(spectrumCenterCell.offsetHeight / 2) - (drawRectHeight / 2),
							drawRectWidth,
							drawRectHeight);
		}
	}
}

window.onresize = drawWavyLine;
drawWavyLine();
