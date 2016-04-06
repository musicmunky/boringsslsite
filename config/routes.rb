Rails.application.routes.draw do
	# The priority is based upon order of creation: first created -> highest priority.
	# See how all your routes lay out with "rake routes".

	# You can have the root of your site routed with "root"
	# root 'welcome#index'

	# Example of regular route:
	#   get 'products/:id' => 'catalog#view'

	# Example of named route that can be invoked with purchase_url(id: product.id)
	#   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

	# Example resource route (maps HTTP verbs to controller actions automatically):
	#   resources :products

	get 'dollars', to: 'pages#dollars', as: :dollars
	get 'pages/dollars'

	get 'wine', to: 'pages#wine', as: :wine
	get 'pages/wine'

	get 'pages/index'
	root 'pages#index'

	resources :pages do
		member do
			post "searchWines"
		end
	end

end