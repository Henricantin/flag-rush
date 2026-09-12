import { islands } from '../data/islands'
import { Island } from './Island'

export function GameMap() {
	return (
		<div className="relative h-full min-h-0 overflow-hidden rounded-2xl border border-cyan-400/15 bg-[#06111f]">
			<svg
				className="h-full w-full"
				viewBox="0 0 1000 700"
				preserveAspectRatio="xMidYMid meet"
				role="img"
				aria-label="Mapa do arquipélago"
			>
				<defs>
					<linearGradient id="ocean" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="#071827" />
						<stop offset="100%" stopColor="#03101c" />
					</linearGradient>

					<pattern
						id="grid"
						width="40"
						height="40"
						patternUnits="userSpaceOnUse"
					>
						<path
							d="M 40 0 L 0 0 0 40"
							fill="none"
							stroke="rgba(34, 211, 238, 0.04)"
							strokeWidth="1"
						/>
					</pattern>
				</defs>

				<rect width="1000" height="700" fill="url(#ocean)" />
				<rect width="1000" height="700" fill="url(#grid)" />

				{islands.map((island) => (
					<Island key={island.id} island={island} />
				))}
			</svg>
		</div>
	)
}
