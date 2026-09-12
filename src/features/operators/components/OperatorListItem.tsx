import { Pencil, Trash2 } from 'lucide-react'

import type { Operator } from '../types'

type OperatorListItemProps = {
	operator: Operator
}

export function OperatorListItem({ operator }: OperatorListItemProps) {
	return (
		<div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
			<div className="flex min-w-0 items-center gap-4">
				<div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-900 font-bold text-cyan-300">
					{operator.avatarKey}
				</div>

				<div className="min-w-0">
					<p className="truncate font-semibold text-white">
						{operator.firstName} {operator.lastName}
					</p>

					<div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
						<span>🚩 {operator.flags}</span>
						<span>⚔️ {operator.stealCredits}</span>
						<span>🎯 {operator.goalsCompleted}</span>

						<span>
							{operator.defenseActive
								? '🛡️ Defesa ativa'
								: 'Defesa inativa'}
						</span>
					</div>
				</div>
			</div>

			<div className="flex shrink-0 items-center gap-2">
				<button
					type="button"
					className="flex size-9 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-cyan-400 hover:text-cyan-300"
					aria-label={`Editar ${operator.firstName}`}
				>
					<Pencil className="size-4" />
				</button>

				<button
					type="button"
					className="flex size-9 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-red-400 hover:text-red-300"
					aria-label={`Excluir ${operator.firstName}`}
				>
					<Trash2 className="size-4" />
				</button>
			</div>
		</div>
	)
}
