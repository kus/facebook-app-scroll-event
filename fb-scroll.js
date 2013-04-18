/**
 * Scroll event for Facebook Apps using Facebook Javascript SDK
 *
 * Event parameters:
 * pageHeight <integer> (0 - 100)
 * Height of your app in pixels
 *
 * viewportHeight <integer> (0 - 100)
 * The height of your app visible in the viewport (removes floating Facebook
 * header and static header from reported viewport height)
 *
 * viewportTop <integer> (0 - 100)
 * How many pixels down the page the top of the viewport is
 * Example: When the user is scrolled to the top of the page it will be 0
 *
 * viewportMiddle <integer> (0 - 100)
 * How many pixels down the page the middle of the viewport is
 *
 * viewportBottom <integer> (0 - 100)
 * How many pixels down the page the bottom of the viewport is
 *
 * viewportTopPercent <integer> (0 - 100)
 * Percentage of how far down the top of the viewport is on the page
 * Example: When the user is scrolled to the top of the page it will be 0
 *
 * viewportMiddlePercent <integer> (0 - 100)
 * Percentage of how far down the middle of the viewport is on the page
 * Example: When the user is scrolled to the middle of the page it will be 50
 *
 * viewportBottomPercent <integer> (0 - 100)
 * Percentage of how far down the bottom of the viewport is on the page
 * Example: When the user is scrolled to the bottom of the page it will be 100
 *
 * Usage:
 * Include this javascript file directly after your window.fbAsyncInit function
 * and before you include the Facebook Javascript SDK.
 *
 * Facebook Javascript SDK subscribing to custom event:
 * (Warning: this causes the following message to appear in the console:
 * "The method FB.Event.fire is not officially supported by Facebook and access
 * to it will soon be removed.")
 * FB.Event.subscribe('scroll', function(info){
 *     console.log('scroll', info);
 * });
 *
 * jQuery:
 * jQuery(document).on('fb-scroll', function(evt, info){
 *     console.log('scroll', info);
 * });
 *
 * Real world example "Infinite Scroll":
 * jQuery(document).on('fb-scroll', function(evt, info){
 *     if(info.viewportBottomPercent == 100){
 *         // load more content
 *     }
 * });
 *
 * Copyright (c) 2012 Blake Kus (http://blakek.us)
 * Released under MIT license.
 *
 * Twitter: @blakekus
 * Contribute: github.com/kus
 *
 * Version: 0.1.0
 */

(function(){
	var fbScroll = (function(){
		var _oldTopPercent = 0;
		var _oldBottomPercent = 0;
		var _scrollTimer = null;
		var _scrollTimerMilliseconds = 500;
		var _headerGapToIFrame = 28;
		var _init = function(){
			if (typeof window.fbAsyncInit !== 'function') {
				alert('window.fbAsyncInit does not exit yet? Place fb-scroll.js just after your window.fbAsyncInit function!');
				return;
			}
			var _oldfbAsyncInit = window.fbAsyncInit;
			window.fbAsyncInit = function() {
				_oldfbAsyncInit();
				if (typeof window.FB !== 'object') {
					alert('FB does not exist?');
					return;
				}
				if (typeof window.FB.Canvas !== 'object') {
					alert('FB.Canvas does not exist?');
					return;
				}
				if (typeof window.FB.Canvas.getPageInfo !== 'function') {
					alert('FB.Canvas.getPageInfo does not exist?');
					return;
				}
				_poll();
				_scrollTimer = setInterval(_poll, _scrollTimerMilliseconds);
			}
		};
		var _poll = function() {
			window.FB.Canvas.getPageInfo(function(info) {
				var viewportHeight = info.clientHeight,
					floatingHeaderSize = info.offsetTop - _headerGapToIFrame,
					viewportTop = info.scrollTop;
				if (viewportTop < _headerGapToIFrame) {
					// 141px header
					viewportHeight -= floatingHeaderSize + (_headerGapToIFrame - viewportTop);
				} else {
					// 113px floating header
					viewportHeight -= floatingHeaderSize;
				}
				var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
				var viewportBottom = Math.min(viewportTop + viewportHeight, pageHeight);
				var viewportTopPercent = Math.ceil(viewportTop / pageHeight * 100);
				var viewportBottomPercent = Math.min(Math.ceil(viewportBottom / pageHeight * 100), 100);
				if (viewportTopPercent != _oldTopPercent || viewportBottomPercent != _oldBottomPercent) {
					_oldTopPercent = viewportTopPercent;
					_oldBottomPercent = viewportBottomPercent;
					var obj = {
						'pageHeight': pageHeight,
						'viewportHeight': viewportHeight,
						'viewportTop': viewportTop,
						'viewportMiddle': Math.ceil(viewportTop + ((viewportBottom - viewportTop) / 2)),
						'viewportBottom': viewportBottom,
						'viewportTopPercent': viewportTopPercent,
						'viewportMiddlePercent': Math.ceil(viewportTopPercent + ((viewportBottomPercent - viewportTopPercent) / 2)),
						'viewportBottomPercent': viewportBottomPercent
					};
					// FB.Event.fire creates a console message "The method FB.Event.fire is not officially supported by Facebook and access to it will soon be removed."
					// To avoid it, you can subscribe to the event "fb-scroll" with jQuery
					if (typeof jQuery === 'function') {
						jQuery(document).trigger('fb-scroll', obj);
					} else {
						window.FB.Event.fire('scroll', obj);
					}
				}
			});
		};
		return {
			init: _init
		};
	})();

	// register window object
	if(!window.fbScroll)
		window.fbScroll = fbScroll;

	// init
	window.fbScroll.init();
})();