import { useState } from 'react'

type Position = {
	x: number
	y: number
}

type MapPositionPickerProps = {
	image: string
	initialPosition?: Position
	onChange: (position: Position) => void
}

export function MapPositionPicker({
	image,
	initialPosition,
	onChange,
}: MapPositionPickerProps) {
	const [position, setPosition] = useState<Position | undefined>(
		initialPosition,
	)

	function handleMapClick(event: React.MouseEvent<HTMLButtonElement>) {
		const rect = event.currentTarget.getBoundingClientRect()

		const x = ((event.clientX - rect.left) / rect.width) * 100
		const y = ((event.clientY - rect.top) / rect.height) * 100

		const nextPosition = {
			x: Number(x.toFixed(2)),
			y: Number(y.toFixed(2)),
		}

		setPosition(nextPosition)
		onChange(nextPosition)
	}

	return (
		<button
			type="button"
			onClick={handleMapClick}
			className="relative aspect-video w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-950"
		>
			<img
				src={image}
				alt="Selecionar posição no mapa"
				className="h-full w-full object-cover"
			/>

			<div className="absolute inset-0 bg-slate-950/10" />

			{position && (
				<div
					className="absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-cyan-400 shadow-lg shadow-cyan-400/40"
					style={{
						left: `${position.x}%`,
						top: `${position.y}%`,
					}}
				/>
			)}
		</button>
	)
}
