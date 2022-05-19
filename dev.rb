require "sinatra"
require "sinatra/reloader"
require "require_all"

set :port, 1393

require_rel "db", "models"

def init
  puts "init called"
  @word = newWord().upcase
  @definition = define(@word)
  @list = @listOfWords
end

get "/" do
  @page_name = "Guess the Word"
  init()
  $score = "0"
  puts "[NEW GAME #{Time.now}] #{@word} : #{$score} : #{@definition}"
  erb :main
end

get "/custom-game" do
  @page_name = "Custom Game"
  @getID = ""
  erb :customword
end

get '/game' do
  @page_name = "Custom Game"
  custom = params[:id]
  data = findCustomGame(custom)
  @word = data[0]
  @definition = data[1]
  if @word == "notFo"
    erb :pagenotfound
  else
    puts "[CUSTOM #{Time.now}] #{@word} : #{@definition}"
    @list = File.read('words.txt').upcase.lines.map &:split
    erb :custom_game
  end
end

post "/" do
  @page_name = "Guess the Word"
  init()
  $score = params["endGameButton"].to_i
  puts "[CONT GAME #{Time.now}] #{@word} : #{$score} : #{@definition}"
  erb :main
end

post "/custom-game" do
  @page_name = "Custom Game"
  @getID = generateCustomGame(params["word"], params["definition"]).to_s
  erb :customword
end

get '/leaderboard' do
  @page_name = "Leaderboard"
  @results = sortDB()
  erb :leaderboard
end

post "/leaderboard" do
  @page_name = "Leaderboard"
  name = params[:name]
  score = params[:score]
  submitScore(name, score)
  @results = sortDB()
  erb :leaderboard
end

error 404 do
  @page_name = "Guess the Word"
  erb :pagenotfound
end
