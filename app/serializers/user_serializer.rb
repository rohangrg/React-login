class UserSerializer
  include JSONAPI::Serializer

  attributes :id, :email

  attributes :referrals do |user|
    user.referrals.order(created_at: :asc)
  end
end
