class WineRequest
	require 'net/http'
	require 'nokogiri'

# %E2%9C%93   => checkmark for UTF8
# https://www.benchmarkwine.com/search?utf8=✓&varietal=red+bordeaux+blends&country=france&region=bordeaux&scores=94-99&price_range=5100-20000&size=&vintage=1990-1999

# May also implement search terms like so:
# https://www.benchmarkwine.com/search?utf8=%E2%9C%93&search=ornellaia
# https://www.benchmarkwine.com/search?utf8=%E2%9C%93&search=1995+Ducru

	def send_request(query_params)
		begin
			respbody = {}
			uri = URI('https://www.benchmarkwine.com/search')
			uri.query = URI.encode_www_form(query_params)
			puts "Query String: #{uri.query}"
			response = Net::HTTP.get_response(uri)
			respbody = response.body if response.is_a?(Net::HTTPSuccess)
		rescue
		ensure
			return respbody
		end
	end


	def search_wines(search_params)

		result = { 'number_of_results' => 0, 'wine_results' => [] }
		begin
			params = {
				:utf8 => "✓",
				:varietal => search_params['varietal'],
				:country => search_params['country'],
				:region => search_params['region'],
				:scores => search_params['scores'],
				:price_range => search_params['price_range'],
				:size => search_params['size'],
				:vintage => search_params['vintage'],
				:per_page => "100",
				:sort_by => "a_to_z"
				}

			request = send_request(params)
			html_doc = Nokogiri::HTML(request)

			reznums = html_doc.css("div.results").css("span").text.strip
			puts "Number of Search Results: #{reznums}"

			if reznums.to_i > 0

				result['number_of_results'] = reznums
				num_pages = (reznums.to_f / 100).ceil

				result_array = process_page(html_doc.css("div.result"))

				if num_pages > 1
					n = 2
					while n <= num_pages
						procpage = []
						params[:page] = n
						request = send_request(params)
						html_doc = Nokogiri::HTML(request)
						procpage = process_page(html_doc.css("div.result"))
						result_array += procpage
						n += 1
					end
				end

				result['wine_results'] = result_array
			end
		rescue => error
			result['status']	= "failure"
			result['message']	= "Error: #{error.message}"
			result['content']	= error.backtrace
		ensure
			return result
		end

	end


	def process_page(html)
		results = html
		tmparry = []
		results.each do |result|
			tmphash = {}
			tmphash['thumb']		= result.at_css("a.thumb img")['src']
			tmphash['name']			= result.css("h2 a").text.strip
			tmphash['link']			= result.at_css("h2 a")['href']
			tmphash['available']	= result.css("li.available").text.strip
			tmphash['in_stock']		= result.css("li.stock span").text.strip
			tmphash['price']		= result.css("li.price").text.strip

			det_hash = { 'region' => '', 'varietal' => '', 'size' => '', 'vintage' => '' }
			dtl = result.css("ul.details li")
			if dtl.size >= 4
				det_hash['region']		= dtl[0].text.strip
				det_hash['varietal']	= dtl[1].text.strip
				det_hash['size']		= dtl[2].text.strip
				det_hash['vintage']		= dtl[3].text.strip
			end
			tmphash['details'] = det_hash

			cnd_hash = {}
			cnd = result.css("ul.condition li")
			if cnd.size > 0
				cnd.each do |c|
					cnd_hash[c.css("span.label").text.strip] = c.css("span.score").text.strip
				end
			end
			tmphash['reviews'] = cnd_hash

			tmparry.push(tmphash)
		end
		return tmparry
	end
end


=begin

http://ruby.bastardsbook.com/chapters/html-parsing/
http://stackoverflow.com/questions/4232345/get-div-nested-in-div-element-using-nokogiri

<div class='result'>
	<a class="thumb" href="/wines/11674-pichon-lalande-1995"><img alt="Pichon Lalande 1995" src="//d23ub517d0w8vo.cloudfront.net/uploads/winery/small_image/1409/1409-pichon-lalande.jpg" /></a>
	<div class='desc'>
		<h2>
			<a href="/wines/11674-pichon-lalande-1995">Pichon Lalande 1995</a>
		</h2>
		<ul class='details'>
			<li>
				France - Bordeaux
			</li>
			<li>
				Red Bordeaux Blends
			</li>
			<li>
				750ml
			</li>
			<li>
				1995
			</li>
		</ul>
		<ul class='condition'>
			<li>
				<a href="/pages/reviews" style="color:inherit" target="_blank"><span class='label'>WA</span>
					<span class='value score'>96</span>
				</a>
			</li>
			<li>
				<a href="/pages/reviews" style="color:inherit" target="_blank"><span class='label'>WS</span>
					<span class='value score'>94</span>
				</a>
			</li>
		</ul>
		<ul class='pricing group'>
			<li class='available'>
				8 Bottles Available
			</li>
			<li class='price'>
				Starting at $199.00
			</li>
			<li class='view'>
				<a href="/wines/11674-pichon-lalande-1995">View Wines</a>
			</li>
		</ul>
	</div>
</div>
=end