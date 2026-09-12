import { Flag, Target } from 'lucide-react'

import { useGameEvents } from '../context/GameEventsContext'

export function RecentEvents() {
	const { events } = useGameEvents()

	if (events.length === 0) {
		return (
			<div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-slate-700 p-4 text-center text-sm text-slate-500">
				Nenhuma ação registrada ainda.
			</div>
		)
	}

	return (
		<div className="grid gap-3">
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
								{event.createdAt.toLocaleTimeString('pt-BR', {
									hour: '2-digit',
									minute: '2-digit',
								})}
							</p>
						</div>
					</div>
				)
			})}
		</div>
	)
}
