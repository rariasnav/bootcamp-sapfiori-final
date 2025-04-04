/*global QUnit*/

sap.ui.define([
	"com/bootcamp/sapui5/smartnewapp/controller/smartnewapp.controller"
], function (Controller) {
	"use strict";

	QUnit.module("smartnewapp Controller");

	QUnit.test("I should test the smartnewapp controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
