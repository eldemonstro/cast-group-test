# frozen_string_literal: true

class LoginController < ApplicationController
  def index; end

  def create
    authenticate!

    session[:username] = login_params[:username]
    session[:expires_at] = 60.seconds.from_now

    render json: { logged: 'logged_in' }, status: :created
  rescue UserAuthenticator::NotAuthorized => e
    render json: { errors: e.message }, status: :unauthorized
  end

  def logout
    session.delete(:username)
    session.delete(:expires_at)

    render status: :no_content
  end

  private

  def login_params
    @login_params ||= params.permit(:username, :password)
  end

  def authenticate!
    UserAuthenticator.authenticate!(login_params)
  end
end
