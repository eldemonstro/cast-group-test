class LoginController < ApplicationController
  def index; end

  def create
    if is_valid_user?
      session[:username] = login_params[:username]
      session[:expires_at] = 60.seconds.from_now
      
      render json: { logged: 'logged_in' }, status: :created
    else
      render json: { errors: 'bad_login' }, status: 401
    end
  end

  def logout
    session.delete(:username)
    session.delete(:expires_at)
  end

  private

  def login_params
    @login_params ||= params.permit(:username, :password)
  end

  def is_valid_user?
    UserValidator.is_valid_user?(login_params)
  end
end