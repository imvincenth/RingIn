class Api::ExperiencesController < ApplicationController

  def create
    @experience = Experience.new(experience_params)

    if @experience.save
      render :show
    else
      render json: @experience.errors.full_messages, status: 422
    end
  end

  def index
    if params[:user_id]
      user = User.find_by(id: params[:user_id])
      @experiences = Experience.where(user_id: user.id)
    else
      @experiences = Experience.all
    end
    render :index
  end

  def update
    @experience = Experience.find_by(id: params[:id])
    if @experience && @experience.update(experience_params)
      render :show
    else
      render json: @experience.errors.full_messages, status: 422
    end
  end

  def destroy
    @experience = Experience.find_by(id: params[:id])
    if @experience
      @experience.destroy
    end
  end

  private
  def experience_params
    params.require(:experience).permit(
      :user_id,
      :title, 
      :employment_type,
      :company, 
      :location, 
      :start_date, 
      :current_role,
      :end_date, 
      :industry, 
      :headline,
      :description
    )
  end
end
