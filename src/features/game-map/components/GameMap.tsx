import { OperatorAvatar } from '../../operators/components/OperatorAvatar'
import { useOperators } from '../../operators/context/OperatorsContext'
import { defaultMapId, maps } from '../data/maps'

type GameMapProps = {
	mapId?: string
}

export function GameMap({ mapId = defaultMapId }: GameMapProps) {
	const { operators, operatorMapPositions } = useOperators()

	const activeMap =
		maps.find((map) => map.id === mapId) ??
		maps.find((map) => map.id === defaultMapId) ??
		maps[0]

	return (
		<div className="relative h-full min-h-0 overflow-hidden rounded-2xl bg-slate-950">
			<img
				src={activeMap.image}
				alt={`Mapa ${activeMap.name}`}
				className="h-full w-full object-cover"
			/>

			<div className="absolute inset-0 bg-slate-950/10" />

			{operators.map((operator) => {
				const position = operatorMapPositions.find(
					(item) =>
						item.operatorId === operator.id &&
						item.mapId === activeMap.id,
				)

				if (!position) {
					return null
				}

				return (
					<OperatorAvatar
						key={operator.id}
						operator={operator}
						x={position.x}
						y={position.y}
					/>
				)
			})}
		</div>
	)
}
