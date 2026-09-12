import { createContext, type ReactNode, useContext, useState } from 'react'

export type GameEventType = 'goal_completed' | 'flag_stolen'

export type GameEvent = {
	id: string
	type: GameEventType
	message: string
	createdAt: Date
}

type GameEventsContextValue = {
	events: GameEvent[]
	addEvent: (event: Omit<GameEvent, 'id' | 'createdAt'>) => void
}

const GameEventsContext = createContext<GameEventsContextValue | undefined>(
	undefined,
)

type GameEventsProviderProps = {
	children: ReactNode
}

export function GameEventsProvider({ children }: GameEventsProviderProps) {
	const [events, setEvents] = useState<GameEvent[]>([])

	function addEvent(event: Omit<GameEvent, 'id' | 'createdAt'>) {
		const newEvent: GameEvent = {
			...event,
			id: crypto.randomUUID(),
			createdAt: new Date(),
		}

		setEvents((currentEvents) => [newEvent, ...currentEvents].slice(0, 3))
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
