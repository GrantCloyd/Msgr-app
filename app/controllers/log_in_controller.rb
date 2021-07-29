class LogInController < ApplicationController

    def create
      user = User.find_by(email: params[:email])
      if user && user.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user, only: [:id, :age_group, :name, :email, :bio], status:201
      else
        render json: {error: "Password and/or Username incorrect"}  
    end



    end


    

end
