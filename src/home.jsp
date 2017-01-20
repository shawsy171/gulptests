<%--documentation: http://docs.oracle.com/javaee/5/jstl/1.1/docs/tlddocs/c/tld-summary.html --%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>

<!DOCTYPE HTML>
<html>
<head>

    <!-- This is a comment -->
    ${analytics.GTM_data_layer}

    ${analytics.GTM_head}

    <script src="https://cdn.optimizely.com/js/5603681119.js"></script>

	<!-- home.jsp -->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="canonical" href="${config.canonical_tag}">
    <meta name="robots" content="NOODP"> <!-- tell search engines not to use the decriptions etc from dmoz.org -->

	<title>${strings.title}</title>

	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/jquery.slick/1.5.7/slick.css">

    <!-- build:css /home/style.jsp.min.css -->
	<link rel="stylesheet" href="css/red.css">
	<link rel="stylesheet" href="css/blue.css">
	<!-- endbuild -->

	<!-- Font-Awesome CDN -->
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">

	<!-- fonts -->
	<link href='//fonts.googleapis.com/css?family=Open+Sans:400,600|Roboto+Condensed:400,300,700|Passion+One|Lato' rel='stylesheet' type='text/css'>

	<link rel="shortcut icon" type="image/x-icon" href="/webthemes/${config.webtheme}/favicon.ico">

	<meta name="keywords" content="${config.keywords}">
	<meta name="description" content="${strings.metaDescription} ">
	<link rel="image_src" href="/webthemes/${config.webtheme}/images/logo250x250.png">

	<meta property="og:title"  content="${strings.og_title}">
	<meta property="og:image"  content="${config.url_domain}/images/appsme-fb-image.jpg">
	<meta property="og:description"  content="${strings.og_desc}">

	<meta name="msvalidate.01" content="${config.bingWebmasterId}" />

	<!-- WOW Async Tracking Code Start -->
	<script data-cfasync='false' type='text/javascript'>
	var _wow = _wow || [];
	(function () {
		try{
			_wow.push(['setClientId', '2eee3d46-243a-4e3a-9f5b-0b1b300f248c']);
			_wow.push(['enableDownloadTracking']);
			_wow.push(['trackPageView']);
			var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
			g.type = 'text/javascript'; g.defer = true; g.async = true;
			g.src = '//t.wowanalytics.co.uk/Scripts/tracker.js';
			s.parentNode.insertBefore(g, s);
		}catch(err){}})();
	</script>
	<!-- WOW Async Tracking Code End -->

	<script>window.stripePublishableKey = '${config.stripe_publishable_key}';</script>
	<script>window.cart_abandonment_user_email = '${config.cart_abandonment_user_email}';</script>
	<script>window.exitModalEnabled = ${config.exitModalEnabled};</script>
	<script>window.exitModalState = '${config.exitModalState}';</script>
	<script>window.cookieNoticeEnabled = '${config.cookieNoticeEnabled}';</script>
	<script>window.appId = '${config.appId}';</script>

    <c:if test="${config.loadTrackJs}">
        <script type="text/javascript">
               window._trackJs = {
                    token: "0739948cb0af4db8a70887d95a38740a",
                    application: "me52environment"
               };
            </script>
            <script type="text/javascript" src="https://d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js"></script>
   	</c:if> , 'html', 'cdnify', 'clean');
});
</head>
<c:set var="bodyClass" value="${bodyClass} ${mobileDevice.isMobileDevice ? 'mobiledevice':''} 'appsme'"/>
<body class="${fn:trim(bodyClass)}">

    ${analytics.GTM_body}

	${views.mainNav}

	${views.mainContent}

	${views.footer}

	<a href="#0" class="cd-top">Top</a>

	<!-- REQUIRED LIBRARYS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

	<script src="js/lib/jquery.touchwipe.min.js"></script>
	<script src="js/lib/velocity.min.js"></script>

	<c:if test="${config.loadStripeJS}">
		<script type="text/javascript" src="https://checkout.stripe.com/checkout.js"></script>
    	<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
    	<script src="js/stripeHandler.js"></script>
	</c:if>

	<!-- FormValidation plugin and the class supports validating Bootstrap form -->

    <!-- build:js js/scripts.jsp.min.js -->
	<script type="text/javascript" src="js/script1.js"></script>
	<script type="text/javascript" src="js/script2.js"></script>
	<!-- endbuild -->


	<script>window.graphicImagePaths = JSON.parse('${config.graphicImagePaths}');</script>



</body>
</html>
