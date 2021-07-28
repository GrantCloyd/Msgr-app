class MessagesController < ApplicationController
  

    def create 
        user = Message.create!(message_parms)
        render json: message, status:201
      rescue ActiveRecord::RecordInvalid => e
         render json: {error: e.message}, status: 422
      end
   
      private 
   
      def message_params
   #   params.require(:message).permit(:name, :email, :password, :age_group)
      end
   
end
