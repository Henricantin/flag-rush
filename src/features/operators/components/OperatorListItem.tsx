import { Pencil, Trash2, X } from 'lucide-react'
import { useState } from 'react'

import type { Operator } from '../types'

type OperatorListItemProps = {
	operator: Operator
	onEdit: (operator: Operator) => void
	onDelete: (operatorId: string) => void
}

export function OperatorListItem({
	operator,
	onEdit,
	onDelete,
}: OperatorListItemProps) {
	const [isConfirmingDelete, setIsConfirmingDelete] = useState(false)

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
				{isConfirmingDelete ? (
					<>
						<button
							type="button"
							onClick={() => {
								onDelete(operator.id)
								setIsConfirmingDelete(false)
							}}
							className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-500/20"
						>
							Confirmar
						</button>

						<button
							type="button"
							onClick={() => setIsConfirmingDelete(false)}
							className="flex size-9 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-slate-500 hover:text-white"
							aria-label="Cancelar exclusão"
						>
							<X className="size-4" />
						</button>
					</>
				) : (
					<>
						<button
							type="button"
							onClick={() => onEdit(operator)}
							className="flex size-9 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-cyan-400 hover:text-cyan-300"
							aria-label={`Editar ${operator.firstName}`}
						>
							<Pencil className="size-4" />
						</button>

						<button
							type="button"
							onClick={() => setIsConfirmingDelete(true)}
							className="flex size-9 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-red-400 hover:text-red-300"
							aria-label={`Excluir ${operator.firstName}`}
						>
							<Trash2 className="size-4" />
						</button>
					</>
				)}
			</div>
		</div>
	)
}
