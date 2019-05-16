const XLSX = require('xlsx');
const excelexport = require('exceljs');
const encrypt = require('./encrypt.js');

// 获取excel xlsx文件数据
function getDataFormExcel(path){
    const workbook = XLSX.readFile(path);
    const sheetNames = workbook.SheetNames;
    const sheet1 = workbook.Sheets[sheetNames[0]];
    const cellRange = sheet1['!ref'].split(':');

    if(cellRange.length === 1){
        cellRange.push(cellRange[0]);
    }

    const result = [];
    const colStart = cellRange[0].match(/^([A-Z]+)/)[1];
    const colEnd = cellRange[1].match(/^([A-Z]+)/)[1];
    const rowStart = parseInt(cellRange[0].match(/([0-9]+)$/)[1]);
    const rowEnd = parseInt(cellRange[1].match(/([0-9]+)$/)[1]);

    let cellA = null;
    let cellB = null;
    for(let rowIndex = rowStart + 1; rowIndex <= rowEnd; rowIndex++){
        cellA = sheet1[`A${rowIndex}`];
        cellB = sheet1[`B${rowIndex}`];
        const aValue = cellA.v;
        const bValue = cellB.v;
        const mdValue = encrypt(bValue.toString());
        result.push([aValue.toString(), mdValue.toString()]);
    }
    return result;
}

// 将数据写到excel xlsx文件中
async function writeDateToExcel(conf){
    let workbook = new excelexport.stream.xlsx.WorkbookWriter();
    let sheet = workbook.addWorksheet('sheet1');
    let head = [];
    for(let i = 0; i < conf.cols.length; i++){
        head.push({ header: conf.cols[i].caption, width: conf.cols[i].width});
    }
    sheet.columns = head;
    for(let i = 0; i < conf.rows.length; i++){
        sheet.addRow(conf.rows[i]);
    }
    sheet.commit();
    await workbook.commit();
    return workbook.stream;
}

module.exports = {
    getDataFormExcel,
    writeDateToExcel
}