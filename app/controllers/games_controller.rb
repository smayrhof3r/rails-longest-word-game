class GamesController < ApplicationController

  def new
    @letters = alphabet_sample
    @colors = (['pink', 'blue', 'yellow'] * 4).flatten
  end

  def score
    @params = params
  end

  private

  def alphabet_sample
    letters = (1..10).to_a.map { |_x| ('a'..'z').to_a.sample }
    letters += [1, 1].map { |_x| %w[a e i o u].sample }
    letters.shuffle
  end

end
