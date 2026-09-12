import { maps } from '../data/maps'

type MapSelectorProps = {
	activeMapId: string
	onChange: (mapId: string) => void
}

export function MapSelector({ activeMapId, onChange }: MapSelectorProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{maps.map((map) => {
				const isActive = map.id === activeMapId

				return (
					<button
						key={map.id}
						type="button"
						onClick={() => onChange(map.id)}
						className={[
							'overflow-hidden rounded-2xl border text-left transition',
							isActive
								? 'border-cyan-400 ring-2 ring-cyan-400/20'
								: 'border-slate-700 hover:border-slate-500',
						].join(' ')}
					>
						<div className="aspect-video overflow-hidden bg-slate-950">
							<img
								src={map.image}
								alt={map.name}
								className="h-full w-full object-cover"
							/>
						</div>

						<div className="flex items-center justify-between px-4 py-3">
							<span className="font-semibold text-white">
								{map.name}
							</span>

							{isActive && (
								<span className="text-xs font-bold uppercase tracking-wide text-cyan-300">
									Ativo
								</span>
							)}
						</div>
					</button>
				)
			})}
		</div>
	)
}
