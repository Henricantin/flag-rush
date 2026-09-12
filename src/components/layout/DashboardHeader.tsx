import { TimerReset } from 'lucide-react'

export function DashboardHeader() {
	return (
		<header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
			<div>
				<p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-400">
					Performance Arena
				</p>

				<h1 className="mt-2 text-4xl font-black tracking-tight text-white md:text-5xl">
					FLAG
					<span className="text-cyan-400">//</span>
					RUSH
				</h1>
			</div>

			<div className="flex w-fit items-center gap-3 rounded-2xl border border-cyan-400/20 bg-slate-900/70 px-5 py-3 backdrop-blur">
				<TimerReset className="size-5 text-cyan-400" />

				<div>
					<p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
						Próximo reset
					</p>

					<p className="font-mono text-xl font-bold text-white">
						07:32:18
					</p>
				</div>
			</div>
		</header>
	)
}
