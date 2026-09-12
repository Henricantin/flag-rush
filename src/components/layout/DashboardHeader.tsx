import { TimerReset } from 'lucide-react'

export function DashboardHeader() {
	return (
		<header className="flex shrink-0 flex-col items-center justify-center text-center">
			<h1 className="text-4xl font-black leading-none tracking-tight text-white md:text-5xl">
				ROUBA BANDEIRA
			</h1>

			<div className="mt-3 flex items-center gap-2 text-slate-300">
				<TimerReset className="size-4 text-cyan-400" />

				<div className="flex items-baseline gap-2">
					<span className="text-[15px] font-semibold uppercase tracking-[0.2em] text-slate-500">
						Próximo reset
					</span>

					<span className="font-mono text-md font-bold text-cyan-300">
						07:32:18
					</span>
				</div>
			</div>
		</header>
	)
}
