class ApplicationController < ActionController::Base
  # self.responder = ApplicationResponder

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token
  # respond_to :json

end
