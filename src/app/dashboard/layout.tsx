import { redirect } from "next/navigation";
import Link from "next/link";
import { getTokenFromCookies } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = getTokenFromCookies();
  if (!payload) redirect("/login");

  const links = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/library", label: "My Library" },
    { href: "/dashboard/games", label: "All Games", },
    { href: "/dashboard/achievements", label: "Achievements" },
    { href: "/dashboard/leaderboard", label: "Leaderboard" },
  ];

  if (payload.role === "admin") {
    links.push({ href: "/dashboard/admin", label: "Admin" });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">





        <aside className="space-y-1">
          <div className="mb-4">
            <p className="text-white font-semibold">{payload.username}</p>
            <p className="text-gray-500 text-xs">
              {payload.role === "admin" ? "Admin" : "Player"}
            </p>
          </div>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </aside>


        <main>{children}</main>
      </div>
    </div>
  );
}