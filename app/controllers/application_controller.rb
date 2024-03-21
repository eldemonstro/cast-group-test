class ApplicationController < ActionController::Base
  # protect_from_forgery with: :null_session

  def expire_sessions
    return unless session[:expires_at]
    return if session[:expires_at] > DateTime.now

    session.delete(:username)
    session.delete(:expires_at)
  end
end
