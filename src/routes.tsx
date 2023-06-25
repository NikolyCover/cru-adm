import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes as SwitchRoutes, Route, Navigate } from 'react-router-dom'

const MenusPage = lazy(() => import('./pages/menus'))
const DishesPage = lazy(() => import('./pages/dishes'))

export const Routes: React.FC = () => (
	<BrowserRouter>
		<Suspense fallback={<p>Loading...</p>}>
			<SwitchRoutes>
				<Route path="/">
					<Route index element={<Navigate to='menus' /> } />
					<Route path='menus'>
						<Route index element={<MenusPage />} />
					</Route>
					<Route path='dishes'>
						<Route index element={<DishesPage />} />
					</Route>
				</Route>
			</SwitchRoutes>
		</Suspense>
	</BrowserRouter>
)

