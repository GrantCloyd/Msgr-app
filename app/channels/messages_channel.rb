class MessagesChannel < ApplicationCable::Channel
  def subscribed
    byebug
    chat = Chat.find(params[:id])
    stream_for chat
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
