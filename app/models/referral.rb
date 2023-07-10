class Referral < ApplicationRecord
  belongs_to :user

  after_create :send_referral_email

  def send_referral_email
    
  end

end
