# frozen_string_literal: true

class UserAuthenticator
  class NotAuthorized < StandardError; end

  def self.authenticate!(login_params)
    return true if login_params[:username] == ENV['CAST_USERNAME'] && login_params[:password] == ENV['CAST_PASSWORD']

    raise NotAuthorized, 'Usuário ou senha incorretos'
  end
end
