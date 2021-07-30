class Chat < ApplicationRecord
    validates :title, uniqueness: true
    validates :age_group, inclusion: ["Family", "Adult"]
    validates :admin_id, presence: true

    has_many :messages, dependent: :destroy
    has_many :users, through: :messages
    belongs_to :admin, class_name: "User", foreign_key: "admin_id"  
end
