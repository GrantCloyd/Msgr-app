class ChatsChannel < ApplicationCable::Channel
  def subscribed
       stream_from "#{params[:params]}_channel"
  end

  def unsubscribed
   
  end
end
