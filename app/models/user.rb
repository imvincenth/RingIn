# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  city_district   :string           not null
#  country_region  :string           not null
#  email           :string           not null
#  first_name      :string           not null
#  headline        :string           not null
#  last_name       :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email          (email) UNIQUE
#  index_users_on_session_token  (session_token) UNIQUE
#
class User < ApplicationRecord
  attr_reader :password

  validates :email, :first_name, :last_name, :headline, :country_region, :city_district, :password_digest, :session_token, presence: true
  validates :email, uniqueness: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  has_many :experiences,
    foreign_key: :user_id,
    class_name: :Experience,
    dependent: :destroy

  has_many :educations,
    foreign_key: :user_id,
    class_name: :Education,
    dependent: :destroy

  has_many :posts,
    foreign_key: :user_id,
    class_name: :Post,
    dependent: :destroy

  has_many :comments,
    foreign_key: :user_id,
    class_name: :Comment,
    dependent: :destroy

  has_many :reactions,
    foreign_key: :reactor_id,
    class_name: :Reaction,
    dependent: :destroy

  has_many :sent_connects,
    foreign_key: :connector_id,
    class_name: :Connection

  has_many :inc_connects,
    foreign_key: :connectee_id,
    class_name: :Connection

  has_one_attached :profile_picture,
    dependent: :destroy

  has_one_attached :banner,
    dependent: :destroy

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    generate_unique_session_token
    save!
    self.session_token
  end

  private

  def ensure_session_token
    generate_unique_session_token unless self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def generate_unique_session_token
    self.session_token = new_session_token
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
    self.session_token
  end
end
