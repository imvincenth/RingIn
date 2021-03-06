# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  post_id    :integer
#  reply_id   :integer
#  user_id    :integer          not null
#
# Indexes
#
#  index_comments_on_post_id   (post_id)
#  index_comments_on_reply_id  (reply_id)
#  index_comments_on_user_id   (user_id)
#
class Comment < ApplicationRecord
  validates :user_id, :body, presence: true

  belongs_to :user,
    foreign_key: :user_id,
    class_name: :User

  belongs_to :comment,
    foreign_key: :reply_id,
    class_name: :Comment,
    optional: true

  belongs_to :post,
    foreign_key: :post_id,
    class_name: :Post,
    optional: true

  has_many :replies,
    foreign_key: :reply_id,
    dependent: :destroy,
    class_name: :Comment

  has_many :reactions,
    as: :reactable,
    dependent: :destroy
end
