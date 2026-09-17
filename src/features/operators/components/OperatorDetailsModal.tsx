import { Flag, Shield, Swords, Target, X } from 'lucide-react'
import { useState } from 'react'

import type { Operator } from '../types'

type ActionResult = {
	success: boolean
	message: string
}

type OperatorDetailsModalProps = {
	operator: Operator
	operators: Operator[]
	onClose: () => void
	onRegisterGoal: (operator: Operator) => Promise<ActionResult>
	onStealFlag: (attackerId: string, targetId: string) => Promise<ActionResult>
}

export function OperatorDetailsModal({
	operator,
	operators,
	onClose,
	onRegisterGoal,
	onStealFlag,
}: OperatorDetailsModalProps) {
	const [isSelectingTarget, setIsSelectingTarget] = useState(false)
	const [message, setMessage] = useState<string | null>(null)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const availableTargets = operators.filter(
		(target) => target.id !== operator.id,
	)

	async function handleRegisterGoal() {
		setIsSubmitting(true)
		setMessage(null)

		const result = await onRegisterGoal(operator)

		setMessage(result.message)
		setIsSubmitting(false)
	}

	async function handleSteal(targetId: string) {
		setIsSubmitting(true)
		setMessage(null)

		const result = await onStealFlag(operator.id, targetId)

		setMessage(result.message)

		if (result.success) {
			setIsSelectingTarget(false)
		}

		setIsSubmitting(false)
	}

	return (
		<>
			<div className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm" />

			<div className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl">
				<div className="flex items-start justify-between gap-4">
					<div className="flex min-w-0 items-center gap-4">
						<div className="flex size-14 shrink-0 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 text-lg font-black text-cyan-300">
							{operator.avatarKey}
						</div>

						<div className="min-w-0">
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
								Operador
							</p>

							<h2 className="mt-1 truncate text-2xl font-black text-white">
								{operator.firstName} {operator.lastName}
							</h2>
						</div>
					</div>

					<button
						type="button"
						onClick={onClose}
						className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-slate-500 hover:text-white"
						aria-label="Fechar detalhes do operador"
					>
						<X className="size-5" />
					</button>
				</div>

				<div className="mt-6 grid grid-cols-2 gap-3">
					<div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
						<div className="flex items-center gap-2 text-slate-400">
							<Flag className="size-4 text-yellow-300" />

							<span className="text-xs font-semibold uppercase tracking-wide">
								Bandeiras
							</span>
						</div>

						<p className="mt-2 text-2xl font-black text-white">
							{operator.flags}
						</p>
					</div>

					<div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
						<div className="flex items-center gap-2 text-slate-400">
							<Shield className="size-4 text-cyan-300" />

							<span className="text-xs font-semibold uppercase tracking-wide">
								Defesa
							</span>
						</div>

						<p className="mt-2 font-bold text-white">
							{operator.defenseActive ? 'Ativa' : 'Inativa'}
						</p>
					</div>

					<div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
						<div className="flex items-center gap-2 text-slate-400">
							<Swords className="size-4 text-fuchsia-300" />

							<span className="text-xs font-semibold uppercase tracking-wide">
								Créditos
							</span>
						</div>

						<p className="mt-2 text-2xl font-black text-white">
							{operator.stealCredits}
						</p>
					</div>

					<div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
						<div className="flex items-center gap-2 text-slate-400">
							<Target className="size-4 text-emerald-300" />

							<span className="text-xs font-semibold uppercase tracking-wide">
								Metas
							</span>
						</div>

						<p className="mt-2 text-2xl font-black text-white">
							{operator.goalsCompleted}
						</p>
					</div>
				</div>

				{message && (
					<div className="mt-4 rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
						{message}
					</div>
				)}

				{isSelectingTarget ? (
					<div className="mt-6">
						<div className="mb-3 flex items-center justify-between gap-4">
							<div>
								<p className="font-bold text-white">
									Escolha o alvo
								</p>

								<p className="mt-1 text-xs text-slate-500">
									Selecione o operador que perderá uma
									bandeira.
								</p>
							</div>

							<button
								type="button"
								disabled={isSubmitting}
								onClick={() => {
									setIsSelectingTarget(false)
									setMessage(null)
								}}
								className="shrink-0 text-sm font-semibold text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
							>
								Cancelar
							</button>
						</div>

						<div className="max-h-52 overflow-y-auto pr-2">
							<div className="grid gap-2">
								{availableTargets.map((target) => {
									const isProtected = target.defenseActive

									const hasNoFlags = target.flags <= 0

									const isDisabled =
										isProtected ||
										hasNoFlags ||
										isSubmitting

									return (
										<button
											key={target.id}
											type="button"
											disabled={isDisabled}
											onClick={() =>
												handleSteal(target.id)
											}
											className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/60 p-3 text-left transition hover:border-fuchsia-400/40 disabled:cursor-not-allowed disabled:opacity-40"
										>
											<div className="flex min-w-0 items-center gap-3">
												<div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-sm font-bold text-white">
													{target.avatarKey}
												</div>

												<div className="min-w-0">
													<p className="truncate font-semibold text-white">
														{target.firstName}{' '}
														{target.lastName}
													</p>

													<p className="mt-0.5 text-xs text-slate-500">
														🚩 {target.flags}
														{target.defenseActive
															? ' · 🛡️ Protegido'
															: ' · Sem defesa'}
													</p>
												</div>
											</div>

											<Swords className="size-4 shrink-0 text-fuchsia-300" />
										</button>
									)
								})}
							</div>
						</div>
					</div>
				) : (
					<div className="mt-6">
						<div className="grid gap-3 sm:grid-cols-2">
							<button
								type="button"
								disabled={isSubmitting}
								onClick={handleRegisterGoal}
								className="rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
							>
								{isSubmitting
									? 'Processando...'
									: 'Registrar meta'}
							</button>

							<button
								type="button"
								disabled={
									operator.stealCredits <= 0 || isSubmitting
								}
								onClick={() => {
									setIsSelectingTarget(true)
									setMessage(null)
								}}
								className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-3 font-bold text-fuchsia-300 transition hover:bg-fuchsia-400/20 disabled:cursor-not-allowed disabled:opacity-40"
							>
								Roubar bandeira
							</button>
						</div>

						{operator.stealCredits <= 0 && (
							<p className="mt-4 text-center text-xs text-slate-600">
								Registre uma meta para ganhar um crédito de
								roubo.
							</p>
						)}
					</div>
				)}
			</div>
		</>
	)
}
