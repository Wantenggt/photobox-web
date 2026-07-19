import Link from "next/link";

export default function Home() {

  return (

    <main className="min-h-screen bg-black flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl text-white font-bold mb-5">

          📸 PhotoBox

        </h1>

        <p className="text-zinc-400 mb-10">

          Capture your memories

        </p>

        <Link href="/camera">

          <button className="bg-pink-500 px-8 py-4 rounded-full text-white text-xl">

            Start Session

          </button>

        </Link>

      </div>

    </main>

  );

}