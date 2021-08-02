class UsersController < ApplicationController
    

   def index 
   render json: User.all
   end

   def create 
     user = User.create!(user_params)
     render json: user, status:201
   rescue ActiveRecord::RecordInvalid => e
      render json: {error: e.message}, status: 422
   end

   def destroy 
     user = User.find(params[:id])
     user.destroy
     head :no_content, status: 204
   end

  def show 
   user = User.find(session[:user_id])
   render json: user
   
  end

  def update 
    user = User.find(params[:user][:id])
    user.update!(update_params)
    render json: user
  rescue ActiveRecord::RecordNotFound => e 
    render json: {error: e.message}, status: 404
  rescue ActiveRecord::RecordInvalid => e
    render json: {error: [e.message]}, status: 422
  end


   private 

   def user_params
   params.permit(:name, :email, :password, :age_group)
   end

    def update_params
    params.require(:user).permit(:name, :email, :bio, :image_url, :id, :age_group)
    end


end
