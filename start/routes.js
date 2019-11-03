'use strict'

const Route = use('Route')

// dev
Route.group(() => {
  Route.delete('users/reset', 'UserController.reset')
  Route.on('/').render('welcome')
  Route.get('redactors', 'RedactorController.index')
  Route.get('users', 'UserController.index')
})
Route.post('/contact', async ({request}) => {
  const {name, email, subject, message} = request.only(['name', 'email', 'subject','message'])

  return {name, email, subject, message}
})

Route.group(() => {
  Route.post('users/signup', 'UserController.store')
  .validator('RegisterUser')
  .middleware(['createToken'])

  Route.post('redactors/signup', 'RedactorController.store')
  .validator('RegisterRedactor')
  .middleware(['createToken'])

  Route.post('login', 'LoginController.store')
}).middleware('guest')


Route.group(() => {
  Route.resource('users', 'UserController')
    .except(['store', 'index', 'edit', 'create', 'show'])
  Route.get('users/:id', 'UserController.show').middleware(['IDCheck'])

  Route.resource('users/:id/pubRequests', 'UserToPubController')
    .middleware(['saveFile'])
    .except(['edit', 'create'])

  Route.resource('redactors', 'RedactorController')
    .except(['index', 'store', 'edit', 'create', 'show'])
  Route.get('redactors/:id', 'RedactorController.show').middleware(['IDCheck'])

  Route.resource('redactors/:usrID/pubRequests', 'RedToPubController')
    .except(['store', 'edit', 'create'])
    .middleware(['IDCheck'])

  Route.get('pubRequests/:id/:fileId', 'FileController.show').middleware(['IDCheck'])
  Route.delete('logout', 'LoginController.destroy')
}).middleware('auth')