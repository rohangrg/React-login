class Referral < ApplicationRecord
  belongs_to :user

  after_create :send_referral_email

  def send_referral_email
    ReferralMailer.referral_email(self).deliver_now
  end

end
