class ChatSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :location, :age_group, :admin_id, :messages
  belongs_to :admin, serializer: UserSerializer
end
