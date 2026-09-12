import type { Operator } from '../types'

import { OperatorListItem } from './OperatorListItem'

type OperatorListProps = {
	operators: Operator[]
}

export function OperatorList({ operators }: OperatorListProps) {
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
				<OperatorListItem key={operator.id} operator={operator} />
			))}
		</div>
	)
}
