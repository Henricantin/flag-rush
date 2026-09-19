import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'

import { supabase } from '../../../lib/supabase'
import { useOperators } from '../../operators/context/OperatorsContext'

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

const GameEventsContext = createContext<GameEventsContextValue | undefined>(
	undefined,
)

export function GameEventsProvider({ children }: GameEventsProviderProps) {
	const { operators } = useOperators()
	const [events, setEvents] = useState<GameEvent[]>([])

	useEffect(() => {
		async function loadEvents() {
			if (operators.length === 0) {
				setEvents([])
				return
			}

			const now = new Date().toISOString()

			const { data: currentCycle, error: cycleError } = await supabase
				.from('game_cycles')
				.select('id')
				.lte('starts_at', now)
				.gt('ends_at', now)
				.order('starts_at', {
					ascending: false,
				})
				.limit(1)
				.maybeSingle()

			if (cycleError) {
				console.error('Erro ao carregar ciclo dos eventos:', cycleError)

				return
			}

			if (!currentCycle) {
				setEvents([])
				return
			}

			const { data: eventsData, error: eventsError } = await supabase
				.from('game_events')
				.select(
					'id, event_type, actor_operator_id, target_operator_id, created_at',
				)
				.eq('cycle_id', currentCycle.id)
				.order('created_at', {
					ascending: false,
				})

			if (eventsError) {
				console.error('Erro ao carregar eventos:', eventsError)

				return
			}

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
					? `${actor.firstName} ${actor.lastName}`
					: 'Operador'

				let message = ''

				if (event.event_type === 'goal_completed') {
					message = `${actorName} concluiu uma meta.`
				}

				if (event.event_type === 'flag_stolen') {
					const targetName = target
						? `${target.firstName} ${target.lastName}`
						: 'outro operador'

					message = `${actorName} roubou uma bandeira de ${targetName}.`
				}

				return {
					id: event.id,
					type: event.event_type as GameEventType,
					message,
					createdAt: new Date(event.created_at),
				}
			})

			setEvents(loadedEvents)
		}

		loadEvents()
	}, [operators])

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
