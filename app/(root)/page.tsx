import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("🔴 ~ Home ~ session:", session);

  return (
    <div className="font-inter">
      <h1 className="font-inter">Inter</h1>
      <h2 className="font-space-grotesk">Space Grotesk</h2>
    </div>
  );
}
