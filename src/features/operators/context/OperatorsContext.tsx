import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'

import { supabase } from '../../../lib/supabase'
import type { OperatorMapPosition } from '../data/operatorMapPositions'
import type { Operator } from '../types'

type StealFlagResult = {
	success: boolean
	message: string
}

type OperatorsContextValue = {
	operators: Operator[]
	operatorMapPositions: OperatorMapPosition[]
	addOperator: (operator: Operator, position: OperatorMapPosition) => void
	updateOperator: (operator: Operator) => void
	removeOperator: (operatorId: string) => void
	setOperatorMapPosition: (position: OperatorMapPosition) => void
	stealFlag: (attackerId: string, targetId: string) => StealFlagResult
}

const OperatorsContext = createContext<OperatorsContextValue | undefined>(
	undefined,
)

type OperatorsProviderProps = {
	children: ReactNode
}

export function OperatorsProvider({ children }: OperatorsProviderProps) {
	const [operators, setOperators] = useState<Operator[]>([])

	const [operatorMapPositions, setOperatorMapPositions] = useState<
		OperatorMapPosition[]
	>([])

	useEffect(() => {
		async function loadData() {
			const { data: cycleId, error: cycleError } = await supabase.rpc(
				'ensure_current_cycle',
			)

			if (cycleError) {
				console.error('Erro ao garantir ciclo atual:', cycleError)

				return
			}

			if (!cycleId) {
				console.error('Não foi possível determinar o ciclo atual.')

				return
			}

			const { data: operatorsData, error: operatorsError } =
				await supabase
					.from('operators')
					.select('*')
					.eq('is_active', true)
					.order('created_at', {
						ascending: true,
					})

			if (operatorsError) {
				console.error('Erro ao carregar operadores:', operatorsError)

				return
			}

			const { data: cycleStatesData, error: cycleStatesError } =
				await supabase
					.from('operator_cycle_state')
					.select('*')
					.eq('cycle_id', cycleId)

			if (cycleStatesError) {
				console.error(
					'Erro ao carregar estado dos operadores:',
					cycleStatesError,
				)

				return
			}

			const { data: positionsData, error: positionsError } =
				await supabase.from('operator_map_positions').select('*')

			if (positionsError) {
				console.error(
					'Erro ao carregar posições dos operadores:',
					positionsError,
				)

				return
			}

			const loadedOperators: Operator[] = operatorsData.map(
				(operator) => {
					const cycleState = cycleStatesData.find(
						(state) => state.operator_id === operator.id,
					)

					return {
						id: operator.id,
						firstName: operator.first_name,
						lastName: operator.last_name,
						avatarKey: operator.avatar_key,
						flags: cycleState?.flags ?? 5,
						defenseActive: cycleState?.defense_active ?? false,
						stealCredits: cycleState?.steal_credits ?? 0,
						goalsCompleted: cycleState?.goals_completed ?? 0,
					}
				},
			)

			const loadedPositions: OperatorMapPosition[] = positionsData.map(
				(position) => ({
					operatorId: position.operator_id,
					mapId: position.map_id,
					x: Number(position.position_x),
					y: Number(position.position_y),
				}),
			)

			setOperators(loadedOperators)
			setOperatorMapPositions(loadedPositions)
		}

		loadData()
	}, [])

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

	function stealFlag(attackerId: string, targetId: string): StealFlagResult {
		const attacker = operators.find(
			(operator) => operator.id === attackerId,
		)

		const target = operators.find((operator) => operator.id === targetId)

		if (!attacker || !target) {
			return {
				success: false,
				message: 'Operador não encontrado.',
			}
		}

		if (attacker.id === target.id) {
			return {
				success: false,
				message: 'O operador não pode roubar de si mesmo.',
			}
		}

		if (attacker.stealCredits <= 0) {
			return {
				success: false,
				message: 'O operador não possui créditos de roubo.',
			}
		}

		if (target.defenseActive) {
			return {
				success: false,
				message: 'O alvo está com a defesa ativa.',
			}
		}

		if (target.flags <= 0) {
			return {
				success: false,
				message: 'O alvo não possui bandeiras disponíveis.',
			}
		}

		setOperators((currentOperators) =>
			currentOperators.map((operator) => {
				if (operator.id === attackerId) {
					return {
						...operator,
						flags: operator.flags + 1,
						stealCredits: operator.stealCredits - 1,
					}
				}

				if (operator.id === targetId) {
					return {
						...operator,
						flags: operator.flags - 1,
					}
				}

				return operator
			}),
		)

		return {
			success: true,
			message: 'Bandeira roubada com sucesso.',
		}
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
				stealFlag,
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
