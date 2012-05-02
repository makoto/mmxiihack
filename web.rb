require 'sinatra'

use Rack::Auth::Basic, "Restricted Area" do |username, password|
  [username, password] == [ENV['USERNAME'], ENV['PASSWORD']]
end

get '/' do
  File.read(File.join('public', 'index.html'))
end