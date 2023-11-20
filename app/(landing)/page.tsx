import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="p-5">
      <p>This is the landing page (Unprotected)!</p>
      <Link href="/sign-in">
        <Button variant="default">Sign In</Button>
      </Link>
      <Link href="/sign-up">
        <Button variant="default">Sign Up</Button>
      </Link>
    </div>
  );
}
