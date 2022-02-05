class AddColumnToTimers < ActiveRecord::Migration[6.1]
  def change
    add_column :timers, :name, :string
  end
end
