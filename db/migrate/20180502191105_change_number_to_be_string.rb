class ChangeNumberToBeString < ActiveRecord::Migration[5.1]
  def change
    change_column :contacts, :number, :string
  end
end
