import type { Island as IslandType } from '../types'

type IslandProps = {
	island: IslandType
}

export function Island({ island }: IslandProps) {
	const transform = `
		translate(${island.x} ${island.y})
		rotate(${island.rotation ?? 0})
		scale(${island.scale})
	`

	return (
		<g transform={transform}>
			<path
				d="
					M -72 -18
					C -62 -50 -24 -65 10 -55
					C 42 -65 72 -42 75 -12
					C 84 18 56 44 28 48
					C 0 62 -34 50 -52 34
					C -78 22 -88 2 -72 -18
					Z
				"
				fill="rgba(3, 20, 30, 0.95)"
				stroke="rgba(34, 211, 238, 0.45)"
				strokeWidth="2"
			/>

			<path
				d="
					M -58 -12
					C -44 -38 -18 -45 8 -39
					C 34 -48 56 -30 60 -8
					C 64 14 42 30 18 34
					C -10 44 -32 33 -44 22
					C -62 14 -68 2 -58 -12
					Z
				"
				fill="rgba(8, 47, 54, 0.85)"
				stroke="rgba(103, 232, 249, 0.16)"
				strokeWidth="1"
			/>

			<ellipse
				cx="0"
				cy="48"
				rx="62"
				ry="12"
				fill="rgba(34, 211, 238, 0.08)"
			/>

			<circle cx="-28" cy="-8" r="5" fill="rgba(34, 211, 238, 0.35)" />
			<circle cx="18" cy="-20" r="4" fill="rgba(217, 70, 239, 0.3)" />
			<circle cx="34" cy="8" r="3" fill="rgba(250, 204, 21, 0.3)" />

			<text
				x="0"
				y="6"
				textAnchor="middle"
				dominantBaseline="middle"
				fill="rgb(226 232 240)"
				fontSize="13"
				fontWeight="700"
				letterSpacing="0.4"
			>
				{island.name}
			</text>
		</g>
	)
}
