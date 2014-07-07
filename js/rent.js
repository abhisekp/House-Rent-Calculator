$.noConflict();

(function ($) {
	/* Declare all contants or literals */
	var rupees = '&#x20B9;';
	var generalInfoValues = {
		totalCleaningCharge: 400,
		totalElectricityCost: 0,
		totalUnits: 0,
		billDate: Date.now()
	};
	var appliances = ['fridge', 'fan', 'desktop', 'bulb', 'tubelight', 'laptop'];

	/* Room Constructor */
	function Room(roomNumber, pendingAmount, givenAmount, appliances, submeter, submeterUnits) {
		this.roomNumber = roomNumber || 0;
		this.pendingAmount = pendingAmount || 0;
		this.givenAmount = givenAmount || 0;
		this.appliances = appliances || [];
		this.submeter = submeter || false;
		this.submeterUnits = submeterUnits || undefined;
	}

	/* Display Appliances in the Room */
	Room.prototype.displayAppliances = function () {
		if (this.appliances !== null || typeof this.appliances !== 'undefined') {
			for (var i = 0; i < this.appliances.length; i++) {
				console.log(this.appliances[i].name + ' - ' + this.appliances[i].quantity);
			}
		}
	};

	function Appliance(name, quantity) {
		this.name = name;
		this.quantity = quantity;
	}

	$(document).ready(function () {
		var roomHeading = $('.room-heading');
		var generalInfo = $('.general-info');
		var specificInfo = $('.specific-info');
		var mainHeader = $('#main-header');
		var totalCleaningChargeField = $('#total-cleaning-charge');
		var totalElectricityCostField = $('#total-electricity-cost');
		var totalUnitsField = $('#total-units');
		var billDateField = $('#bill-date');
		var appliancesField = $('#appliances');
		var rooms = new Array(4);
		var currRoom = 0;


		function loadSpecificContent() {
			currRoom = parseInt($(this).data('room-number'), 10);

			/* Add room number to all room-number elements */
			updateRoomNumber.call(this);
			updateRoomRent.call(this);

			roomHeading.css('display', 'block');
			specificInfo.css('display', 'block');
		}

		function unloadSpecificContent() {
			roomHeading.css('display', 'none');
			specificInfo.css('display', 'none');
		}

		function updateRoomNumber() {
			$('body').find('.room-number').text(currRoom);
		}

		function updateRoomRent() {
			var roomRent = parseInt($(this).data('rent'), 10);
			$('body').find('.room-rent').text(roomRent);
		}

		function updateMotorCharge() {
			var motorCharge = $(this).data('motor-charge');
		}

		function updateBillDate(date) {
			if (typeof date === 'undefined') {
				date = new Date(generalInfoValues.billDate);
			}
			billDateField.val(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate());
		}

		function addGeneralInfo() {
			generalInfoValues.totalCleaningCharge = parseInt(totalCleaningChargeField.val(), 10);
			generalInfoValues.totalElectricityCost = parseInt(totalElectricityCostField.val(), 10);
			generalInfoValues.totalUnits = parseInt(totalUnitsField.val(), 10);
			generalInfoValues.billDate = new Date(billDateField.val()).getTime();
		}

		function addSpecificInfo() {
			var roomAppliances = [];
			var quantity;

			var pendingAmount = parseInt($('#pending-amount').val(), 10);
			var givenAmount = parseInt($('#given-amount').val(), 10);

			var submeter = false;
//			@TODO Add submeter reading check & get submeter units

			for (var i = 0; i < appliances.length; i++) {
				var appliance = appliancesField.find('[value="' + appliances[i] + '"]');
				if (appliance.is(':checked')) {
					quantity = parseInt(appliance.parent().find('[id$="quantity"]').val(), 10);
					roomAppliances.push(new Appliance(appliances[i], quantity));
				}
			}

			/* Add current specific info to room */
			rooms[currRoom - 1] = new Room(currRoom, pendingAmount, givenAmount, roomAppliances, submeter);

//			Display Current Room Info @FixMe Delete
			for (i = 0; i < rooms.length; i++) {
				if (typeof rooms[i] === 'undefined' || rooms[i] === null) {
					continue;
				}
				for (var room in rooms[i]) {
					if (rooms[i].hasOwnProperty(room)) {
						console.log(room + ' - ' + rooms[i][room]);
					}
				}
				rooms[i].displayAppliances();
			}

		}

		/* Initialize */
		/* Unload all Rooms */
		unloadSpecificContent();

		/* Update Bill Date*/
		updateBillDate();

		$('.house').click(function (e) {
			e.stopPropagation();
			$('.room').removeClass('room-hover');

			/* Unload all Rooms */
			unloadSpecificContent();
		});

		$('.room').click(function (e) {
			e.stopPropagation();

			/* Update Navigation highlighing */
			$('.room').removeClass('room-hover');
			$(this).addClass('room-hover');

			/* Load Specific Room */
			loadSpecificContent.call(this);

			/* When new room is selected scroll to top */
//			$('#body').scrollTop(0);
		});

		$('#add-general-info').click(function (e) {
			e.preventDefault();
			e.stopPropagation();

			addGeneralInfo();
		});

		$('#add-specific-info').click(function (e) {
			e.preventDefault();
			e.stopPropagation();

			addSpecificInfo(currRoom);
		});

//		@TODO Fade while scrolling
		/*$('#body').scroll(function (e) {
		 mainHeader.addClass('main-header-scroll');
		 });*/
	});
})(jQuery);

