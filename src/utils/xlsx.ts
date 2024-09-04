import { utils, writeFile, read, WorkSheet } from 'xlsx';
interface GenericObject {
    [key: string]: any;
}

/**
 * @description: 导出数据到excel
 * @param {Array} data 导出的数据
 * @param {String} filename 导出的文件名
 * @return {*}
 **/
export const writeXLSX = (
    data: Record<string, any>[],
    filename: string,
    header?: string[]
) => {
    // 生成worksheet和workbook
    const ws = utils.json_to_sheet(data);
    /* create workbook */
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'sheet1');
    // fix headers
    utils.sheet_add_aoa(ws, [header as string[]], { origin: 'A1' });
    ws['!cols'] = [{ wch: 10 }];
    // const wb = { SheetNames: ['sheet1'], Sheets: { sheet1: ws } };
    writeFile(wb, filename);
};


export function readFile(file: File | Blob, type?: 'text' | 'arrayBuffer'): Promise<ProgressEvent<FileReader>> {
    return new Promise((resolve, reject) => {
        let reader = new FileReader()
        reader.onload = (e) => {
            resolve(e)
        }
        reader.onerror = (e) => {
            reject(e)
        }
        if (type === 'text') {
            reader.readAsText(file)
        } else {
            reader.readAsArrayBuffer(file)
        }
    })
}

export function getHeaderRow(sheet: WorkSheet) {
    const headers = [];
    const range = utils.decode_range(sheet['!ref'] as string);
    let C;
    const R = range.s.r;
    for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[utils.encode_cell({ c: C, r: R })];
        let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
        // if (cell && cell.t) hdr = cell.v;
        if (cell && cell.t) hdr = utils.format_cell(cell);
        headers.push(hdr);
    }
    return headers;
}

export async function getData(file: File, columns: GenericObject[]) {
    let out: Record<string, GenericObject> = {}
    let headers: Record<string, GenericObject> = {}
    // 读取文件数据
    let e = await readFile(file, 'arrayBuffer')
    let bytes: any = e.target?.result
    // // 读取excel数据
    let workbook = read(bytes, { type: 'binary', codepage: 936 })
    // // 读取所有sheet数据
    workbook.SheetNames.forEach((n: string) => {
        const ws = workbook.Sheets[n]
        out[n] = utils.sheet_to_json(ws)
        // 以横向方式读取数据，第一行为标题数组
        // headers[n] = utils.sheet_to_json(ws, { header: 1, raw: true })
        headers[n] = getHeaderRow(ws)
        out[n] = out[n].map((item: GenericObject) => {
            return Object.keys(item).reduce((prev, key) => {
                const realKey = columns.find((col) => col.title === key)?.dataIndex
                prev[realKey] = item[key]
                return prev
            }, {} as GenericObject)
        })
    })
    // 获取第一个sheet的数据
    let sheetName = workbook.SheetNames[0]
    let arr = out[sheetName] // 所有数据
    let firstHeader = headers[sheetName]
    console.log('headers: ', firstHeader, arr);
    return {
        header: firstHeader,
        data: arr
    }
}
