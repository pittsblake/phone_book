class CreateContacts < ActiveRecord::Migration[5.1]
  def change
    create_table :contacts do |t|
      t.string :name
      t.integer :number
      t.string :email
      t.string :type
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
