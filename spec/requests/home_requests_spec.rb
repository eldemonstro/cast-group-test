# frozen_string_literal: true

require 'rails_helper'

describe HomeController do
  describe 'requests the home page' do
    it 'gets the root' do
      get '/', params: {}

      expect(response).to be_ok
    end
  end
end
