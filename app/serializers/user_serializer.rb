class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :bio, :image_url, :age_group
end
