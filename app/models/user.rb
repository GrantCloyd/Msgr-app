class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true, length: {minimum: 3}
    validates :password, length: {minimum: 6}, on: :create
    validates :age_group, presence: true, inclusion: {in: ["Family", "Adult"], message: "You must select Family or Adult"}
   # validates :image_url, format: { with: /(.jpeg|.png)$/i, message: "Must end with .jpeg or .png" }

    has_secure_password
    
    has_many :reactions
    has_many :messages, dependent: :destroy
    has_many :chats, through: :messages
    has_many :chat_admins, class_name: "Chat", foreign_key: "admin_id"


    def ensure_image_url user
       user.image_url.ends_with?(".jpeg", ".png" )
    end

end
