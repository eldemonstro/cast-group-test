# frozen_string_literal: true

require 'rails_helper'

describe SessionController do
  include_context 'session double'
  let(:session_hash) { {} }

  describe 'gets the session' do
    it 'if it exists' do
      session_hash[:username] = 'username'
      session_hash[:expires_at] = 60.seconds.from_now

      get '/session'

      expect(response.parsed_body[:username]).to eq('username')
      expect(response.parsed_body[:seconds_remaining]).to be_a Numeric
      expect(response.parsed_body[:expires_at]).to be_a String
    end

    it 'if it not exists' do
      get '/session'

      expect(response).to be_not_found
    end

    it 'is expired' do
      session_hash[:username] = 'username'
      session_hash[:expires_at] = 1.second.ago

      get '/session'

      expect(response).to be_not_found
    end
  end
end
