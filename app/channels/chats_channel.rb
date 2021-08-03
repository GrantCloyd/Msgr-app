class ChatsChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    username = params[:user]
    stream_from "#{params[:room_title]}_channel"
    # ActionCable.server.broadcast "#{params[:room_title]}_channel", {message: {user_in_room: true, user: username }}
    stop_all_streams
  end

  def unsubscribed
    
    user = params[:user]
    ActionCable.server.broadcast "#{params[:room_title]}_channel", {message: {user_exit_room: true, user: username }}
  end
end
