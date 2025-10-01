"use client";

// pages/index.tsx
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Header } from "@/components/header";

type FormData = {
  fullName: string;
  phone1: string;
  phone2: string;
  companyName: string;
  role: string;
  projectUsage: string;
  projectStage: string;
  importance: string;
  description: string;
  address: string;
  // sendSMS: boolean;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading },
  } = useForm<FormData>({
    defaultValues: {},
  });
  const [message, setMessage] = useState<{ message: string; isError: boolean }>(
    {
      message: "",
      isError: false,
    }
  );

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post("/api/saveToExcel/noyan", data);
      if (response.status === 200) {
        setMessage({ message: response.data.message, isError: false });
        reset(); // Clears the form after successful submission
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);

      setMessage({
        isError: true,
        message: error.response.data.message || "Error",
      });
      return error;
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md "
      >
        <Header pageTitle="فرم ثبت اطلاعات" />

        {/* <h1 className="text-2xl font-bold mb-4">فرم ثبت اطلاعات</h1> */}

        {/* Other form fields remain the same... */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            نام و نام خانوادگی
          </label>
          <input
            type="text"
            {...register("fullName", { required: "This field is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            تلفن 1
          </label>
          <input
            type="text"
            {...register("phone1", { required: "This field is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.phone1 && (
            <p className="text-red-500 text-sm">{errors.phone1.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            تلفن 2
          </label>
          <input
            type="text"
            {...register("phone2")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.phone2 && (
            <p className="text-red-500 text-sm">{errors.phone2.message}</p>
          )}
        </div>

        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            نام شرکت
          </label>
          <input
            type="text"
            {...register("companyName", { required: "this field is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm">{errors.companyName.message}</p>
          )}
        </div> */}

        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            سمت
          </label>
          <input
            type="text"
            {...register("role", { required: "this field is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.role && (
            <p className="text-red-500 text-sm">{errors.role.message}</p>
          )}
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            آدرس
          </label>
          <input
            type="text"
            {...register("address", {})}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            کاربری پروژه
          </label>
          <div className="flex gap-4">
            {["ویلایی", "مسکونی", "تجاری", "اداری", "سایر"].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  value={option}
                  {...register("projectUsage", {})}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
          {errors.projectUsage && (
            <p className="text-red-500 text-sm">
              {errors.projectUsage.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            مرحله پروژه
          </label>
          <input
            type="text"
            {...register("projectStage")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            اهمیت
          </label>
          <input
            type="text"
            {...register("importance")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            توضیحات
          </label>
          <textarea
            {...register("description")}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>

        {/* <div className="mb-4 flex items-center">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ارسال پیامک
          </label>
          <input type="checkbox" {...register("sendSMS")} className="mr-2" />
        </div> */}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isLoading}
        >
          {isLoading ? "در حال ثبت ..." : "ثبت"}
        </button>
        {message.message && (
          <p
            className={`mt-4 ${
              message.isError ? "text-red-500" : "text-green-500"
            }`}
          >
            {message.message}
          </p>
        )}
      </form>
    </div>
  );
}
