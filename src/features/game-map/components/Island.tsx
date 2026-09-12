import type { Island as IslandType } from '../types'

type IslandProps = {
	island: IslandType
}

export function Island({ island }: IslandProps) {
	return (
		<g transform={`translate(${island.x} ${island.y})`}>
			<ellipse
				cx={island.width / 2}
				cy={island.height / 2}
				rx={island.width / 2}
				ry={island.height / 2}
				fill="rgba(34, 211, 238, 0.08)"
				stroke="rgba(34, 211, 238, 0.35)"
				strokeWidth="2"
			/>

			<text
				x={island.width / 2}
				y={island.height / 2}
				textAnchor="middle"
				dominantBaseline="middle"
				fill="rgb(203 213 225)"
				fontSize="15"
				fontWeight="700"
			>
				{island.name}
			</text>
		</g>
	)
}
