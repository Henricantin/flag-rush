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

	return (
		<OperatorsContext.Provider
			value={{
				operators,
				operatorMapPositions,
				addOperator,
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
