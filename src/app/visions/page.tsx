export default function VisionsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pb-24">
      <header className="mb-16">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">Visions & Roadmap</h1>
        <p className="text-xl text-neutral-400">Beyond the browser. Building physical, digital, and commercial ecosystems.</p>
      </header>

      <div className="space-y-12">
        <section className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900/30">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">HatakePhone Ecosystem</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            A rugged, Linux-based smartphone brand prioritizing user control, durability, and open-source flexibility. The goal is to move away from locked-down commercial OS environments and provide a device designed for power users, developers, and field operators.
          </p>
          <div className="text-sm font-mono text-neutral-500">Target Launch: Q3 2026</div>
        </section>

        <section className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900/30">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Physical Retail & Community</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Bridging the gap between the Hatake.social digital platform and the physical world. Plans are actively in motion to establish a brick-and-mortar TCG and hobby retail space in Sweden. A hub for competitive Modern/Legacy MTG formats and international Pokémon TCG markets.
          </p>
        </section>

        <section className="p-8 border border-neutral-800 rounded-2xl bg-neutral-900/30">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">HatakeSmoke AB</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Expanding into wholesale imports and private-label production. Focused on premium cigars and the manufacturing of high-quality, tobacco-free nicotine pouches, navigating complex international supplier logistics and Swedish regulatory compliance.
          </p>
        </section>
      </div>
    </main>
  );
}