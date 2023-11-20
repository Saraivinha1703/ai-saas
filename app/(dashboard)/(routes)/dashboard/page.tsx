import { UserButton } from '@clerk/nextjs';

export default function Dashboard() {
  return (
    <div className="p-5">
      <p>Dashboard!</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
