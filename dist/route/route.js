"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFile = void 0;
const url_1 = __importDefault(require("url"));
const xlsx_1 = __importDefault(require("xlsx"));
const read_excel_1 = require("../read_excel");
const getFile = (req, res) => {
    const parsedUrl = url_1.default.parse(req.url, true);
    if (parsedUrl.pathname === "/") {
        const workbook = xlsx_1.default.readFile("./excel/LBrands_BFF_Initial PO_OCC Extract.xlsx");
        let worksheets = {};
        for (const sheetName of workbook.SheetNames) {
            worksheets[sheetName] = (0, read_excel_1.sheet_to_json)(workbook.Sheets[sheetName]);
        }
        //const result = sheet_to_json(workbook.Sheets["report1631502493882"]);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(worksheets));
        res.end();
    }
    else {
        res.writeHead(404);
        res.end();
        console.log("Not found");
    }
};
exports.getFile = getFile;
