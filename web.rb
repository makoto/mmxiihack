require 'sinatra'

use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == [ENV['USERNAME'], ENV['PASSWORD']]
end

get %r{/|/intro|/info|/faq|/partners|/credit} do
  File.read(File.join('public', 'index.html'))
end
