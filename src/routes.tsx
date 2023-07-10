import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes as SwitchRoutes, Route, Navigate } from 'react-router-dom'
import { Loading } from './components/loading'

const MenusPage = lazy(() => import('./pages/menus'))
const MenusDetailsPage = lazy(() => import('./pages/menu-details'))
const DishesPage = lazy(() => import('./pages/dishes'))
const Login = lazy(() => import('./pages/login'))

export const Routes: React.FC = () => (
	<BrowserRouter>
		<Suspense fallback={<Loading open={true} isPage />}>
			<SwitchRoutes>
				<Route path="/">
					<Route index element={<Navigate to='login' /> } />
					<Route path='login' element={<Login />} />
					<Route path='menus'>
						<Route index element={<MenusPage />} />
						<Route path=':id' element={<MenusDetailsPage />} />
					</Route>
					<Route path='dishes'>
						<Route index element={<DishesPage />} />
					</Route>
				</Route>
			</SwitchRoutes>
		</Suspense>
	</BrowserRouter>
)

