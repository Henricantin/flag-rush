export type Island = {
	id: string
	name: string
	x: number
	y: number
	scale: number
	rotation?: number
}

export type MapSlot = {
	id: string
	islandId: string
	x: number
	y: number
}
