class ChatsChannel < ApplicationCable::Channel
  def subscribed
   
    stream_from "chats_channel"
  end

  def unsubscribed
   
  end
end
