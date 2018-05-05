Rails.application.routes.draw do
  get 'messages/reply'

  mount_devise_token_auth_for 'User', at: 'auth'
 
  namespace :api do
    resources :contacts
    resource :messages do
      collection do
        post 'reply'
      end
    end
  end
end
