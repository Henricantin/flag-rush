import { TimerReset } from 'lucide-react'
import { useEffect, useState } from 'react'

function getNextResetDate(now: Date) {
	const nextReset = new Date(now)

	const currentHour = now.getHours()

	if (currentHour < 8) {
		nextReset.setHours(8, 0, 0, 0)
		return nextReset
	}

	if (currentHour < 20) {
		nextReset.setHours(20, 0, 0, 0)
		return nextReset
	}

	nextReset.setDate(nextReset.getDate() + 1)
	nextReset.setHours(8, 0, 0, 0)

	return nextReset
}

function formatRemainingTime(milliseconds: number) {
	const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000))

	const hours = Math.floor(totalSeconds / 3600)

	const minutes = Math.floor((totalSeconds % 3600) / 60)

	const seconds = totalSeconds % 60

	return [hours, minutes, seconds]
		.map((value) => String(value).padStart(2, '0'))
		.join(':')
}

export function DashboardHeader() {
	const [remainingTime, setRemainingTime] = useState('00:00:00')

	useEffect(() => {
		function updateCountdown() {
			const now = new Date()
			const nextReset = getNextResetDate(now)

			setRemainingTime(
				formatRemainingTime(nextReset.getTime() - now.getTime()),
			)
		}

		updateCountdown()

		const intervalId = window.setInterval(updateCountdown, 1000)

		return () => {
			window.clearInterval(intervalId)
		}
	}, [])

	return (
		<header className="flex shrink-0 flex-col items-center justify-center text-center">
			<h1 className="text-4xl font-black leading-none tracking-tight text-white md:text-5xl">
				ROUBA BANDEIRA
			</h1>

			<div className="mt-3 flex items-center gap-2 text-slate-300">
				<TimerReset className="size-4 text-cyan-400" />

				<div className="flex items-baseline gap-2">
					<span className="text-[15px] font-semibold uppercase tracking-[0.2em] text-slate-500">
						Próximo reset em
					</span>

					<span className="font-mono text-base font-bold text-cyan-300">
						{remainingTime}
					</span>
				</div>
			</div>
		</header>
	)
}
