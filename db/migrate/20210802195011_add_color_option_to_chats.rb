class AddColorOptionToChats < ActiveRecord::Migration[6.1]
  def change
    add_column :chats, :room_color, :string, default: "white"
    
  end
end
