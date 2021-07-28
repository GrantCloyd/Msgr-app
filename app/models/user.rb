class User < ApplicationRecord
    validates :email, presence: true, uniqueness: true
    validates :name, presence: true, length: {minimum: 3}
    validates :password, length: {minimum: 6}
    validates :age_group, presence: true, inclusion: ["Family", "Age"]
    
    has_secure_password
    
    has_many :messages
    has_many :chats, through: :messages

end
