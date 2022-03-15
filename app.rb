require "sinatra"
require "sinatra/reloader"
require "require_all"

set :port, 4568

require_rel "models"

get "/" do
  word = Word.new
  @word = word.newWord
  erb :main
end