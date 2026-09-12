import { createContext, type ReactNode, useContext, useState } from 'react'

import {
	operatorMapPositions as initialOperatorMapPositions,
	type OperatorMapPosition,
} from '../data/operatorMapPositions'
import { operators as initialOperators } from '../data/operators'
import type { Operator } from '../types'

type OperatorsContextValue = {
	operators: Operator[]
	operatorMapPositions: OperatorMapPosition[]
	addOperator: (operator: Operator, position: OperatorMapPosition) => void
	updateOperator: (operator: Operator) => void
	removeOperator: (operatorId: string) => void
	setOperatorMapPosition: (position: OperatorMapPosition) => void
}

const OperatorsContext = createContext<OperatorsContextValue | undefined>(
	undefined,
)

type OperatorsProviderProps = {
	children: ReactNode
}

export function OperatorsProvider({ children }: OperatorsProviderProps) {
	const [operators, setOperators] = useState(initialOperators)

	const [operatorMapPositions, setOperatorMapPositions] = useState(
		initialOperatorMapPositions,
	)

	function addOperator(operator: Operator, position: OperatorMapPosition) {
		setOperators((currentOperators) => [...currentOperators, operator])

		setOperatorMapPositions((currentPositions) => [
			...currentPositions,
			position,
		])
	}

	function updateOperator(updatedOperator: Operator) {
		setOperators((currentOperators) =>
			currentOperators.map((operator) =>
				operator.id === updatedOperator.id ? updatedOperator : operator,
			),
		)
	}

	function removeOperator(operatorId: string) {
		setOperators((currentOperators) =>
			currentOperators.filter((operator) => operator.id !== operatorId),
		)

		setOperatorMapPositions((currentPositions) =>
			currentPositions.filter(
				(position) => position.operatorId !== operatorId,
			),
		)
	}

	function setOperatorMapPosition(newPosition: OperatorMapPosition) {
		setOperatorMapPositions((currentPositions) => {
			const positionExists = currentPositions.some(
				(position) =>
					position.operatorId === newPosition.operatorId &&
					position.mapId === newPosition.mapId,
			)

			if (!positionExists) {
				return [...currentPositions, newPosition]
			}

			return currentPositions.map((position) =>
				position.operatorId === newPosition.operatorId &&
				position.mapId === newPosition.mapId
					? newPosition
					: position,
			)
		})
	}

	return (
		<OperatorsContext.Provider
			value={{
				operators,
				operatorMapPositions,
				addOperator,
				updateOperator,
				removeOperator,
				setOperatorMapPosition,
			}}
		>
			{children}
		</OperatorsContext.Provider>
	)
}

export function useOperators() {
	const context = useContext(OperatorsContext)

	if (!context) {
		throw new Error('useOperators must be used inside OperatorsProvider')
	}

	return context
}
