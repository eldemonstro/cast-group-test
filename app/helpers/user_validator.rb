class UserValidator
  def self.is_valid_user?(login_params)
    login_params[:username] == ENV['CAST_USERNAME'] && login_params[:password] == ENV['CAST_PASSWORD']
  end
end