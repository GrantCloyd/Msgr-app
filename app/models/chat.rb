class Chat < ApplicationRecord
    validates :title, uniqueness: true
    validates :age_group, inclusion: ["Family", "Adult"]

    has_many :messages
    has_many :users, through: :messages
end
