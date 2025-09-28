// pages/api/saveToExcel.ts
import * as XLSX from "xlsx";
import * as fs from "fs";
import { NextResponse } from "next/server";
import axios from "axios";

// Define the path for the Excel file (change this path as needed)
const filePath = "src/data.xlsx";
// Handle POST requests
export async function POST(req: Request) {
  // Parse the incoming JSON data
  const {
    fullName,
    phone1,
    companyName,
    role,
    // projectUsage,
    // projectStage,
    // importance,
    // description,
    // sendSMS,
  } = await req.json();

  XLSX.set_fs(fs);

  try {
    let workbook;
    let worksheet;

    if (fs.existsSync(filePath)) {
      const fileBuffer = fs.readFileSync(filePath);
      workbook = XLSX.read(fileBuffer, { type: "buffer" });
      worksheet = workbook.Sheets["Sheet1"];
    } else {
      // Create a new workbook and worksheet
      workbook = XLSX.utils.book_new();
      worksheet = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    }

    // Read existing data and append new data
    const data = XLSX.utils.sheet_to_json(worksheet);
    data.push({
      "نام و نام خانوادگی": fullName,
      "تلفن 1": phone1,
      "نام شرکت": companyName,
      سمت: role,
      // "کاربری پروژه": projectUsage,
      // "مرحله پروژه": projectStage,
      // اهمیت: importance,
      // توضیحات: description,
    });

    // Create a new worksheet and write data to it
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets["Sheet1"] = newWorksheet;
    XLSX.writeFile(workbook, filePath);

    const text = `
⭐ بیست و پنجمین نمایشگاه بین المللی ساختمان  
🏗️ سرویس 360 ارایه دهنده راهکار های مدیریت پروژه های برق و جریان ضعیف ساختمان  
📞 09928377982
`;
    await axios.post("https://rest.payamak-panel.com/api/SendSMS/SendSMS", {
      username: "09121725326",
      password: "31#R2",
      to: phone1,
      text,
      from: "50002710025336",
    });

    // console.log(res);

    return NextResponse.json(
      { message: "با موفقیت انجام شد" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
