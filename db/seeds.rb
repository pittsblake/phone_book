# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all

blake = User.create({name: 'Blake', email: 'blake@gmail.com', password: 'blahblah', password_confirmation: 'blahblah'})


jon = Contact.create({name: 'Jon', email:'jon@mail.com', number: '7702895114', category: 'personal', user_id: blake.id})

mom = Contact.create({name: 'Jon', email:'jon@mail.com', number: '4047358706', category: 'personal', user_id: blake.id})