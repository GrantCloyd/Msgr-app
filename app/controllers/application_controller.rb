class ApplicationController < ActionController::API
  include ActionController::Cookies
#  before_action :authorize


  # def authorize
  #   @current_user = User.find(session[:user_id])
  #   byebug
  #   render json: {errors: ["Not authorized"]}, status: 403 unless @current_user
  # end


  def whatever 
   render json: {message: "Whatever" } 
  end


end
