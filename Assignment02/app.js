(function() {
'use strict';

// Initialize the Angular Application
var ss = angular.module('SmartShopper', []);

// Initialize the "To Purchase" and "Purchased" Controller in our App
ss.controller('PurchaseCtrl', ShoppingListController);
ss.controller('BoughtCtrl', BoughtItemController);
// Initialize the "ShoppingList" Service in our App...
ss.service('ShoppingListSvc', ShoppingListSvc);

// Create the PurchaseCtrl Controller, begin by injecting our ShoppingListSvc
ShoppingListController.$inject = ['ShoppingListSvc'];
function ShoppingListController(ShoppingListSvc) {
	// Bind "this" to a local variable for legibility
	var Purchase = this;
	// Bind the controller scope variable "purchaseList" to the returned value of getShoppingList()
	Purchase.list = ShoppingListSvc.getShoppingList();
	// Create a function to interact with our shopping list service when we purchase an item...
	Purchase.item = function(itemIndex) {
		try {
			ShoppingListSvc.purchaseItem(itemIndex);
		} catch (err) {
			alert(err);
		}
	};
}

// Create the BoughtCtrl Controller
BoughtItemController.$inject = ['ShoppingListSvc'];
function BoughtItemController(ShoppingListSvc) {
	// Bind "this" to a local variable
	var Bought = this;
	// Bind a variable to the getPurchasedList() function
	Bought.list = ShoppingListSvc.getPurchasedList();
}




// Create the ShoppingListSvc
function ShoppingListSvc() {
	var svc = this;

	var __to_buy = [
		{
			name: 'cookies',
			quantity: 10
		},
		{
			name: 'notepads',
			quantity: 28
		},
		{
			name: 'pens',
			quantity: 15
		},
		{
			name: 'sodas',
			quantity: 24
		},
		{
			name: 'bag of chips',
			quantity: 1
		}
	];
	var __bought = [];

	svc.getShoppingList = function() {
		return __to_buy;
	};

	svc.getPurchasedList = function() {
		return __bought;
	};

	svc.purchaseItem = function(itemIndex) {
		if (typeof __to_buy[itemIndex] === 'undefined') {
			// The item index does not exist?
			return new Error("Couldn't find the desired item in your list...", itemIndex);
		}

		var item = __to_buy.splice(itemIndex,1);

		if (typeof item[0] === 'undefined') {
			// How did we splice an undefined element? That's weird...
			return new Error("You bought an undefined item... Perhaps place it next to your shrubbery?", itemIndex);
		}

		__bought.push(item[0]);

		return;
	};

}

})();