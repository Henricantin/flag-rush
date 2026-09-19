import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'

import { supabase } from '../../../lib/supabase'

export type GameEventType = 'goal_completed' | 'flag_stolen'

export type GameEvent = {
	id: string
	type: GameEventType
	message: string
	createdAt: Date
}

type AddGameEventInput = {
	type: GameEventType
	message: string
}

type GameEventsContextValue = {
	events: GameEvent[]
	addEvent: (event: AddGameEventInput) => void
}

type GameEventsProviderProps = {
	children: ReactNode
}

type OperatorRow = {
	id: string
	first_name: string
	last_name: string
}

const GameEventsContext = createContext<GameEventsContextValue | undefined>(
	undefined,
)

export function GameEventsProvider({ children }: GameEventsProviderProps) {
	const [events, setEvents] = useState<GameEvent[]>([])

	useEffect(() => {
		async function loadEvents() {
			const { data: cycleId, error: cycleError } = await supabase.rpc(
				'ensure_current_cycle',
			)

			if (cycleError) {
				console.error(
					'Erro ao garantir ciclo atual dos eventos:',
					cycleError,
				)

				return
			}

			if (!cycleId) {
				console.error(
					'Não foi possível determinar o ciclo atual dos eventos.',
				)

				return
			}

			const { data: eventsData, error: eventsError } = await supabase
				.from('game_events')
				.select(
					'id, event_type, actor_operator_id, target_operator_id, created_at',
				)
				.eq('cycle_id', cycleId)
				.order('created_at', {
					ascending: false,
				})

			if (eventsError) {
				console.error('Erro ao carregar eventos:', eventsError)

				return
			}

			const { data: operatorsData, error: operatorsError } =
				await supabase
					.from('operators')
					.select('id, first_name, last_name')

			if (operatorsError) {
				console.error(
					'Erro ao carregar operadores dos eventos:',
					operatorsError,
				)

				return
			}

			const operators = operatorsData as OperatorRow[]

			const loadedEvents: GameEvent[] = eventsData.map((event) => {
				const actor = operators.find(
					(operator) => operator.id === event.actor_operator_id,
				)

				const target = event.target_operator_id
					? operators.find(
							(operator) =>
								operator.id === event.target_operator_id,
						)
					: null

				const actorName = actor
					? `${actor.first_name} ${actor.last_name}`
					: 'Operador'

				if (event.event_type === 'flag_stolen') {
					const targetName = target
						? `${target.first_name} ${target.last_name}`
						: 'outro operador'

					return {
						id: event.id,
						type: 'flag_stolen',
						message: `${actorName} roubou uma bandeira de ${targetName}.`,
						createdAt: new Date(event.created_at),
					}
				}

				return {
					id: event.id,
					type: 'goal_completed',
					message: `${actorName} concluiu uma meta.`,
					createdAt: new Date(event.created_at),
				}
			})

			setEvents(loadedEvents)
		}

		loadEvents()
	}, [])

	function addEvent(event: AddGameEventInput) {
		const newEvent: GameEvent = {
			id: crypto.randomUUID(),
			type: event.type,
			message: event.message,
			createdAt: new Date(),
		}

		setEvents((currentEvents) => [newEvent, ...currentEvents])
	}

	return (
		<GameEventsContext.Provider
			value={{
				events,
				addEvent,
			}}
		>
			{children}
		</GameEventsContext.Provider>
	)
}

export function useGameEvents() {
	const context = useContext(GameEventsContext)

	if (!context) {
		throw new Error('useGameEvents must be used inside GameEventsProvider')
	}

	return context
}
