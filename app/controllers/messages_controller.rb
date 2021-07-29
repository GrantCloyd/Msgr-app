class MessagesController < ApplicationController
  

    def create 
        message = Message.create!(message_params)
        chat = Chat.find(message_params[:chat_id])
        ActionCable.server.broadcast "chats_channel", message
        #ChatsChannel.broadcast_to "chats_channel",  message
        render json: message
      rescue ActiveRecord::RecordInvalid => e
         render json: {error: e.message}, status: 422
      rescue ActiveRecord::RecordNotFound => e
         render json: {error: e.message}, status: 404
      end
   
      private 
   
      def message_params
     params.permit(:content, :user_id, :chat_id)
      end
   
end
