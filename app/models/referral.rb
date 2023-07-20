class Referral < ApplicationRecord
  belongs_to :user

  validate :check_for_other_referral
  after_commit :send_referral_email, on: :create

  def send_referral_email
    ReferralMailer.referral_email(self).deliver_later
  end

  def check_for_other_referral
    if email == user.email
      errors.add(:base, "Can't send referral to yourself")
      return
    end

    if user.referrals.where(email: email).present?
      errors.add(:base, "#{email} already referred")
    end
  end

end
