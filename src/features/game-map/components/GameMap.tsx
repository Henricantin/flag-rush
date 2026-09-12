import { OperatorAvatar } from '../../operators/components/OperatorAvatar'
import { operators } from '../../operators/data/operators'
import { mapSlots } from '../data/mapSlots'
import { defaultMapId, maps } from '../data/maps'

export function GameMap() {
	const activeMap = maps.find((map) => map.id === defaultMapId) ?? maps[0]

	const activeSlots = mapSlots.filter((slot) => slot.mapId === activeMap.id)

	return (
		<div className="relative h-full min-h-0 overflow-hidden rounded-2xl bg-slate-950">
			<img
				src={activeMap.image}
				alt={`Mapa ${activeMap.name}`}
				className="h-full w-full object-cover"
			/>

			<div className="absolute inset-0 bg-slate-950/10" />

			{operators.map((operator) => {
				const slot = activeSlots.find(
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
		</div>
	)
}
