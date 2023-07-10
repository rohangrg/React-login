class ReferralMailer < ActionMailer::Base
  def referral_email(referral)
    @referral = referral
    mail(
      from: 'rohan.test1998@gmail.com',
      to: referral.email,
      subject: 'Invitation to Sign Up')
  end
end
