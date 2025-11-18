import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container py-8">
      <div className="space-y-3">
        <h1>Welcome to Resume Builder</h1>
        <Button asChild>
          <Link href={'/resumes'}>
            Create Resume
          </Link>
        </Button>
      </div>
    </main>
  );
}
