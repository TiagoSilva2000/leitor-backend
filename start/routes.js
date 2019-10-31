'use strict'

const Route = use('Route')

// Dev
Route.group(() => {
  Route.delete('users/reset', 'UserController.reset')
})

// Guests
Route.on('/').render('welcome')
Route.post('login', 'LoginController.store')
Route.post('users/signup', 'UserController.store')
  .validator('RegisterUser')
  .middleware(['autoLogout', 'createToken'])
Route.post('redactors/signup', 'RedactorController.store')
Route.delete('logout', 'LoginController.destroy').middleware('auth')

// Leitores
Route.group(() => {
  Route.get('users/:id', 'UserController.show')
  Route.delete('users/:id', 'UserController.destroy')
  Route.put('users/:id', 'UserController.update')

  // Pub Requests
  Route.resource('users/:id/pubRequests', 'UserToPubController').except(['store'])
  Route.post('users/:id/pubRequests', 'UserToPubController.store').middleware(['saveFile'])
}).middleware('auth')

// Redatores
Route.group(() => {
  Route.get('redactors', 'RedactorController.index')

  Route.get('redactors/:id', 'RedactorController.show')
  Route.delete('redactors/:id', 'RedactorController.destroy')
  Route.put('redactors/:id', 'RedactorController.update')

  // PubRequests
  Route.resource('redactors/pubRequests', 'RedToPubController').except(['store'])
}).middleware('auth')
