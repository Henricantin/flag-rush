import type { Operator } from '../types'

import { OperatorListItem } from './OperatorListItem'

type OperatorListProps = {
	operators: Operator[]
	onEdit: (operator: Operator) => void
	onDelete: (operatorId: string) => void
}

export function OperatorList({
	operators,
	onEdit,
	onDelete,
}: OperatorListProps) {
	if (operators.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed border-slate-700 p-8 text-center text-sm text-slate-500">
				Nenhum operador cadastrado.
			</div>
		)
	}

	return (
		<div className="grid gap-3">
			{operators.map((operator) => (
				<OperatorListItem
					key={operator.id}
					operator={operator}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			))}
		</div>
	)
}
