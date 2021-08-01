class Message < ApplicationRecord
    belongs_to :chat
    belongs_to :user

    has_many :reactions, dependent: :destroy

end
