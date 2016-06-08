


(function(){
	'use strict';

	angular
		.module('app.waitList')
		.controller('WaitListController',WaitListController);

	WaitListController.$inject = ['$scope'];

	function WaitListController($scope){
		var vm = this;

		function Party(){
			this.name = '';
			this.phone = '';
			this.size = '';
			this.done = false;
			this.notified = false;

		}

		 vm.newParty = new Party();
		 vm.addParty = addParty;
		 vm.removeParty = removeParty;
		 vm.sendTextMessage = sendTextMessage;
		 vm.toggleDone = toggleDone;

		

		getParties();

		function getParties(){

			//leancloud query
		 	var query = new AV.Query('Parties');

			query.find().then(function(results){
							
					$scope.$apply(function(){
						
						vm.parties = JSON.parse(JSON.stringify(results));
						console.log(vm.parties);
					
					})			
				
			},function(error){
				console.log('error');
			});
		}
	
		var saveObject = function(party){
			var Parties = AV.Object.extend("Parties");   
			var newParty = new Parties();
			
			newParty.set('name',party.name);
			newParty.set('phone',party.phone);
			newParty.set('size',party.size);
			newParty.set('done',party.done);
			newParty.set('notified',party.notified);

			newParty.save().then(function(){
				
				$scope.$apply(function(){
					vm.parties.push(party);
				});

			}),function(error){


			};
		}

		function addParty(){

			
			saveObject(vm.newParty);
			vm.newParty = new Party();

			


		
		}

		function removeParty(party,index){

				var theParty = AV.Object.createWithoutData('Parties', party.objectId); 
			 
    			theParty.destroy().then(function (success) {
    			// 删除成功
    			
    			$scope.$apply(function(){
    				vm.parties.splice(index,1);
    				console.log(vm.parties);
    				console.log(party.name + 's record has been removed!');
    			});

    			}, function (error) {
    			// 删除失败
    			console.log('error');
    			});

		}

		var saveMsgObject = function(party){
			var newTextMessage = {
				phoneNumber: party.phone,
				size: party.size,
				name: party.name
			};
			var TextMessages = AV.Object.extend("TextMessages");   
			var newTextMessage = new TextMessages();
			
			
			newTextMessage.set('phoneNumber',party.phone);
			newTextMessage.set('size',party.size);
			newTextMessage.set('name',party.name);
			

			newTextMessage.save();


		}

		function sendTextMessage(party){
			

			// TODO:database thing
			AV.Cloud.requestSmsCode({
	  			mobilePhoneNumber: party.phone,
	  			template: 'Notice_Welcome',
				service_name: '月度周刊',
				order_id: '7623432424540'
			}).then(function(){
			  //发送成功
			  console.log('发送成功');
			  saveMsgObject(party);

			party.notified = true;

			var theParty = AV.Object.createWithoutData('Parties', party.objectId);
			  // 更改属性
			theParty.set('notified', true);
			  // 保存
			theParty.save().then(function () {
			    console.log('saved!');
			  }, function (error) {
			    // 失败
			     console.log('error!');
			  });
			}, function(err){
			  //发送失败
			  console.log('失败');
			});

			

		}

		function toggleDone(party){

			var theParty = AV.Object.createWithoutData('Parties', party.objectId);
			// 更新属性
			theParty.set('done', party.done);
			  // 保存
			theParty.save().then(function () {
			    console.log('saved!');
			  }, function (error) {
			    // 失败
			     console.log('error!');
			  });

		}

	}


















		

})();