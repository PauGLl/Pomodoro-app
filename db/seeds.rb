# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Timer.create(min: 25, sec: 0, name: 'Pomodoro')
Timer.create(min: 5, sec: 0, name: 'Short break')
Timer.create(min: 15, sec: 0, name: 'Long break')
