import { Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from 'components'
import { HomePage, TweetsPage } from 'pages'
import { ROUTES } from 'routes'
import { useGetUsersQuery } from 'store/users'

const App = () => {
  useGetUsersQuery()

  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route index path={ROUTES.MAIN} element={<HomePage />} />
        <Route path={ROUTES.TWEETS} element={<TweetsPage />} />
      </Route>
      <Route path="*" element={<Navigate to={'/'} />} />
    </Routes>
  )
}

export default App
