import type { ReactNode } from 'react'

import { GameSettingsProvider } from '../features/game-map/context/GameSettingsContext'
import { OperatorsProvider } from '../features/operators/context/OperatorsContext'

type ProvidersProps = {
	children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
	return (
		<GameSettingsProvider>
			<OperatorsProvider>{children}</OperatorsProvider>
		</GameSettingsProvider>
	)
}
