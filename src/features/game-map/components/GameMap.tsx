import { useState } from 'react'

import { OperatorAvatar } from '../../operators/components/OperatorAvatar'
import { OperatorDetailsModal } from '../../operators/components/OperatorDetailsModal'
import { useOperators } from '../../operators/context/OperatorsContext'
import type { Operator } from '../../operators/types'
import { defaultMapId, maps } from '../data/maps'

type GameMapProps = {
	mapId?: string
}

export function GameMap({ mapId = defaultMapId }: GameMapProps) {
	const { operators, operatorMapPositions, updateOperator } = useOperators()

	const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(
		null,
	)

	const activeMap =
		maps.find((map) => map.id === mapId) ??
		maps.find((map) => map.id === defaultMapId) ??
		maps[0]

	const selectedOperator =
		operators.find((operator) => operator.id === selectedOperatorId) ?? null

	function handleRegisterGoal(operator: Operator) {
		updateOperator({
			...operator,
			goalsCompleted: operator.goalsCompleted + 1,
			defenseActive: true,
			stealCredits: operator.stealCredits + 1,
		})
	}

	return (
		<>
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
							onClick={(selectedOperator) =>
								setSelectedOperatorId(selectedOperator.id)
							}
						/>
					)
				})}
			</div>

			{selectedOperator && (
				<OperatorDetailsModal
					operator={selectedOperator}
					onClose={() => setSelectedOperatorId(null)}
					onRegisterGoal={handleRegisterGoal}
				/>
			)}
		</>
	)
}
