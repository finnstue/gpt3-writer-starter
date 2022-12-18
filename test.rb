require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://amazon24.p.rapidapi.com/api/category?country=DE")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)
request["X-RapidAPI-Key"] = 'd07fd643fcmshb27e56e9b67ae1bp1d3c8fjsnc56dc2154cb5'
request["X-RapidAPI-Host"] = 'amazon24.p.rapidapi.com'

response = http.request(request)
puts response.read_body
