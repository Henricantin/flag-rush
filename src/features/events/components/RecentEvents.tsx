import { Flag, Target } from 'lucide-react'
import { useState } from 'react'

import { useGameEvents } from '../context/GameEventsContext'
import { EventHistoryModal } from './EventHistoryModal'

export function RecentEvents() {
	const { events } = useGameEvents()

	const [isHistoryOpen, setIsHistoryOpen] = useState(false)

	const latestEvent = events[0]

	if (!latestEvent) {
		return (
			<div className="flex h-full min-h-0 items-center justify-center rounded-2xl border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500">
				Nenhuma ação registrada ainda.
			</div>
		)
	}

	return (
		<>
			<div className="flex h-full min-h-0 flex-col">
				<div className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-3">
					<div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-900">
						{latestEvent.type === 'goal_completed' ? (
							<Target className="size-4 text-emerald-300" />
						) : (
							<Flag className="size-4 text-yellow-300" />
						)}
					</div>

					<div className="min-w-0">
						<p className="text-sm leading-relaxed text-slate-200">
							{latestEvent.message}
						</p>

						<p className="mt-1 text-xs text-slate-600">
							{latestEvent.createdAt.toLocaleTimeString('pt-BR', {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</p>
					</div>
				</div>

				<button
					type="button"
					onClick={() => setIsHistoryOpen(true)}
					className="mt-4 w-full rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-4 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/10"
				>
					Histórico completo
				</button>
			</div>

			{isHistoryOpen && (
				<EventHistoryModal
					events={events}
					onClose={() => setIsHistoryOpen(false)}
				/>
			)}
		</>
	)
}
