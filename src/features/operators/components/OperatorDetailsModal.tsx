import { Flag, Shield, Swords, Target, X } from 'lucide-react'

import type { Operator } from '../types'

type OperatorDetailsModalProps = {
	operator: Operator
	onClose: () => void
}

export function OperatorDetailsModal({
	operator,
	onClose,
}: OperatorDetailsModalProps) {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
			<div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-slate-900 p-6 shadow-2xl">
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-4">
						<div className="flex size-14 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950 text-lg font-black text-cyan-300">
							{operator.avatarKey}
						</div>

						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
								Operador
							</p>

							<h2 className="mt-1 text-2xl font-black text-white">
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

				<div className="mt-6 grid gap-3 sm:grid-cols-2">
					<button
						type="button"
						disabled
						className="rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 opacity-40"
					>
						Registrar meta
					</button>

					<button
						type="button"
						disabled
						className="rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-3 font-bold text-fuchsia-300 opacity-40"
					>
						Roubar bandeira
					</button>
				</div>

				<p className="mt-4 text-center text-xs text-slate-600">
					As ações do jogo serão habilitadas em uma próxima etapa.
				</p>
			</div>
		</div>
	)
}
