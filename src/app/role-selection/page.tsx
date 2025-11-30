"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineBuildingOffice2,
  HiOutlineBriefcase,
  HiOutlineUser,
} from "react-icons/hi2";

type Role = "admin" | "employer" | "candidate";

const roles = [
  {
    id: "admin",
    title: "System administration and analytics",
    icon: HiOutlineBuildingOffice2,
  },
  {
    id: "employer",
    title: "Post jobs and review applicants",
    icon: HiOutlineBriefcase,
  },
  {
    id: "candidate",
    title: "Search and apply for jobs",
    icon: HiOutlineUser,
  },
];

const roleFormTitleMap: Record<Role, string> = {
  admin: "Admin",
  employer: "Employer",
  candidate: "Job Seeker",
};

const roleRedirectMap: Record<Role, string> = {
  admin: "/admin",
  employer: "/employer",
  candidate: "/job-seeker",
};

export default function Page() {
  const [selected, setSelected] = useState<Role | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selected) return;

    // redirect based on selected role
    router.push(roleRedirectMap[selected]);
  };

  return (
    <main className="flex min-h-screen flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-white to-sky-50 px-4 pt-16">
      <div className="mb-10 flex flex-col items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-blue-600 shadow-sm">
          <HiOutlineBriefcase className="h-12 w-12" />
        </div>
        <p className="text-base text-slate-700">Select your role to continue</p>
      </div>

      {/* Role Cards */}
      <div className="mb-10 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon;
          const active = selected === role.id;

          return (
            <button
              key={role.id}
              onClick={() => setSelected(role.id as Role)}
              className={`flex flex-col items-center justify-center rounded-[20px] border px-7 py-6 text-center shadow-sm transition-all duration-200 ${
                active
                  ? "border-2 border-blue-500 bg-blue-50/40 md:scale-[1.07]"
                  : "scale-100 border-slate-200 bg-white hover:border-blue-300 hover:shadow-md"
              }`}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all ${
                  active ? "text-blue-600" : "text-slate-400"
                }`}
              >
                <Icon className="h-10 w-10" />
              </div>

              <p
                className={`text-base ${
                  active ? "text-blue-700" : "text-slate-800"
                }`}
              >
                {role.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Login form */}
      {selected && (
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white px-10 py-10 shadow-xl">
          <h2 className="mb-8 text-center text-lg text-slate-800">
            Sign in as {roleFormTitleMap[selected]}
          </h2>

          <form onSubmit={handleLogin} className="space-y-8">
            <div>
              <label className="mb-2 block text-base text-slate-700">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="mb-2 block text-base text-slate-700">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-slate-200 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            Demo: Use any email/password to login
          </p>
        </div>
      )}
    </main>
  );
}
