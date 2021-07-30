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

   private 

   def user_params
   params.permit(:name, :email, :password, :age_group)
   end


end
