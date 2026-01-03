import { TrendingUp, Users, Zap, CheckCircle2 } from "lucide-react";

export function AdminPreview() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="relative bg-slate-900 rounded-[3rem] p-10 md:p-16 grid md:grid-cols-2 gap-14 items-center overflow-hidden">

        {/* Left */}
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-6">
            Built for Those Who <br />
            <span className="text-indigo-400">Refuse Average.</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base max-w-md mb-10">
            Precision systems, discipline-driven execution, and full visibility
            over performance — designed for traders chasing consistency, not luck.
          </p>

          <ul className="space-y-5">
            <AdminFeatureItem text="Structured execution & decision tracking" />
            <AdminFeatureItem text="Performance clarity over emotions" />
            <AdminFeatureItem text="Repeatable systems, not random trades" />
            <AdminFeatureItem text="Security-first, distraction-free environment" />
          </ul>
        </div>

        {/* Right */}
        <div className="relative grid grid-cols-2 gap-4">
          <MiniStat icon={<TrendingUp />} label="Win Discipline" value="92%" />
          <MiniStat icon={<Users />} label="Active Traders" value="1.2k+" />
          <MiniStat icon={<Zap />} label="Trades Logged" value="48k+" />
          <MiniStat icon={<CheckCircle2 />} label="Consistency Rate" value="High" />

          {/* Glow */}
          <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] -z-10" />
        </div>
      </div>
    </section>
  );
}

function AdminFeatureItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-4 text-slate-300 text-sm">
      <div className="h-6 w-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      {text}
    </li>
  );
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/20 transition">
      <div className="text-indigo-400 mb-2">{icon}</div>
      <p className="text-[10px] font-semibold text-indigo-300 uppercase tracking-widest">
        {label}
      </p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}
