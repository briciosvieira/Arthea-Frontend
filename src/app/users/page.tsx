'use client'

import { Employees } from "@/components/users/employees";
import { UserIsLogged } from "@/components/utils/userIsLogged";
import Link from "next/link";

export default function CreateUsers() {

  return (
    <main className="h-screen w-full flex flex-col items-center  bg-[#36534ea4] text-white ">
      <div className="fixed top-4 right-4">
        <UserIsLogged />
      </div>
      <Employees />
      <Link
        href="/"
        className="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all mb-2"
      >
        Voltar
      </Link>
    </main>
  );
}