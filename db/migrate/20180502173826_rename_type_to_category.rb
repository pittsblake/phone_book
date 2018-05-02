class RenameTypeToCategory < ActiveRecord::Migration[5.1]
  def change
    rename_column :contacts, :type, :category
  end
end
