class ReferralsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: ReferralSerializer.new(current_user.referrals.order(created_at: :desc))
  end

  def create
    @referral = Referral.new(referral_params)
    @referral.user_id = current_user.id
    if @referral.save
      render json: { 
        message: 'Referral email sent successfully.',
        data: { user: UserSerializer.new(current_user).serializable_hash[:data][:attributes] }
       }
    else
      render json: { error: @referral.errors.full_messages.to_sentence }, status: :unprocessable_entity
    end
  end

  # def destroy
  #   respond_with Referral.destroy(params[:id])
  # end

  private

  def referral_params
    params.require(:referral).permit(:email)
  end

end
