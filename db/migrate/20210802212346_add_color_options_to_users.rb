class AddColorOptionsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :app_color, :string, default: "white"
    add_column :users, :text_color, :string, default: "#000"
  end
end
