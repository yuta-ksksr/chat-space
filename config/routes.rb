Rails.application.routes.draw do 
  devise_for :users
  class Application < Rails::Application
    config.generators do |g|
      g.javascripts false
      g.helper false
      g.test_framework false
    end
  end
  root to: 'messages#index'
  resources :users,only: [:edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end
