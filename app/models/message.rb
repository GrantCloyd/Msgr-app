class Message < ApplicationRecord
    belongs_to :chat
    belongs_to :user
  #  validate :family_filter

    has_many :reactions, dependent: :destroy


    def family_filter 
     
     banned_words = ["shit", "bitch", "fuck"]
     if (chat.age_group == "Family" && banned_words.each {|w| content.downcase.include?(w)})
        errors.add(:content, "I would not say such things")
     end
    end

end
