// pages/api/saveToExcel.ts
import * as XLSX from "xlsx";
import * as fs from "fs";
import { NextResponse } from "next/server";
import axios from "axios";
import { toEnglishDigits } from "@/utils/utils";
// import axios from "axios";

// Define the path for the Excel file (change this path as needed)
const filePath = "public/noyan.xlsx";
// Handle POST requests
export async function POST(req: Request) {
  // Parse the incoming JSON data
  const {
    fullName,
    phone1,
    phone2,
    companyName,
    role,
    projectUsage,
    projectStage,
    importance,
    description,
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
      "تلفن 2": phone2,
      "نام شرکت": companyName,
      سمت: role,
      "کاربری پروژه": projectUsage,
      "مرحله پروژه": projectStage,
      اهمیت: importance,
      توضیحات: description,
      تاریخ: new Date().toLocaleString("fa-IR"),
    });

    // Create a new worksheet and write data to it
    const newWorksheet = XLSX.utils.json_to_sheet(data);
    workbook.Sheets["Sheet1"] = newWorksheet;
    XLSX.writeFile(workbook, filePath);

    const text = `از حضور ارزشمندتان در غرفه نویان در نمایشگاه ترمه صمیمانه سپاسگزاریم.
دیدار شما مایه افتخار ما بود و امیدواریم این آشنایی سرآغاز همکاری‌های ثمربخش باشد. 🌐✨

راه‌های ارتباط با ما:
09198257009
www.smartnoyan.com
Instagram: smartnoyan`;
    axios.get("https://api.sms-webservice.com/api/V3/Send", {
      params: {
        apikey: "268670-54078D3F79B6418286FBA75B07990916",
        text,
        sender: "9999181557",
        Recipients: toEnglishDigits(phone1),
      },
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
