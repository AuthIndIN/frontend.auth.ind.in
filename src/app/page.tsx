import { LucideLock, LucideLogIn } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-around py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex gap-x-3 items-center">
          <LucideLock size={80} />{" "}
          <span className="text-4xl font-bold">
            Auth : <br /> Your Identity Provider
          </span>
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, <span className="text-blue-500">Login</span> !
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            and explore the{" "}
            <span className="font-medium text-zinc-950 dark:text-zinc-50">
              connected
            </span>{" "}
            experience.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="/auth/login"
            rel="noopener noreferrer"
          >
            <LucideLogIn />
            Login
          </a>
        </div>
      </main>
    </div>
  );
}
