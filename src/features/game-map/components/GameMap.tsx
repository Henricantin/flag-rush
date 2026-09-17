import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useGameEvents } from '../../events/context/GameEventsContext'
import { OperatorAvatar } from '../../operators/components/OperatorAvatar'
import { OperatorDetailsModal } from '../../operators/components/OperatorDetailsModal'
import { useOperators } from '../../operators/context/OperatorsContext'
import type { Operator } from '../../operators/types'
import { defaultMapId, maps } from '../data/maps'

type GameMapProps = {
	mapId?: string
}

type StealFlagRpcResponse = {
	success: boolean
	message: string
	attacker?: {
		flags: number
		defense_active: boolean
		steal_credits: number
		goals_completed: number
	}
	target?: {
		flags: number
		defense_active: boolean
		steal_credits: number
		goals_completed: number
	}
}

export function GameMap({ mapId = defaultMapId }: GameMapProps) {
	const { operators, operatorMapPositions, updateOperator } = useOperators()

	const { addEvent } = useGameEvents()

	const [selectedOperatorId, setSelectedOperatorId] = useState<string | null>(
		null,
	)

	const activeMap =
		maps.find((map) => map.id === mapId) ??
		maps.find((map) => map.id === defaultMapId) ??
		maps[0]

	const selectedOperator =
		operators.find((operator) => operator.id === selectedOperatorId) ?? null

	async function handleRegisterGoal(operator: Operator) {
		const { error } = await supabase.rpc('register_goal', {
			p_operator_id: operator.id,
		})

		if (error) {
			console.error('Erro ao registrar meta:', error)

			return {
				success: false,
				message: 'Não foi possível registrar a meta.',
			}
		}

		updateOperator({
			...operator,
			goalsCompleted: operator.goalsCompleted + 1,
			defenseActive: true,
			stealCredits: operator.stealCredits + 1,
		})

		addEvent({
			type: 'goal_completed',
			message: `${operator.firstName} ${operator.lastName} concluiu uma meta.`,
		})

		return {
			success: true,
			message: 'Meta registrada com sucesso.',
		}
	}

	async function handleStealFlag(attackerId: string, targetId: string) {
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

		const { data, error } = await supabase.rpc('steal_flag', {
			p_attacker_id: attackerId,
			p_target_id: targetId,
		})

		if (error) {
			console.error('Erro ao roubar bandeira:', error)

			return {
				success: false,
				message: 'Não foi possível roubar a bandeira.',
			}
		}

		const result = data as StealFlagRpcResponse

		if (!result.success) {
			return {
				success: false,
				message: result.message,
			}
		}

		if (!result.attacker || !result.target) {
			return {
				success: false,
				message: 'Resposta inválida do servidor.',
			}
		}

		updateOperator({
			...attacker,
			flags: result.attacker.flags,
			defenseActive: result.attacker.defense_active,
			stealCredits: result.attacker.steal_credits,
			goalsCompleted: result.attacker.goals_completed,
		})

		updateOperator({
			...target,
			flags: result.target.flags,
			defenseActive: result.target.defense_active,
			stealCredits: result.target.steal_credits,
			goalsCompleted: result.target.goals_completed,
		})

		addEvent({
			type: 'flag_stolen',
			message: `${attacker.firstName} ${attacker.lastName} roubou uma bandeira de ${target.firstName} ${target.lastName}.`,
		})

		return {
			success: true,
			message: result.message,
		}
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
					operators={operators}
					onClose={() => setSelectedOperatorId(null)}
					onRegisterGoal={handleRegisterGoal}
					onStealFlag={handleStealFlag}
				/>
			)}
		</>
	)
}
