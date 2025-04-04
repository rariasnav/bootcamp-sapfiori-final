sap.ui.define([], function () {
    "use strict";

    return {
        readSuppliers: async function (oModel, aFilters) {
            return Promise.all([
                new Promise((resolve, reject) => {
                    oModel.read("/SEPMRA_C_PD_Supplier", {
                        urlParameters: {
                            "$expand": "to_Address"
                        },
                        filters: aFilters,
                        success: resolve,
                        error: reject
                    });
                })
            ]);
        }
    };
});