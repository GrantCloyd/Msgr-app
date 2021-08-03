class ChatSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :age_group, :admin_id, :room_color, :text_color
  belongs_to :admin, serializer: UserSerializer
  
end
