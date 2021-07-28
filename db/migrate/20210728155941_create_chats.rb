class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.string :title
      t.text :description
      t.string :location
      t.string :age_group
      t.integer :admin_id

      t.timestamps
    end
  end
end
