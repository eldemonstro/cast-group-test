# frozen_string_literal: true

class SessionController < ApplicationController
  before_action :expire_sessions

  def index
    return render json: { error: 'Session not found' }, status: :not_found unless session[:username]

    seconds_remaining = (session[:expires_at].to_datetime - DateTime.now) * 1.day

    render json: {
      username: session[:username],
      expires_at: session[:expires_at],
      seconds_remaining: seconds_remaining
    }, status: :ok
  end
end
