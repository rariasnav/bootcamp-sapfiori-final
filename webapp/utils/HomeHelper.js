sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "com/bootcamp/sapui5/smartnewapp/utils/HomeService"
], function (JSONModel, HomeService) {
    "use strict";

    return {
        init: function (oModel) {
            this._oModel = oModel;
        },
        getSuppliers: async function (oFilters) {
            return HomeService.readSuppliers(this._oModel, oFilters)
        },
        setSuppliersModel: function (oController, aSuppliers) {
            let oListModel = oController.getOwnerComponent().getModel("SuppliersModel");
            if (!oListModel) {
                const oModel = new JSONModel([]);
                oModel.setSizeLimit(1000000);
                oController.getOwnerComponent().setModel(oModel, "SuppliersModel");
                oListModel = oController.getOwnerComponent().getModel("SuppliersModel")
            }
            oListModel.setData(aSuppliers);
        },
        setLocalModel: function (oComponent) {
            oComponent.setModel(new JSONModel({
                filterSupplierID: "",
                filterCompanyName: "",
                filterEmail: "",
                filterPhone: "",
            }), "LocalModel");
        },
    };
});