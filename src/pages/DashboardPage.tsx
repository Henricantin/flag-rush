import DashboardHeader from '../components/layout/DashboardHeader'

function DashboardPage() {
	return (
		<main className="min-h-screen bg-[#050816] text-white">
			<div className="mx-auto flex min-h-screen max-w-[1800px] flex-col px-6 py-6">
				<DashboardHeader />

				<section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(320px,3fr)]">
					<div className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-6">
						MAPA
					</div>

					<aside className="grid gap-6">
						<div className="rounded-3xl border border-fuchsia-400/20 bg-slate-900/60 p-6">
							RANKING
						</div>

						<div className="rounded-3xl border border-yellow-400/20 bg-slate-900/60 p-6">
							HISTÓRICO
						</div>
					</aside>
				</section>
			</div>
		</main>
	)
}

export default DashboardPage
