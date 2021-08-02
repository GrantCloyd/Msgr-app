class AddColorTextOptionToChats < ActiveRecord::Migration[6.1]
  def change
    add_column :chats, :text_color, :string, default: "#000"
  end
end
