import { LandingNavbar } from "@/components/LandingNavbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LandingNavbar />
      {children}
    </div>
  );
}
