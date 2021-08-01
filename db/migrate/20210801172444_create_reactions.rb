class CreateReactions < ActiveRecord::Migration[6.1]
  def change
    create_table :reactions do |t|
      t.string :reaction_type
      t.integer :user_id
      t.integer :message_id

      t.timestamps
    end
  end
end
