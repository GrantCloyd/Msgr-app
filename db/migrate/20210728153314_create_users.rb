class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.text :bio, default: nil
      t.text :image_url, default: 'https://clipground.com/images/avatar-clipart-free-6.png'
      t.string :age_group

      t.timestamps
    end
  end
end
