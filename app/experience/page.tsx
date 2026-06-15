import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";

const prisma = new PrismaClient();
export const revalidate = 60;

export default async function ExperiencePage() {
  const experiences = await prisma.workExperience.findMany({
    where: { published: true },
    orderBy: [
      { sortOrder: 'asc' },
      { startDate: 'desc' }
    ]
  });

  return (
    <main className="max-w-4xl mx-auto px-6 z-10 relative pb-32">
      <header className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">Work Architecture</h1>
        <p className="text-xl text-neutral-400 font-light">
          A comprehensive log of active and past professional missions.
        </p>
      </header>

      <div className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-20 border border-neutral-800/50 rounded-2xl bg-neutral-900/30">
            <p className="text-neutral-500">Records currently sealed.</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <Link href={`/experience/${exp.id}`} key={exp.id} className="block group">
              <div className="bg-neutral-900/40 border border-neutral-800/50 hover:border-cyan-500/30 transition-all rounded-2xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-neutral-100 group-hover:text-cyan-400 transition-colors mb-1">{exp.title}</h2>
                  <h3 className="text-lg text-cyan-500/80 mb-3">{exp.company}</h3>
                  <p className="text-neutral-400 font-mono text-sm mb-4">
                    {format(new Date(exp.startDate), 'MMMM yyyy')} — {exp.current ? 'Present' : exp.endDate ? format(new Date(exp.endDate), 'MMMM yyyy') : 'Unknown'}
                  </p>
                  <p className="text-neutral-300 leading-relaxed max-w-2xl">{exp.shortDescription}</p>
                </div>
                <div className="flex-shrink-0 text-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                  <ArrowRight size={24} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}