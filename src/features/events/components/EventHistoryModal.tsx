import { Flag, Target, X } from 'lucide-react'
import { createPortal } from 'react-dom'

import type { GameEvent } from '../context/GameEventsContext'

type EventHistoryModalProps = {
	events: GameEvent[]
	onClose: () => void
}

export function EventHistoryModal({ events, onClose }: EventHistoryModalProps) {
	return createPortal(
		<>
			<div
				className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
				onClick={onClose}
				aria-hidden="true"
			/>

			<div className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-yellow-400/20 bg-slate-900 p-6 shadow-2xl">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow-300">
							Histórico
						</p>

						<h2 className="mt-1 text-2xl font-black text-white">
							Histórico completo
						</h2>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-slate-500 hover:text-white"
						aria-label="Fechar histórico completo"
					>
						<X className="size-5" />
					</button>
				</div>

				<div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
					{events.length === 0 ? (
						<div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">
							Nenhuma ação registrada neste ciclo.
						</div>
					) : (
						<div className="grid gap-2">
							{events.map((event) => {
								const isGoal = event.type === 'goal_completed'

								return (
									<div
										key={event.id}
										className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-3"
									>
										<div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900">
											{isGoal ? (
												<Target className="size-4 text-emerald-300" />
											) : (
												<Flag className="size-4 text-yellow-300" />
											)}
										</div>

										<div className="min-w-0">
											<p className="text-sm leading-relaxed text-slate-200">
												{event.message}
											</p>

											<p className="mt-1 text-xs text-slate-600">
												{event.createdAt.toLocaleTimeString(
													'pt-BR',
													{
														hour: '2-digit',
														minute: '2-digit',
													},
												)}
											</p>
										</div>
									</div>
								)
							})}
						</div>
					)}
				</div>
			</div>
		</>,
		document.body,
	)
}
