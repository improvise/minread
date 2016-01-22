(function(){
    /* loadScript: http://stackoverflow.com/a/950146 */
	var loadScript = function(url, callback) {
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;

		script.onreadystatechange = callback;
		script.onload = callback;

		head.appendChild(script);
	};

	var showMinRead = function() {
		var config = {
			'arstechnica.com': {
				textNode: "#article-guts",
				insAfter: ".date",
				before: " - ",
				after: "",
				style: "color: #777; margin: 0.5em 0;",
			},
			'www.theatlantic.com': {
				textNode: ".article-body",
				insAfter: ".article-cover-extra .byline>a",
				before: " - ",
				after: "",
				style: "color: #777; margin: 0.5em 0;",
			},
			'www.economist.com': {
				textNode: ".main-content",
				insAfter: "time",
				before: " | ",
				after: " | ",
				style: "color: #777;",
			},
			'hbr.org': {
				textNode: ".content-area--article>.article",
				insAfter: ".byline a",
				before: " - ",
				after: "",
				style: "color: #777;",
			},
			'krugman.blogs.nytimes.com': {
				textNode: "article.post",
				insAfter: "time",
				before: " | ",
				after: " | ",
				style: "color: #777;",
			},
			'nymag.com': {
				textNode: "article[data-component='story']",
				insAfter: "span[itemprop='author']",
				before: " - ",
				after: "",
				style: "color: #777; margin: 0.5em 0;",
			},
		};

		(function(articleConfig) {
			var wpm = 200;
			var lpw = 5;
			var lengthMinutes = Math.round($(articleConfig.textNode).text().trim().split(/\s/).join("").length/(wpm*lpw));
			var text = articleConfig.before + lengthMinutes + " min read" + articleConfig.after;
			var node = "<span class='slMinRead' style='" + articleConfig.style + "'>" + text + "</span>";
			$(".slMinRead").remove();
			$(node).insertAfter($(articleConfig.insAfter));
		})(config[window.location.hostname]);
	};

	if (typeof jQuery === 'undefined') {
		if (typeof $ === 'undefined') {
			console.log('Warning: MinRead is importing jQuery.');
			loadScript(
				'https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js',
				showMinRead
			);
		}
		else {
			console.error('Warning: Could not load MinRead because jQuery is missing and could not load safely.');
		}
	}
	else {
		showMinRead();
	}
})();