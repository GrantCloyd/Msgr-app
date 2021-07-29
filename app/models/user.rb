class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true, length: {minimum: 3}
    validates :password, length: {minimum: 6}
    validates :age_group, presence: true, inclusion: {in: ["Family", "Adult"], message: "You must select Family or Adult"}
    
    has_secure_password
    
    has_many :messages
    has_many :chats, through: :messages
    has_many :chat_admins, class_name: "Chat", foreign_key: "admin_id"
end
