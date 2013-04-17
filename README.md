# Facebook App Scroll Event

## What does it do?

In a Facebook App, there is no "scroll" event (assuming you have the scrollbars hidden on your app, as most apps do), so using this script allows you to subscribe to a custom Facebook event "scroll" or listen to the dom event "fb-scroll" and change the UI or trigger events based on the users current scroll position in your app.

## Dependencies

Facebook Javascript SDK

## Installation

Include this javascript file directly after your window.fbAsyncInit function and before you include the Facebook Javascript SDK.

```html
	<div id="fb-root"></div>
	<script>
		window.fbAsyncInit = function() {
			// init the FB JS SDK
			FB.init({
				appId      : 'YOUR_APP_ID',                        // App ID from the app dashboard
				channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel file for x-domain comms
				status     : true,                                 // Check Facebook Login status
				xfbml      : true                                  // Look for social plugins on the page
			});

			// Additional initialization code such as adding Event Listeners goes here
		};
	</script>
	<script type="text/javascript" src="/js/fb-scroll.js"></script>
	<script>
		// Load the SDK asynchronously
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/all.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>
```

# Usage

You can subscribe to a custom Facebook event "scroll" or listen to the dom event "fb-scroll" which passes an object that contains scroll parameters.

## Parameters

- **pageHeight** *integer* (0 - 100) - Height of your app in pixels.
- **viewportHeight** *integer* (0 - 100) - The height of your app visible in the viewport (removes floating Facebook header and static header from reported viewport height).
- **viewportTop** *integer* (0 - 100) - How many pixels down the page the top of the viewport is. Example: When the user is scrolled to the top of the page it will be 0.
- **viewportBottom** *integer* (0 - 100) - How many pixels down the page the bottom of the viewport is.
- **viewportTopPercent** *integer* (0 - 100) - Percentage of how far down the top of the viewport is on the page. Example: When the user is scrolled to the top of the page it will be 0.
- **viewportMiddlePercent** *integer* (0 - 100) - Percentage of how far down the middle of the viewport is on the page.
- **viewportBottomPercent** *integer* (0 - 100) - Percentage of how far down the bottom of the viewport is on the page. Example: When the user is scrolled to the bottom of the page it will be 100.

## Facebook Javascript SDK subscribing to custom event

Warning: this causes the following message to appear in the console "The method FB.Event.fire is not officially supported by Facebook and access to it will soon be removed."

```javascript
	FB.Event.subscribe('scroll', function(info){
		console.log('scroll', info);
	});
```

## jQuery

```javascript
	jQuery(document).on('fb-scroll', function(evt, info){
		console.log('scroll', info);
	});
```

## Real world example "Infinite Scroll"

```javascript
	jQuery(document).on('fb-scroll', function(evt, info){
		if(info.viewportBottomPercent == 100){
			// load more content
		}
	});
```

## Copyright

Copyright (c) 2013 Blake Kus [blakek.us](http://blakek.us)

This plugin is dual licenced under MIT and GPL Version 2 licences. 

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.