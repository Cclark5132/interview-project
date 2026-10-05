import { redirect } from "next/navigation";
import { LoginForm } from "@/components/AuthForms";
import { currentUser } from "@/server/session";

export const metadata = { title: "Owner sign in" };

export default async function LoginPage() {
  const u = await currentUser();
  if (u?.role === "ADMIN") redirect("/admin");
  return (
    <div className="pt-6">
      <LoginForm />
      {process.env.NODE_ENV !== "production" && (
        <p className="mx-auto mt-4 max-w-sm text-center text-xs text-muted">
          Local development: run <code>npm run setup</code> to create demo accounts.
        </p>
      )}
    </div>
  );
}
