## users テーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|
|password|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :groups, trough: :members


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: true, validates :image, presence: true|
|image|string|null: true, validates :body, presence: true|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group



## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|member_id|integer|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|

### Association
- has_many :users
- has_many :messages
