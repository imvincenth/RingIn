# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  body       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  comment_id :integer
#  post_id    :integer
#  user_id    :integer          not null
#
# Indexes
#
#  index_comments_on_comment_id  (comment_id)
#  index_comments_on_post_id     (post_id)
#  index_comments_on_user_id     (user_id)
#
class Comment < ApplicationRecord
end