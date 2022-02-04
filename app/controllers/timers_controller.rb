class TimersController < ApplicationController
  def index
    @timers = Timer.all
  end
end
