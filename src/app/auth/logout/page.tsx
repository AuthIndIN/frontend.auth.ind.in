"use client";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/internal/auth";
import { LucideLogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  async function onClickLogout() {
    await logoutUser();
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={onClickLogout}>
        <LucideLogOut /> Logout
      </Button>
    </div>
  );
}
