import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">

      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),transparent_65%)] -z-10" />

      <SignUp
        afterSignUpUrl="/courses"
        signInUrl="/sign-in"
        appearance={{
          variables: {
            colorPrimary: "#4f46e5", // purple / indigo
            borderRadius: "12px",
            fontFamily: "var(--font-inter)",
          },
          elements: {
            card: "shadow-xl border border-slate-200",
            headerTitle: "text-slate-900 font-bold",
            headerSubtitle: "text-slate-500",

            formButtonPrimary:
              "bg-indigo-600 hover:bg-indigo-700 text-sm font-semibold",

            socialButtonsBlockButton:
              "border border-slate-200 hover:bg-slate-50",

            footerActionLink:
              "text-indigo-600 hover:text-indigo-700 font-semibold",
          },
        }}
      />
    </div>
  );
}
