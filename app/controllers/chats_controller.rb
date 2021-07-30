class ChatsController < ApplicationController


    def index 
      render json: Chat.all
    end


    def show
      chat = Chat.find(params[:id])
    
      render json: chat
    rescue ActiveRecord::RecordNotFound => e
      render json: {error: e.message}, status: 404
    end

    def create 
        chat = Chat.create!(chat_params)
       # ActionCable.server.broadcast 'chats_channel', chat
        render json: chat, status: 201
      rescue ActiveRecord::RecordInvalid => e
         render json: {error: e.message}, status: 422
      end

      def destroy 
        chat = Chat.find(params[:id])
        chat.destroy
        ActionCable.server.broadcast "#{chat.title}_channel", {message: {delete_channel: true}}
        head :no_content, status: 204
      end
   
      private 
   
      def chat_params
      params.require(:chat).permit(:title, :admin_id, :description, :age_group, :location)
      end

end
