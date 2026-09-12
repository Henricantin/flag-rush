import { Crown, Flag, Medal, Target, X } from 'lucide-react'
import { createPortal } from 'react-dom'

import type { Operator } from '../../operators/types'

type RankingModalProps = {
	operators: Operator[]
	onClose: () => void
}

export function RankingModal({ operators, onClose }: RankingModalProps) {
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

	return createPortal(
		<>
			<div
				className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
			/>

			<div className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-fuchsia-400/20 bg-slate-900 p-6 shadow-2xl">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
							Classificação
						</p>

						<h2 className="mt-1 text-2xl font-black text-white">
							Ranking completo
						</h2>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-slate-500 hover:text-white"
						aria-label="Fechar ranking completo"
					>
						<X className="size-5" />
					</button>
				</div>

				<div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
					<div className="grid gap-2">
						{rankedOperators.map((operator, index) => {
							const position = index + 1

							return (
								<div
									key={operator.id}
									className="flex items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-3"
								>
									<div className="flex min-w-0 items-center gap-3">
										<div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 font-black">
											{position === 1 && (
												<Crown className="size-4 text-yellow-300" />
											)}

											{position === 2 && (
												<Medal className="size-4 text-slate-300" />
											)}

											{position === 3 && (
												<Medal className="size-4 text-amber-700" />
											)}

											{position > 3 && (
												<span className="text-sm text-slate-400">
													{position}
												</span>
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
				</div>
			</div>
		</>,
		document.body,
	)
}
