sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "com/bootcamp/sapui5/smartnewapp/utils/DetailService",
  ], function (JSONModel, DetailService) {
    "use strict";
  
    return {
      init: function (oModel) {
        this._oModel = oModel;
      },
      getProductsBySupplier: async  function (supplierID) {
        const aProducts = await DetailService.readProducts(this._oModel);
        return aProducts.filter(p => p.Supplier === supplierID);
      },
      setProductsModel: function (oController, aProducts) {
        let oListModel = oController.getOwnerComponent().getModel("ProductsModel");
        if (!oListModel) {
            const oModel = new JSONModel([]);
            oModel.setSizeLimit(1000000);
            oController.getOwnerComponent().setModel(oModel, "ProductsModel");
            oListModel = oController.getOwnerComponent().getModel("ProductsModel");
        }
        oListModel.setData(aProducts);
      },
      setDialogModel: function (oController, oProductData) {
        let oProductModel = oController.getOwnerComponent().getModel("DialogProductModel");

        if (!oProductModel) {
            const oModel = new JSONModel({});
            oModel.setSizeLimit(1000000);
            oController.getOwnerComponent().setModel(oModel, "DialogProductModel");
            oController.getView().setModel(oModel, "DialogProductModel");
            oProductModel = oController.getOwnerComponent().getModel("DialogProductModel");
        }
        oProductModel.setData(oProductData);

        oController.getView().setModel(oProductModel, "DialogProductModel");
      },
      setNewProductModel: function (oController) {
        let oCreateModel = oController.getOwnerComponent().getModel("NewProductModel");
        if (!oCreateModel) {
          const oModel = new JSONModel({
            Product: "",
            Name: "",
            Price: "",
            Currency: ""
          });
          oModel.setSizeLimit(1000000);
          oController.getOwnerComponent().setModel(oModel, "NewProductModel");
          oController.getView().setModel(oModel, "NewProductModel");
          oCreateModel = oController.getOwnerComponent().getModel("NewProductModel");
        }

        // Set default empty values every time we prepare the model
        oCreateModel.setData({
          Product: "",
          Name: "",
          Price: "",
          Currency: ""
        });

        oController.getView().setModel(oCreateModel, "NewProductModel");
      },
    };
  });