Rails.application.routes.draw do 
  class Application < Rails::Application
    config.generators do |g|
      g.javascripts false
      g.helper false
      g.test_framework false
    end
  end
  root to: 'messages#index'
end
