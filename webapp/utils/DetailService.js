sap.ui.define([], function () {
    "use strict";

    return {
        readProducts: async function (oModel) {
            return new Promise((resolve, reject) => {
                oModel.read("/SEPMRA_C_PD_Product", {
                    filters: [new sap.ui.model.Filter("IsActiveEntity", "EQ", true)],
                    success: data => resolve(data.results),
                    error: reject
                });
            });
        }
    };
});