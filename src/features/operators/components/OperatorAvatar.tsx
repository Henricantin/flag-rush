import { Shield } from 'lucide-react'
import type { Operator } from '../types'

type OperatorAvatarProps = {
	operator: Operator
	x: number
	y: number
}

export function OperatorAvatar({ operator, x, y }: OperatorAvatarProps) {
	return (
		<g transform={`translate(${x} ${y})`} className="cursor-pointer">
			<circle
				r="22"
				fill="#0f172a"
				stroke={operator.defenseActive ? '#22d3ee' : '#475569'}
				strokeWidth="2"
			/>

			<text
				x="0"
				y="1"
				textAnchor="middle"
				dominantBaseline="middle"
				fill="white"
				fontSize="11"
				fontWeight="700"
			>
				{operator.avatarKey}
			</text>

			{operator.defenseActive && (
				<foreignObject x="12" y="-30" width="24" height="24">
					<div className="flex h-full w-full items-center justify-center">
						<Shield className="size-4 text-cyan-300" />
					</div>
				</foreignObject>
			)}
		</g>
	)
}
