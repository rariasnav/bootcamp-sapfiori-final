sap.ui.define([], function () {
    "use strict";

    return {
        getCountryFromAddress: function (sFullAddress) {
            if (!sFullAddress) return "";
            const aLines = sFullAddress.split("\\n");
            return aLines[aLines.length - 1] || "";
        },
    };
});