class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
       stream_from "#{params[:params]}_channel"
       stop_all_streams
  end

  def unsubscribed
   
  end
end
