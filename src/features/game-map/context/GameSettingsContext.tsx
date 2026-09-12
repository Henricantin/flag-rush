import { createContext, type ReactNode, useContext, useState } from 'react'

import { defaultMapId } from '../data/maps'

type GameSettingsContextValue = {
	activeMapId: string
	setActiveMapId: (mapId: string) => void
}

const GameSettingsContext = createContext<GameSettingsContextValue | undefined>(
	undefined,
)

type GameSettingsProviderProps = {
	children: ReactNode
}

export function GameSettingsProvider({ children }: GameSettingsProviderProps) {
	const [activeMapId, setActiveMapId] = useState(defaultMapId)

	return (
		<GameSettingsContext.Provider
			value={{
				activeMapId,
				setActiveMapId,
			}}
		>
			{children}
		</GameSettingsContext.Provider>
	)
}

export function useGameSettings() {
	const context = useContext(GameSettingsContext)

	if (!context) {
		throw new Error(
			'useGameSettings must be used inside GameSettingsProvider',
		)
	}

	return context
}
