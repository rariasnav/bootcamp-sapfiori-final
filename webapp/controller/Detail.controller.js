sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/m/MessageBox",
    "com/bootcamp/sapui5/smartnewapp/utils/DetailHelper",
    "com/bootcamp/sapui5/smartnewapp/utils/formatter",
], (Controller, Fragment, MessageBox, DetailHelper, formatter) => {
    "use strict";

    return Controller.extend("com.bootcamp.sapui5.smartnewapp.controller.Detail", {
        formatter: formatter,

        onInit: async function () {
            //Set thee router and the main helper model.
            this.getOwnerComponent().getRouter().getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
            DetailHelper.init(this.getOwnerComponent().getModel());
        },

        _onObjectMatched: async function (oEvent) {
            const sSupplierID = oEvent.getParameter("arguments").supplierID;
            this._sSupplierID = sSupplierID;

            this.getView().bindElement({
                path: "/SEPMRA_C_PD_Supplier('" + sSupplierID + "')",
                parameters: {
                    expand: "to_Address"
                }
            });

            const aFilteredProducts = await DetailHelper.getProductsBySupplier(sSupplierID);
            DetailHelper.setProductsModel(this, aFilteredProducts);

            const oTable = this.byId("productsTableId");
            if (oTable) {
                const iRowCount = Math.min(aFilteredProducts.length, 20);
                oTable.setVisibleRowCount(iRowCount);
            }
        },
        onProductSelect: async function (oEvent) {
            const oContext = oEvent.getParameter("rowContext");
            const oData = oContext.getObject();
            DetailHelper.setDialogModel(this, oData);

            if (!this._oProductDialog) {
                this._oProductDialog = await Fragment.load({
                    name: "com.bootcamp.sapui5.smartnewapp.view.fragments.ProductDetailsDialog",
                    controller: this
                });

                this.getView().addDependent(this._oProductDialog);
            }


            this._oProductDialog.bindElement({
                path: "/",
                model: "DialogProductModel"
            });

            this._oProductDialog.open();
        },
        onCloseDialog: function () {
            if (this._oProductDialog) {
                this._oProductDialog.close();
            }
        },
        onOpenNewMaterialDialog: async function () {
            DetailHelper.setNewProductModel(this);

            if (!this._oNewProductDialog) {
                this._oNewProductDialog = await Fragment.load({
                    name: "com.bootcamp.sapui5.smartnewapp.view.fragments.NewProductDialog",
                    controller: this
                });

                this.getView().addDependent(this._oNewProductDialog);
            }

            //Link the model of the selected product
            this._oNewProductDialog.bindElement({
                path: "/",
                model: "NewProductModel"
            });

            this._oNewProductDialog.open();
        },
        onCloseAddItemDialog: function () {
            if (this._oNewProductDialog) {
                this._oNewProductDialog.close();
            }
        },
        onPressSaveData: function () {
            const oData = this.getView().getModel("NewProductModel").getData();
            const oBundle = this.getView().getModel("i18n").getResourceBundle();

            //Fields validation
            const bValid = oData.Product && oData.Name && oData.Price && oData.Currency;
            if (!bValid) {
                MessageBox.error(oBundle.getText("requiredFieldsMessage"));
                return;
            }

            //Add the new pruduct to the existing local model
            const oNewProduct = { ...oData };
            const oProductsModel = this.getOwnerComponent().getModel("ProductsModel");
            const aProducts = oProductsModel.getData();
            aProducts.push(oNewProduct);
            oProductsModel.setData(aProducts);

            //Update the table and focus on the created product
            const oTable = this.byId("productsTableId");
            if (oTable) {
                oTable.setVisibleRowCount(aProducts.length);

                const iLastIndex = aProducts.length - 1;
                oTable.setFirstVisibleRow(iLastIndex);
                oTable.setSelectedIndex(iLastIndex);
            }

            MessageBox.success(oBundle.getText("createdSuccessMessage"));

            //Clear the form and close the dialog
            this.getView().getModel("NewProductModel").setData({});
            this._oNewProductDialog.close();
        },
    });
});