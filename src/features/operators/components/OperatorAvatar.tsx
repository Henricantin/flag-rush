import { Shield } from 'lucide-react'

import type { Operator } from '../types'

type OperatorAvatarProps = {
	operator: Operator
	x: number
	y: number
	onClick: (operator: Operator) => void
}

export function OperatorAvatar({
	operator,
	x,
	y,
	onClick,
}: OperatorAvatarProps) {
	return (
		<button
			type="button"
			onClick={() => onClick(operator)}
			className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
			style={{
				left: `${x}%`,
				top: `${y}%`,
			}}
			aria-label={`Abrir operador ${operator.firstName} ${operator.lastName}`}
		>
			<div className="relative flex size-12 items-center justify-center rounded-full border-2 border-slate-500 bg-slate-950 font-bold text-white shadow-lg transition hover:scale-110">
				{operator.avatarKey}

				{operator.defenseActive && (
					<span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full border border-cyan-300/40 bg-slate-950">
						<Shield className="size-3.5 text-cyan-300" />
					</span>
				)}
			</div>
		</button>
	)
}
