class PagesController < ApplicationController
	require 'wine_request'

	def wine
#		puts "PARAMS: #{params.to_s}"  # may possibly put in direct link creation and queries via link...we'll see
	end

	def searchWines

		wr = WineRequest.new
		srch_params = {}

		response = {}
		content  = {}
		status   = ""
		message  = ""

		begin

			srch_params['type'] = params['type']

			if srch_params['type'] == "keyword"
				srch_params['search'] = params['search']
			else
				srch_params['varietal']		= params['varietal']
				srch_params['country']		= params['country']
				srch_params['region']		= params['region']
				srch_params['scores']		= params['scores']
				srch_params['price_range']	= params['price_range']
				srch_params['size']			= params['size']
				srch_params['vintage']		= params['vintage']
			end

			content = wr.search_wines(srch_params)

			response['status'] = "success"
			response['message'] = "Wine search successful!"
			response['content'] = content
		rescue => error
			response['status'] = "failure"
			response['message'] = "Error: #{error.message}"
			response['content'] = "Error while attempting to retrieve query results"
 			response['error'] = error.backtrace
		ensure
			respond_to do |format|
				format.html { render :json => response.to_json }
			end
		end

	end

end
