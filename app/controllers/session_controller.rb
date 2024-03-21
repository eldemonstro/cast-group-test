class SessionController < ApplicationController
  before_action :expire_sessions

  def index
    return render json: { error: 'Session not found' }, status: 404 unless session[:username]

    seconds_remaining = (session[:expires_at].to_datetime - DateTime.now) * 1.days

    render json: { 
      username: session[:username], 
      expires_at: session[:expires_at],
      seconds_remaining: seconds_remaining
    }, status: :ok
  end
end