// pages/api/saveToExcel.ts
import * as XLSX from "xlsx";
import * as fs from "fs";
import { NextResponse } from "next/server";
import axios from "axios";

// Define the path for the Excel file (change this path as needed)
const filePath = "public/data.xlsx";
// Handle POST requests
export async function POST(req: Request) {
  // Parse the incoming JSON data
  const {
    fullName,
    phone1,
    phone2,
    address,
    projectUsage,
    projectStage,
    importance,
    description,
    sendSMS,
  } = await req.json();

  XLSX.set_fs(fs);

  try {
    let workbook;
    let worksheet;

    // Check if the Excel file exists
    if (!sendSMS) {
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
        آدرس: address,
        "کاربری پروژه": projectUsage,
        "مرحله پروژه": projectStage,
        اهمیت: importance,
        توضیحات: description,
      });

      // Create a new worksheet and write data to it
      const newWorksheet = XLSX.utils.json_to_sheet(data);
      workbook.Sheets["Sheet1"] = newWorksheet;
      XLSX.writeFile(workbook, filePath);

      // Write the workbook to the specified file path
      // writeFile(filePath, workbook,{});

      // Return success response
      return new NextResponse(JSON.stringify({ message: "Data Just Saved" }), {
        status: 200,
      });
    } else {
      try {
        const response = await axios.get("https://reqres.in/api/users");
        if (response.status == 200) {
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
            آدرس: address,
            "کاربری پروژه": projectUsage,
            "مرحله پروژه": projectStage,
            اهمیت: importance,
            توضیحات: description,
          });

          // Create a new worksheet and write data to it
          const newWorksheet = XLSX.utils.json_to_sheet(data);
          workbook.Sheets["Sheet1"] = newWorksheet;
          XLSX.writeFile(workbook, filePath);

          return new NextResponse(
            JSON.stringify({
              message: "Data saved and SMS sent",
            }),
            {
              status: 200,
            }
          );
        }
      } catch (error) {
        console.log(error);

        return new NextResponse(
          JSON.stringify({ message: JSON.stringify(error) }),
          {
            status: 500,
          }
        );
      }
    }
  } catch (error) {
    console.error(error); // Log the error
    return new NextResponse(
      JSON.stringify({ message: JSON.stringify(error) }),
      {
        status: 500,
      }
    );
  }
}
