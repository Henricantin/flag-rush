import { OperatorAvatar } from '../../operators/components/OperatorAvatar'
import { operators } from '../../operators/data/operators'
import { islands } from '../data/islands'
import { mapSlots } from '../data/mapSlots'
import { Island } from './Island'

export function GameMap() {
	return (
		<div className="relative h-full min-h-0 overflow-hidden rounded-2xl bg-[#03101a]">
			<svg
				className="h-full w-full"
				viewBox="0 0 1000 700"
				preserveAspectRatio="xMidYMid meet"
				role="img"
				aria-label="Mapa do arquipélago"
			>
				<defs>
					<radialGradient id="oceanGlow" cx="50%" cy="45%" r="70%">
						<stop offset="0%" stopColor="#0b2431" />
						<stop offset="55%" stopColor="#061722" />
						<stop offset="100%" stopColor="#020b12" />
					</radialGradient>

					<pattern
						id="oceanGrid"
						width="48"
						height="48"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 48 0 L 0 0 0 48"
							fill="none"
							stroke="rgba(34, 211, 238, 0.025)"
							strokeWidth="1"
						/>
					</pattern>

					<filter
						id="softGlow"
						x="-50%"
						y="-50%"
						width="200%"
						height="200%"
					>
						<feGaussianBlur stdDeviation="8" />
					</filter>
				</defs>

				<rect width="1000" height="700" fill="url(#oceanGlow)" />
				<rect width="1000" height="700" fill="url(#oceanGrid)" />

				<circle
					cx="160"
					cy="110"
					r="90"
					fill="rgba(34, 211, 238, 0.025)"
					filter="url(#softGlow)"
				/>

				<circle
					cx="810"
					cy="540"
					r="120"
					fill="rgba(217, 70, 239, 0.02)"
					filter="url(#softGlow)"
				/>

				<circle
					cx="140"
					cy="530"
					r="2"
					fill="rgba(255, 255, 255, 0.22)"
				/>

				<circle
					cx="330"
					cy="180"
					r="1.5"
					fill="rgba(34, 211, 238, 0.35)"
				/>

				<circle
					cx="620"
					cy="95"
					r="1.5"
					fill="rgba(255, 255, 255, 0.16)"
				/>

				<circle
					cx="860"
					cy="235"
					r="2"
					fill="rgba(34, 211, 238, 0.28)"
				/>

				<circle
					cx="520"
					cy="590"
					r="1.5"
					fill="rgba(255, 255, 255, 0.18)"
				/>

				{islands.map((island) => (
					<Island key={island.id} island={island} />
				))}

				{operators.map((operator) => {
					const slot = mapSlots.find(
						(mapSlot) => mapSlot.id === operator.mapSlotId,
					)

					if (!slot) {
						return null
					}

					return (
						<OperatorAvatar
							key={operator.id}
							operator={operator}
							x={slot.x}
							y={slot.y}
						/>
					)
				})}
			</svg>
		</div>
	)
}
