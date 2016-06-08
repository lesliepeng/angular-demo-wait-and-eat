(function(){
	'use strict';

	angular
		.module('app',[
			//Angular modules
			'ngRoute',

			//custom module
			'app.landing',

			//
			'app.waitList',
			'app.auth',
			'app.core'
		])
		.run(function() {
        	AV.initialize("OXdjANr9rRdjLX2cVhkFfLmy-gzGzoHsz", "0PfhYi7NnuusUAWGhNo06HcI");
    	});

})();


