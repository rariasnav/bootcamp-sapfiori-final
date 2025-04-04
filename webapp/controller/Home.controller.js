sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/bootcamp/sapui5/smartnewapp/utils/HomeHelper"
],
    function (Controller, Filter, FilterOperator, HomeHelper) {
        "use strict";

        return Controller.extend("com.bootcamp.sapui5.smartnewapp.controller.Home", {
            onInit: function () {
                this.loadSuppliers();
            },
            loadSuppliers: async function () {
                const aData = await HomeHelper.getSuppliers();
                HomeHelper.setSuppliersModel(this, aData[0].results);
            },
            onFilterSuppliers: function () {
                const oModel = this.getOwnerComponent().getModel("LocalModel");
                const oData = oModel.getData();

                const oTable = this.byId("suppliersTableId");
                const oBinding = oTable.getBinding("rows");

                const aFilters = [];

                if (oData.filterSupplierID) {
                    aFilters.push(new Filter("Supplier", FilterOperator.Contains, oData.filterSupplierID));
                }

                if (oData.filterCompanyName) {
                    aFilters.push(new Filter("CompanyName", FilterOperator.Contains, oData.filterCompanyName));
                }

                if (oData.filterEmail) {
                    aFilters.push(new Filter("EmailAddress", FilterOperator.Contains, oData.filterEmail));
                }

                if (oData.filterPhone) {
                    aFilters.push(new Filter("PhoneNumber", FilterOperator.Contains, oData.filterPhone));
                }

                oBinding.filter(aFilters);
            },
            onClearFilters: function () {
                const oModel = this.getOwnerComponent().getModel("LocalModel");

                // Clear values
                oModel.setProperty("/filterSupplierID", "");
                oModel.setProperty("/filterCompanyName", "");
                oModel.setProperty("/filterEmail", "");
                oModel.setProperty("/filterPhone", "");

                // Making the search with no filters
                this.onFilterSuppliers();
            },
            onSupplierSelect: function (oEvent) {
                const oContext = oEvent.getParameter("rowContext");

                const sSupplierID = oContext.getProperty("Supplier");

                this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                    supplierID: sSupplierID
                });
            },
        });
    });
