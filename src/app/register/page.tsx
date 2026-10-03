import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/AuthForms";
import { currentUser } from "@/server/session";

export const metadata = { title: "Create account" };

export default async function RegisterPage() {
  if (await currentUser()) redirect("/");
  return (
    <div className="pt-6">
      <RegisterForm />
    </div>
  );
}
