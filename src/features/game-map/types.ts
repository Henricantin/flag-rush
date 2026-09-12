export type MapSlot = {
	id: string
	mapId: string
	x: number
	y: number
}

export type Operator = {
	id: string
	firstName: string
	lastName: string
	avatarKey: string
	mapSlotId: string
	flags: number
	defenseActive: boolean
	stealCredits: number
	goalsCompleted: number
}
