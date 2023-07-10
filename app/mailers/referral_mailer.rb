class ReferralMailer < ApplicationMailer
  def send_referral(referral)
    @referral = referral
    mail(to: referral.email, subject: 'Invitation to Sign Up')
  end
end
