import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { signOut } from "@/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();
  console.log("🔴 ~ Home ~ session:", session);

  return (
    <div className="font-inter">
      <h1 className="font-inter">Inter</h1>
      <h2 className="font-space-grotesk">Space Grotesk</h2>
      <form
        className="px-10 pt-[100px]"
        action={async () => {
          "use server";
          await signOut({
            redirectTo: ROUTES.SIGN_IN,
          });
        }}
      >
        <Button>Log out</Button>
      </form>
    </div>
  );
}
