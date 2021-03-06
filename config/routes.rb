Rails.application.routes.draw do
  
  get '/whatever', to: "application#whatever"
  resources :reactions
  resources :log_in
  resources :chats
  resources :messages
  resources :users
  mount ActionCable.server => '/cable'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
