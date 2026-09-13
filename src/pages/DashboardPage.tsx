import { DashboardHeader } from '../components/layout/DashboardHeader'
import { RecentEvents } from '../features/events/components/RecentEvents'
import { GameMap } from '../features/game-map/components/GameMap'
import { useGameSettings } from '../features/game-map/context/GameSettingsContext'
import { RankingList } from '../features/ranking/components/RankingList'

export function DashboardPage() {
	const { activeMapId } = useGameSettings()

	return (
		<main className="h-screen overflow-hidden text-white">
			<div className="mx-auto flex h-full max-w-[1920px] flex-col gap-4 p-4 md:p-6">
				<DashboardHeader />

				<section className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,4fr)_minmax(260px,1fr)]">
					<section className="min-h-0 rounded-3xl border border-cyan-400/20 bg-slate-900/40 p-5 backdrop-blur">
						<div className="flex h-full flex-col">
							<p className="shrink-0 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
								Arquipélago
							</p>

							<div className="mt-4 min-h-0 flex-1 overflow-hidden rounded-2xl">
								<GameMap mapId={activeMapId} />
							</div>
						</div>
					</section>

					<aside className="flex min-h-0 flex-col gap-4">
						<section className="h-[370px] shrink-0 rounded-3xl border border-fuchsia-400/20 bg-slate-900/50 p-4 backdrop-blur">
							<div className="flex h-full flex-col">
								<div className="mb-4 shrink-0">
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-300">
										Ranking
									</p>
								</div>

								<div className="min-h-0 flex-1">
									<RankingList />
								</div>
							</div>
						</section>

						<section className="min-h-0 flex-1 rounded-3xl border border-yellow-400/20 bg-slate-900/50 p-4 backdrop-blur">
							<div className="flex h-full flex-col">
								<div className="mb-4 shrink-0">
									<p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-300">
										Últimas ações
									</p>
								</div>

								<div className="min-h-0 flex-1">
									<RecentEvents />
								</div>
							</div>
						</section>
					</aside>
				</section>
			</div>
		</main>
	)
}
