


(function(){
	'use strict';

	angular
		.module('app.auth')
		.controller('AuthController',AuthController);

	AuthController.$inject = ['$location'];

	function AuthController($location){
		var vm = this;

		vm.user = {
			username:'',
			email:'',
			password:''
		};

		vm.register = register;
		vm.login = login;
		vm.logout = logout;

		function register(user){
			var newUser = new AV.User();// 新建 AVUser 对象实例
			  newUser.setUsername(user.username);// 设置用户名
			  newUser.setPassword(user.password);// 设置密码
			  newUser.setEmail(user.email);// 设置邮箱

			  newUser.signUp().then(function (loginedUser) {
			      vm.login(user);
			  }, (function (error) {
			  }));



		}

		function login(user){

			 AV.User.logIn(user.email, user.password)
			 	.then(function (loginedUser) {
      				console.log(loginedUser);
      				$location.path('/waitlist');
  				}, (function (error) {
  				console.log(error);
 		 		
 		 	}));

		}

		function logout(){
			console.log('logging out');
			AV.User.logOut();
 			 // 现在的 currentUser 是 null 了
  			var currentUser = AV.User.current();
  			$location.path('/');
		}
		
		

	}


})();