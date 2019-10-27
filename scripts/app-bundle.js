const displaySong = {	mounted: function() {		console.log("display-song form mounted");	},	methods: {		},	data: function () {		return {		}	},template: '	'};

// Vue Bundler CSS Lazy Load
function vueBundlerLoadCss(path) {
   var file = location.pathname.split( "/" ).pop();

   var link = document.createElement( "link" );
   link.href = path;
   link.type = "text/css";
   link.rel = "stylesheet";
   link.media = "screen,print";

   document.getElementsByTagName( "head" )[0].appendChild( link );
}

vueBundlerLoadCss("css/components/display-song.css");
