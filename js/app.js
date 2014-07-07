/**
 * Author: Abhisek Pattnaik <abhisekp@engineer.com>
 * Created: 07-07-2014 06:05 AM
 */

(function () {
	var rupees = '&#x20B9;';

	var app = angular.module('RentApp', []);

	app.run(function ($rootScope) {
		$rootScope.isDivEnabled = true;
		$rootScope.house = {
			rooms: [],
			appliances: ['fridge', 'fan', 'desktop', 'bulb', 'tubelight', 'laptop']
		}
	});

	app.directive('loginForm', function () {
		return {
			restrict: 'C',
			templateUrl: 'login-form.html',
			replace: false
		};
	});

	app.directive('form2', function () {
		return {
			restrict: 'C',
			templateUrl: 'form-2.html',
			replace: false,
			controller: 'PersonController',
			controllerAs: 'PersonCtrl'
		};
	});

	app.controller('RoomController', function () {
		this.persons = [];
		this.roomNumber = 0;
		this.pendingAmount = 0.0;
		this.givenAmount = 0.0;
		this.appliances = [];
		this.submeter = false;
		this.submeterUnits = 0;

		this.addAppliance = function (appliance) {
			this.appliances.push(appliance);
		};

		this.addPerson = function () {
//			@TODO Algo to add this person to persons array in RoomController
		};

		this.removeAppliance = function (appliance) {
//			@TODO Algo for removing appliance
//			this.appliances.remove(appliance);
		}
	});

	app.controller('HouseController', function () {

	});

	app.controller('ApplianceController', function () {
		this.name = '';
		this.quantity = 0;
	});

	app.controller('PersonController', function () {
		this.name = {
			firstName: '',
			lastName: ''
		};
		this.gender = '';

	})
})();