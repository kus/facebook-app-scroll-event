/**
 * Scroll event for Facebook Apps using Facebook Javascript SDK
 *
 * Event parameters:
 * topPercent <integer> (0 - 100)
 * Percentage of how far down the top of the page is in view to the user.
 * Example: When the user is scrolled to the top of the page it will be 0
 *
 * bottomPercent <integer> (0 - 100)
 * Percentage of how far down the bottom of the page is in view to the user
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
 * FB.Event.subscribe('scroll', function(topPercent, bottomPercent){
 *     console.log('scroll', topPercent, bottomPercent);
 * });
 *
 * jQuery:
 * jQuery(document).on('fb-scroll', function(evt, topPercent, bottomPercent){
 *     console.log('scroll', topPercent, bottomPercent);
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
		var _scrollTimerMilliseconds = 1000;
		var _headerGapToIFrame = 28;
		var _init = function(){
			if (typeof window.fbAsyncInit !== 'function') {
				alert('window.fbAsyncInit does not exit yet? Place fb-events.js just after your window.fbAsyncInit function!');
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
				_scrollTimer = setInterval(_poll, _scrollTimerMilliseconds);
			}
		};
		var _poll = function() {
			window.FB.Canvas.getPageInfo(function(info) {
				var browserHeight = info.clientHeight,
					floatingHeaderSize = info.offsetTop - _headerGapToIFrame,
					scrollTop = info.scrollTop;
				if (scrollTop < _headerGapToIFrame) {
					// 141px header
					browserHeight -= floatingHeaderSize + (_headerGapToIFrame - scrollTop);
				} else {
					// 113px floating header
					browserHeight -= floatingHeaderSize;
				}
				var scrollBottom = scrollTop + browserHeight;
				var height = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
				var topPercent = Math.ceil(scrollTop / height * 100);
				var bottomPercent = Math.min(Math.ceil(scrollBottom / height * 100), 100);
				if (topPercent != _oldTopPercent || bottomPercent != _oldBottomPercent) {
					_oldTopPercent = topPercent;
					_oldBottomPercent = bottomPercent;
					// FB.Event.fire creates a console message "The method FB.Event.fire is not officially supported by Facebook and access to it will soon be removed."
					// To avoid it, you can subscribe to the event "fb-scroll" with jQuery
					if (typeof jQuery === 'function') {
						jQuery(document).trigger('fb-scroll', [topPercent, bottomPercent]);
					} else {
						window.FB.Event.fire('scroll', topPercent, bottomPercent);
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