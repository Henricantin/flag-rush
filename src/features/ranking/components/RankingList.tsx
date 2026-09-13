import { Crown, Flag, Medal, Target } from 'lucide-react'
import { useState } from 'react'

import { useOperators } from '../../operators/context/OperatorsContext'
import { RankingModal } from './RankingModal'

export function RankingList() {
	const { operators } = useOperators()

	const [isRankingOpen, setIsRankingOpen] = useState(false)

	const rankedOperators = [...operators].sort((a, b) => {
		if (b.flags !== a.flags) {
			return b.flags - a.flags
		}

		if (b.goalsCompleted !== a.goalsCompleted) {
			return b.goalsCompleted - a.goalsCompleted
		}

		const aName = `${a.firstName} ${a.lastName}`
		const bName = `${b.firstName} ${b.lastName}`

		return aName.localeCompare(bName, 'pt-BR')
	})

	if (rankedOperators.length === 0) {
		return (
			<div className="flex h-full min-h-0 items-center justify-center rounded-2xl border border-dashed border-slate-700 p-4 text-center text-sm text-slate-500">
				Nenhum operador no ranking.
			</div>
		)
	}

	const topThree = rankedOperators.slice(0, 3)

	return (
		<>
			<div className="flex h-full min-h-0 flex-col">
				<div className="grid gap-2">
					{topThree.map((operator, index) => {
						const position = index + 1

						return (
							<div
								key={operator.id}
								className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-3"
							>
								<div className="flex min-w-0 items-center gap-3">
									<div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900">
										{position === 1 && (
											<Crown className="size-4 text-yellow-300" />
										)}

										{position === 2 && (
											<Medal className="size-4 text-slate-300" />
										)}

										{position === 3 && (
											<Medal className="size-4 text-amber-700" />
										)}
									</div>

									<div className="min-w-0">
										<p className="truncate font-semibold text-white">
											{operator.firstName}{' '}
											{operator.lastName}
										</p>

										<div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
											<span className="flex items-center gap-1">
												<Flag className="size-3.5 text-yellow-300" />
												{operator.flags}
											</span>

											<span className="flex items-center gap-1">
												<Target className="size-3.5 text-emerald-300" />
												{operator.goalsCompleted}
											</span>
										</div>
									</div>
								</div>

								<div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900 text-xs font-bold text-cyan-300">
									{operator.avatarKey}
								</div>
							</div>
						)
					})}
				</div>

				<button
					type="button"
					onClick={() => setIsRankingOpen(true)}
					className="mt-4 w-full rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/5 px-4 py-2.5 text-sm font-semibold text-fuchsia-300 transition hover:bg-fuchsia-400/10"
				>
					Ranking completo
				</button>
			</div>

			{isRankingOpen && (
				<RankingModal
					operators={operators}
					onClose={() => setIsRankingOpen(false)}
				/>
			)}
		</>
	)
}
