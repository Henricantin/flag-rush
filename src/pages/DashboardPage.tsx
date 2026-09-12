import { DashboardHeader } from '../components/layout/DashboardHeader'

export function DashboardPage() {
	return (
		<main className="min-h-screen bg-[#050816] text-white">
			<div className="mx-auto flex min-h-screen max-w-[1800px] flex-col gap-6 px-4 py-5 md:px-6">
				<DashboardHeader />

				<section className="grid flex-1 gap-6 xl:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]">
					<section className="min-h-[650px] rounded-3xl border border-cyan-400/20 bg-slate-900/50 p-6 backdrop-blur">
						<p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
							Arquipélago
						</p>

						<div className="mt-4 flex h-[calc(100%-2rem)] items-center justify-center rounded-2xl border border-dashed border-cyan-400/15 bg-cyan-400/[0.02]">
							<span className="text-sm text-slate-500">
								Mapa em construção
							</span>
						</div>
					</section>

					<aside className="grid gap-6 xl:grid-rows-[1fr_auto]">
						<section className="rounded-3xl border border-fuchsia-400/20 bg-slate-900/50 p-6 backdrop-blur">
							<p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
								Ranking
							</p>
						</section>

						<section className="min-h-56 rounded-3xl border border-yellow-400/20 bg-slate-900/50 p-6 backdrop-blur">
							<p className="text-xs font-semibold uppercase tracking-[0.25em] text-yellow-300">
								Últimas ações
							</p>
						</section>
					</aside>
				</section>
			</div>
		</main>
	)
}
