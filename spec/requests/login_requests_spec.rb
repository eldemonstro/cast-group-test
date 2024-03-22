# frozen_string_literal: true

require 'rails_helper'

describe LoginController do
  include_context 'session double'

  describe 'requests the login page' do
    it 'gets the index' do
      get '/login', params: {}

      expect(response).to be_ok
    end
  end

  describe 'creates a session' do
    it 'if login is right' do
      post '/login', params: { username: 'username', password: 'password' }

      expect(response).to be_created
      expect(session[:username]).to eq 'username'
      expect(session[:expires_at]).to be_a ActiveSupport::TimeWithZone
    end

    it 'fails if login is wrong' do
      post '/login', params: { username: 'wrong', password: 'wrong' }

      expect(response).to be_unauthorized
      expect(response.body).to eq '{"errors":"Usuário ou senha incorretos"}'
      expect(session[:username]).to be_nil
      expect(session[:expires_at]).to be_nil
    end
  end

  describe 'logs out' do
    let(:session_hash) { {} }

    it 'deletes the session' do
      session_hash[:username] = 'username'
      session_hash[:expires_at] = 60.seconds.from_now

      delete '/logout'

      expect(response).to be_no_content
      expect(session[:username]).to be_nil
      expect(session[:expires_at]).to be_nil
    end
  end
end
