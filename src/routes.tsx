import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes as SwitchRoutes, Route, Navigate } from 'react-router-dom'

//const SurgeArrestersPage = lazy(() => import('@/pages/surge-arresters'))

export const Routes: React.FC = () => (
	<BrowserRouter>
		<Suspense fallback={<p>Loading...</p>}>
			<SwitchRoutes>
				<Route path="/">
				</Route>
			</SwitchRoutes>
		</Suspense>
	</BrowserRouter>
)

