import DashboardLayout from "@/components/dashboard/layout"
import DashboardOverview from "@/components/dashboard/overview"
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {

  const user = await currentUser();

  if (!user) {
    redirect('/login');
  }


  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
