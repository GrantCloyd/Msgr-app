class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :bio, :image_url, :age_group, :app_color, :text_color
end
