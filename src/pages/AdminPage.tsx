import { useState } from 'react'

import { MapPositionPicker } from '../features/game-map/components/MapPositionPicker'
import { MapSelector } from '../features/game-map/components/MapSelector'
import { useGameSettings } from '../features/game-map/context/GameSettingsContext'
import { defaultMapId, maps } from '../features/game-map/data/maps'
import { OperatorList } from '../features/operators/components/OperatorList'
import { useOperators } from '../features/operators/context/OperatorsContext'
import type { OperatorMapPosition } from '../features/operators/data/operatorMapPositions'
import type { Operator } from '../features/operators/types'
import { supabase } from '../lib/supabase'

type Position = {
	x: number
	y: number
}

export function AdminPage() {
	const { activeMapId, setActiveMapId } = useGameSettings()

	const {
		operators,
		operatorMapPositions,
		addOperator,
		updateOperator,
		removeOperator,
		setOperatorMapPosition,
	} = useOperators()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [operatorMapId, setOperatorMapId] = useState(defaultMapId)
	const [position, setPosition] = useState<Position>()

	const [editingOperatorId, setEditingOperatorId] = useState<string | null>(
		null,
	)

	const selectedOperatorMap =
		maps.find((map) => map.id === operatorMapId) ?? maps[0]

	const isEditing = editingOperatorId !== null

	function getOperatorPosition(operatorId: string, mapId: string) {
		return operatorMapPositions.find(
			(item) => item.operatorId === operatorId && item.mapId === mapId,
		)
	}

	function resetForm() {
		setFirstName('')
		setLastName('')
		setOperatorMapId(defaultMapId)
		setPosition(undefined)
		setEditingOperatorId(null)
	}

	async function handleCreateOperator() {
		if (!firstName.trim() || !lastName.trim() || !position) {
			return
		}

		const avatarKey = `${firstName[0]}${lastName[0]}`.toUpperCase()

		const { data: createdOperator, error: operatorError } = await supabase
			.from('operators')
			.insert({
				first_name: firstName.trim(),
				last_name: lastName.trim(),
				avatar_key: avatarKey,
			})
			.select()
			.single()

		if (operatorError) {
			console.error('Erro ao criar operador:', operatorError)

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
			console.error('Erro ao buscar ciclo atual:', cycleError)

			return
		}

		if (!currentCycle) {
			console.error('Nenhum ciclo ativo encontrado.')

			return
		}

		const { error: stateError } = await supabase
			.from('operator_cycle_state')
			.insert({
				operator_id: createdOperator.id,
				cycle_id: currentCycle.id,
			})

		if (stateError) {
			console.error('Erro ao criar estado do operador:', stateError)

			return
		}

		const { error: positionError } = await supabase
			.from('operator_map_positions')
			.insert({
				operator_id: createdOperator.id,
				map_id: operatorMapId,
				position_x: position.x,
				position_y: position.y,
			})

		if (positionError) {
			console.error('Erro ao salvar posição:', positionError)

			return
		}

		const newOperator: Operator = {
			id: createdOperator.id,
			firstName: createdOperator.first_name,
			lastName: createdOperator.last_name,
			avatarKey: createdOperator.avatar_key,
			flags: 5,
			defenseActive: false,
			stealCredits: 0,
			goalsCompleted: 0,
		}

		const newPosition: OperatorMapPosition = {
			operatorId: createdOperator.id,
			mapId: operatorMapId,
			x: position.x,
			y: position.y,
		}

		addOperator(newOperator, newPosition)

		resetForm()
	}

	function handleEditOperator(operator: Operator) {
		const initialMapId = activeMapId

		const currentPosition = getOperatorPosition(operator.id, initialMapId)

		setEditingOperatorId(operator.id)
		setFirstName(operator.firstName)
		setLastName(operator.lastName)
		setOperatorMapId(initialMapId)

		setPosition(
			currentPosition
				? {
						x: currentPosition.x,
						y: currentPosition.y,
					}
				: undefined,
		)
	}

	function handleUpdateOperator() {
		if (!editingOperatorId || !firstName.trim() || !lastName.trim()) {
			return
		}

		const currentOperator = operators.find(
			(operator) => operator.id === editingOperatorId,
		)

		if (!currentOperator) {
			return
		}

		const updatedOperator: Operator = {
			...currentOperator,
			firstName: firstName.trim(),
			lastName: lastName.trim(),
			avatarKey: `${firstName[0]}${lastName[0]}`.toUpperCase(),
		}

		updateOperator(updatedOperator)

		if (position) {
			setOperatorMapPosition({
				operatorId: editingOperatorId,
				mapId: operatorMapId,
				x: position.x,
				y: position.y,
			})
		}

		resetForm()
	}

	function handleDeleteOperator(operatorId: string) {
		removeOperator(operatorId)

		if (editingOperatorId === operatorId) {
			resetForm()
		}
	}

	function handleOperatorMapChange(mapId: string) {
		setOperatorMapId(mapId)

		if (!editingOperatorId) {
			setPosition(undefined)
			return
		}

		const currentPosition = getOperatorPosition(editingOperatorId, mapId)

		setPosition(
			currentPosition
				? {
						x: currentPosition.x,
						y: currentPosition.y,
					}
				: undefined,
		)
	}

	function handleSubmit() {
		if (isEditing) {
			handleUpdateOperator()
			return
		}

		handleCreateOperator()
	}

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

				<section className="rounded-3xl border border-slate-700/70 bg-slate-900/60 p-6 backdrop-blur">
					<div className="mb-5">
						<h2 className="text-xl font-bold">Operadores</h2>

						<p className="mt-1 text-sm text-slate-400">
							Gerencie os operadores cadastrados.
						</p>
					</div>

					<OperatorList
						operators={operators}
						onEdit={handleEditOperator}
						onDelete={handleDeleteOperator}
					/>
				</section>

				<section className="rounded-3xl border border-fuchsia-400/20 bg-slate-900/60 p-6 backdrop-blur">
					<div className="mb-6">
						<h2 className="text-xl font-bold">
							{isEditing ? 'Editar operador' : 'Novo operador'}
						</h2>

						<p className="mt-1 text-sm text-slate-400">
							{isEditing
								? 'Atualize os dados e a posição do operador.'
								: 'Cadastre e posicione um operador no mapa.'}
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
								value={firstName}
								onChange={(event) =>
									setFirstName(event.target.value)
								}
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
								value={lastName}
								onChange={(event) =>
									setLastName(event.target.value)
								}
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
							onChange={(event) =>
								handleOperatorMapChange(event.target.value)
							}
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
								{isEditing
									? 'Clique no mapa para alterar a posição neste cenário.'
									: 'Clique no mapa para escolher onde o operador ficará.'}
							</p>
						</div>

						<MapPositionPicker
							image={selectedOperatorMap.image}
							initialPosition={position}
							onChange={setPosition}
						/>

						{position ? (
							<p className="mt-3 font-mono text-xs text-slate-500">
								X: {position.x}% · Y: {position.y}%
							</p>
						) : (
							isEditing && (
								<p className="mt-3 text-xs text-yellow-300/70">
									Este operador ainda não possui posição neste
									mapa.
								</p>
							)
						)}
					</div>

					<div className="mt-8 flex justify-end gap-3">
						{isEditing && (
							<button
								type="button"
								onClick={resetForm}
								className="rounded-xl border border-slate-700 px-5 py-3 font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white"
							>
								Cancelar
							</button>
						)}

						<button
							type="button"
							onClick={handleSubmit}
							disabled={
								!firstName.trim() ||
								!lastName.trim() ||
								(!isEditing && !position)
							}
							className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
						>
							{isEditing
								? 'Salvar alterações'
								: 'Salvar operador'}
						</button>
					</div>
				</section>
			</div>
		</main>
	)
}
