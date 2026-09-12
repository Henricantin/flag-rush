import { createBrowserRouter } from 'react-router-dom'

import { AdminPage } from '../pages/AdminPage'
import { DashboardPage } from '../pages/DashboardPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <DashboardPage />,
	},
	{
		path: '/admin',
		element: <AdminPage />,
	},
])
