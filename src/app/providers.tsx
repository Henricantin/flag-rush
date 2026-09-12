import type { ReactNode } from 'react'

import { GameSettingsProvider } from '../features/game-map/context/GameSettingsContext'

type ProvidersProps = {
	children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
	return <GameSettingsProvider>{children}</GameSettingsProvider>
}
