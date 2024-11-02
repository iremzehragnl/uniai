import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "@/components/navbar";
import Chatbot from "@/components/chatbot";

// API configuration
const MODEL_NAME = "gemini-1.5-flash";
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;

export default function Home() {

  return (
    <div className="flex">
      <Navbar />

      <main className="flex-1 p-8">
        {/* Arama Çubuğu */}
        <input
          type="text"
          placeholder="    Ara.."
          className="border border-gray-300 rounded-lg p-2 mb-4 w-2/5"
        />
        <h1 className="text-5xl font-normal text-gray-500 mb-14 mt-8 ml-3">H O Ş G E L D İ N İ Z !</h1>
        {/* Courses */}
        <div className="grid grid-cols-2 gap-8">
          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/math-course.jpg"
                alt="Math Course"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">Math 101</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>

          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/python-course.webp"
                alt="Python Course"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">Python 101</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>

          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/javascript-course.png"
                alt="JavaScript Course"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">JavaScript 101</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>

          <div className="border p-4 rounded-lg shadow-md">
            <div className="relative w-full h-40 overflow-hidden">
              <Image
                src="/images/web-development-course.jpg"
                alt="Web Development"
                layout="fill"
                className="object-cover"
              />
            </div>
            <h3 className="font-bold mt-2">Web Development</h3>
            <button className="mt-4 bg-green-500 text-white p-2 rounded hover:bg-green-600 font-bold">Kursa Git</button>
          </div>
        </div>
      </main>

      <Chatbot />
    </div>
  );
}
