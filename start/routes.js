'use strict'

const Route = use('Route')

Route.group(() => {
  Route.delete('users/reset', 'UserController.reset')
  Route.on('/').render('welcome')
  Route.get('redactors', 'RedactorController.index')
  Route.get('users', 'UserController.index')
})

Route.group(() => {
  Route.post('users/signup', 'UserController.store')
  .validator('RegisterUser')
  .middleware(['autoLogout', 'createToken'])

  Route.post('redactors/signup', 'RedactorController.store')
  .validator('RegisterRedactor')
  .middleware(['autoLogout', 'createToken'])

}).middleware('guest')

Route.post('login', 'LoginController.store').middleware(['autoLogout'])
Route.delete('logout', 'LoginController.destroy').middleware('auth')


Route.group(() => {
  Route.resource('users', 'UserController').except(['store', 'index'])
    .except(['edit', 'create'])

  Route.resource('users/:id/pubRequests', 'UserToPubController').middleware(['saveFile'])
    .except(['edit', 'create'])
}).middleware('auth:user')


Route.group(() => {
  Route.resource('redactors', 'RedactorController')
      .except(['index', 'store', 'edit', 'create'])
  Route.resource('redactors/pubRequests', 'RedToPubController')
      .except(['store', 'edit', 'create'])
}).middleware('auth:redactor')
