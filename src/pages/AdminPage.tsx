import { useState } from 'react'
import { MapPositionPicker } from '../features/game-map/components/MapPositionPicker'
import { MapSelector } from '../features/game-map/components/MapSelector'
import { useGameSettings } from '../features/game-map/context/GameSettingsContext'
import { defaultMapId, maps } from '../features/game-map/data/maps'

type Position = {
	x: number
	y: number
}

export function AdminPage() {
	const { activeMapId, setActiveMapId } = useGameSettings()

	const [operatorMapId, setOperatorMapId] = useState(defaultMapId)
	const [position, setPosition] = useState<Position>()

	const selectedOperatorMap =
		maps.find((map) => map.id === operatorMapId) ?? maps[0]

	return (
		<main className="min-h-screen p-6 text-white">
			<div className="mx-auto max-w-6xl space-y-8">
				<header>
					<h1 className="text-3xl font-black">Admin</h1>

					<p className="mt-2 text-sm text-slate-400">
						Configurações do jogo e gerenciamento de operadores.
					</p>
				</header>

				<section className="rounded-3xl border border-cyan-400/20 bg-slate-900/60 p-6 backdrop-blur">
					<div className="mb-5">
						<h2 className="text-xl font-bold">Mapa ativo</h2>

						<p className="mt-1 text-sm text-slate-400">
							Escolha qual cenário será exibido no dashboard.
						</p>
					</div>

					<MapSelector
						activeMapId={activeMapId}
						onChange={setActiveMapId}
					/>
				</section>

				<section className="rounded-3xl border border-fuchsia-400/20 bg-slate-900/60 p-6 backdrop-blur">
					<div className="mb-6">
						<h2 className="text-xl font-bold">Novo operador</h2>

						<p className="mt-1 text-sm text-slate-400">
							Cadastre e posicione um operador no mapa.
						</p>
					</div>

					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<label
								htmlFor="firstName"
								className="mb-2 block text-sm font-semibold text-slate-300"
							>
								Nome
							</label>

							<input
								id="firstName"
								type="text"
								className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
							/>
						</div>

						<div>
							<label
								htmlFor="lastName"
								className="mb-2 block text-sm font-semibold text-slate-300"
							>
								Sobrenome
							</label>

							<input
								id="lastName"
								type="text"
								className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
							/>
						</div>
					</div>

					<div className="mt-6">
						<label
							htmlFor="operatorMap"
							className="mb-2 block text-sm font-semibold text-slate-300"
						>
							Mapa para posicionamento
						</label>

						<select
							id="operatorMap"
							value={operatorMapId}
							onChange={(event) => {
								setOperatorMapId(event.target.value)
								setPosition(undefined)
							}}
							className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400"
						>
							{maps.map((map) => (
								<option key={map.id} value={map.id}>
									{map.name}
								</option>
							))}
						</select>
					</div>

					<div className="mt-6">
						<div className="mb-3">
							<p className="text-sm font-semibold text-slate-300">
								Posição no mapa
							</p>

							<p className="mt-1 text-xs text-slate-500">
								Clique no mapa para escolher onde o operador
								ficará.
							</p>
						</div>

						<MapPositionPicker
							image={selectedOperatorMap.image}
							onChange={setPosition}
						/>

						{position && (
							<p className="mt-3 font-mono text-xs text-slate-500">
								X: {position.x}% · Y: {position.y}%
							</p>
						)}
					</div>

					<div className="mt-8 flex justify-end">
						<button
							type="button"
							disabled={!position}
							className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
						>
							Salvar operador
						</button>
					</div>
				</section>
			</div>
		</main>
	)
}
