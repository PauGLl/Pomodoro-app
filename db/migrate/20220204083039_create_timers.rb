class CreateTimers < ActiveRecord::Migration[6.1]
  def change
    create_table :timers do |t|
      t.integer :min
      t.integer :sec

      t.timestamps
    end
  end
end
