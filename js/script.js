/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *   
 * Author: Richard Shepherd
 * 		   www.richardshepherd.com
 * 		   @richardshepherd   
 */

// On your marks, get set...
$(document).ready(function(){
						
	// Cache the Window object捕获窗体对象
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite捕获y轴的偏移量和每一个sprite的速度
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	});
	
	// For each element that has a data-type attribute  对于每一个元素都有一个数据类型的属性
	$('section[data-type="background"]').each(function(){
	
	
		// Store some variables based on where we are  基于我们所在的位置存储一些变量
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...    当窗体开始滚动
	    $(window).scroll(function() {
	
			// If this section is in view    如果这个区域可视
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
	
				// Scroll the background at var speed         滚动这个背景以变量设定的速度
				// the yPos is a negative value because we're scrolling it UP!		因为我们向上滚动他，所以yPos是一个负值						
				var yPos = -($window.scrollTop() / $self.data('speed')); 
				
				// If this element has a Y offset then add it on  如果这个元素有y轴上的偏移量，那么就加上他
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				// Put together our final background position   把我们最后的背景位置放在一起
				var coords = '50% '+ yPos + 'px';

				// Move the background      移动背景
				$self.css({ backgroundPosition: coords });
				
				// Check for other sprites in this section	     检查这个区域内的别的sprites
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite   捕获sprite
					var $sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite   用相同的算法来算出移动到sprite有多远
					var yPos = -($window.scrollTop() / $sprite.data('speed'));					
					var coords = $sprite.data('Xposition') + ' ' + (yPos + $sprite.data('offsetY')) + 'px';
					
					$sprite.css({ backgroundPosition: coords });													
					
				}); // sprites
			
				// Check for any Videos that need scrolling        检查所有需要滚动的video 
				$('[data-type="video"]', $self).each(function() {
					
					// Cache the video     捕获video
					var $video = $(this);
					
					// There's some repetition going on here, so      这里有一些重复的运行，所以将这些区域轻松地整理起来
					// feel free to tidy this section up. 
					var yPos = -($window.scrollTop() / $video.data('speed'));					
					var coords = (yPos + $video.data('offsetY')) + 'px';
	
					$video.css({ top: coords });													
					
				}); // video	
			
			}; // in view
	
		}); // window scroll
			
	});	// each data-type

}); // document ready
