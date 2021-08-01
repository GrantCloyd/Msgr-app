class ReactionsController < ApplicationController


    def create 
       reaction = Reaction.create!(reaction_params)
       render json: reaction, status: 201
     
       ActionCable.server.broadcast "#{reaction.message.chat.title}_channel", {message: {reaction:true, id: reaction.message.id, user: reaction.user.name, reaction: reaction.reaction_type}}
    rescue ActiveRecord::RecordInvalid => e
        render json: {error: e.message}, status: 422
    end

    private 

    def reaction_params
     params.permit(:user_id, :message_id, :reaction_type)
    end

end
