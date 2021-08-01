class Reaction < ApplicationRecord
    validates :reaction_type, inclusion: ["Happy", "Sad", "Love", "Angry"]
    validates :message_id, presence: true
    validates :user_id, presence: true
    
    belongs_to :message
    belongs_to :user
end
