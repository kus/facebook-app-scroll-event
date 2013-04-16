Facebook App Scroll Event
====

Scroll event for Facebook Apps using Facebook Javascript SDK

Installation
----

Include this javascript file directly after your window.fbAsyncInit function and before you include the Facebook Javascript SDK.

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
	<script type="text/javascript" src="/js/fb-event.js"></script>
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

Usage
====

Facebook Javascript SDK subscribing to custom event
----

Warning: this causes the following message to appear in the console "The method FB.Event.fire is not officially supported by Facebook and access to it will soon be removed."

	FB.Event.subscribe('scroll', function(topPercent, bottomPercent){
		console.log('scroll', topPercent, bottomPercent);
	});

jQuery
----

	jQuery(document).on('fb-scroll', function(evt, topPercent, bottomPercent){
		console.log('scroll', topPercent, bottomPercent);
	});

Real world example "Infinite Scroll"
----

	jQuery(document).on('fb-scroll', function(evt, topPercent, bottomPercent){
		if(bottomPercent == 100){
			// load more content
		}
	});