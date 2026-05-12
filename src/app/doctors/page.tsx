import { Doctors } from "@/components/doctors/doctors";
import Link from "next/link";

export default function Doctor() {

    return (
        <main className="h-screen w-full flex flex-col items-center bg-[#36534ea4] text-white">
            <Doctors />

            <Link
                href="/"
                className="mt-6 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all mb-2"
            >
                Voltar 
            </Link>
        </main>
    )
}