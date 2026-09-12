export type GameMapOption = {
	id: string
	name: string
	image: string
}

export const maps: GameMapOption[] = [
	{
		id: 'archipelago',
		name: 'Arquipélago',
		image: '/maps/map-archipelago.jpg',
	},
	{
		id: 'naval-fleet',
		name: 'Frota Naval',
		image: '/maps/map-naval-fleet.jpg',
	},
	{
		id: 'space-stations',
		name: 'Estações Espaciais',
		image: '/maps/map-space-stations.jpg',
	},
	{
		id: 'skyline-helipads',
		name: 'Arranha-céus',
		image: '/maps/map-skyline-helipads.jpg',
	},
]

export const defaultMapId = 'archipelago'
