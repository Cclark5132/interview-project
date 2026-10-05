import { redirect } from "next/navigation";

// The target form is now the home page; keep old links working.
export default function OnboardingRedirect() {
  redirect("/");
}
