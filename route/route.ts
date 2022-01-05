import url from "url";
import xlsx from "xlsx";
import { sheet_to_json } from "../read_excel";

export const getFile = (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  if (parsedUrl.pathname === "/") {
    const workbook = xlsx.readFile(
      "./excel/LBrands_BFF_Initial PO_OCC Extract.xlsx"
    );

    let worksheets = {};

    for (const sheetName of workbook.SheetNames) {
      worksheets[sheetName] = sheet_to_json(workbook.Sheets[sheetName]);
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(worksheets));
    res.end();
  } else {
    res.writeHead(404);
    res.end();
    console.log("Not found");
  }
};
