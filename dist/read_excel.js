"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sheet_to_json = void 0;
function sheet_to_json(sheet) {
    let headers = [];
    let rows = [];
    let row = {};
    let data = {
        topic: "",
    };
    let currentRow = "0";
    if (sheet == null || sheet["!ref"] == null) {
        return [];
    }
    for (const prop in sheet) {
        if (prop.replace(/^\D+/g, "") === "1") {
            data["topic"] += sheet[prop].w;
            headers.push(sheet[prop].w);
        }
        else {
            if (currentRow !== prop.replace(/^\D+/g, "")) {
                currentRow = prop.replace(/^\D+/g, "");
                if (prop.replace(/^\D+/g, "") !== "2") {
                    rows.push(row);
                }
                row = {};
            }
            row[headers[getColumnIndex(prop.replace(/[^a-z]/gi, "")) - 1]] =
                sheet[prop].w;
        }
    }
    data["headers"] = headers;
    data["rows"] = rows;
    return data;
}
exports.sheet_to_json = sheet_to_json;
function getColumnIndex(val) {
    var base = "ABCDEFGHIJKLMNOPQRSTUVWXYZ", i, j, result = 0;
    for (i = 0, j = val.length - 1; i < val.length; i += 1, j -= 1) {
        result += Math.pow(base.length, j) * (base.indexOf(val[i]) + 1);
    }
    return result;
}
// export default sheet_to_json;
// export { sheet_to_json as sheet_to_json };
