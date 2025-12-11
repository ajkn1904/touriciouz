//import {authOptions} from "@/components/helpers/authOptions"
//import {getServerSession} from "next-auth"

import { getUserSession } from "@/src/services/auth/getUserSession";

export default async function DashboardHome() {
  //const session = await getServerSession(authOptions)
  const session = await getUserSession()


  const quote = "The secret of getting ahead is getting started. – Mark Twain";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 w-full">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome, {session?.user?.name}!
      </h1>
      <p className="text-lg text-gray-600 italic text-center">{session?.user?.email}</p>
      <p className="text-lg text-gray-600 italic text-center">{quote}</p>
    </div>
  );
}
